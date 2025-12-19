/**
 * Analytics Tracking Utility
 * Tracks detailed visitor metrics including time on site, IP, country, and more
 */

class AnalyticsTracker {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.startTime = Date.now();
    this.pageStartTime = Date.now();
    this.visitData = null;
    this.isTracking = false;
  }

  // Generate or retrieve session ID
  getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  // Get visitor's IP and geolocation data
  async getVisitorInfo() {
    try {
      // Using ipapi.co (free tier: 1000 requests/day)
      // Alternative: ip-api.com (free tier: 45 requests/minute)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      return {
        ip: data.ip || 'Unknown',
        country: data.country_name || 'Unknown',
        countryCode: data.country_code || 'Unknown',
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        timezone: data.timezone || 'Unknown',
        isp: data.org || 'Unknown',
        latitude: data.latitude || null,
        longitude: data.longitude || null,
      };
    } catch (error) {
      console.error('Failed to fetch visitor info:', error);
      // Fallback to ip-api.com if ipapi.co fails
      try {
        const fallbackResponse = await fetch('http://ip-api.com/json/');
        const fallbackData = await fallbackResponse.json();
        return {
          ip: fallbackData.query || 'Unknown',
          country: fallbackData.country || 'Unknown',
          countryCode: fallbackData.countryCode || 'Unknown',
          city: fallbackData.city || 'Unknown',
          region: fallbackData.regionName || 'Unknown',
          timezone: fallbackData.timezone || 'Unknown',
          isp: fallbackData.isp || 'Unknown',
          latitude: fallbackData.lat || null,
          longitude: fallbackData.lon || null,
        };
      } catch (fallbackError) {
        console.error('Fallback IP service also failed:', fallbackError);
        return {
          ip: 'Unknown',
          country: 'Unknown',
          countryCode: 'Unknown',
          city: 'Unknown',
          region: 'Unknown',
          timezone: 'Unknown',
          isp: 'Unknown',
          latitude: null,
          longitude: null,
        };
      }
    }
  }

  // Get browser and device information
  getBrowserInfo() {
    const ua = navigator.userAgent;
    const platform = navigator.platform;
    
    // Detect browser
    let browser = 'Unknown';
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

    // Detect device type
    let deviceType = 'Desktop';
    if (/Mobile|Android|iPhone|iPad/.test(ua)) {
      deviceType = /iPad/.test(ua) ? 'Tablet' : 'Mobile';
    }

    // Detect OS
    let os = 'Unknown';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS') || /iPhone|iPad/.test(ua)) os = 'iOS';

    return {
      browser,
      deviceType,
      os,
      userAgent: ua,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };
  }

  // Calculate time on site
  getTimeOnSite() {
    const elapsed = Date.now() - this.startTime;
    return {
      milliseconds: elapsed,
      seconds: Math.floor(elapsed / 1000),
      minutes: Math.floor(elapsed / 60000),
      formatted: this.formatDuration(elapsed),
    };
  }

  // Format duration in human-readable format
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  // Track page view
  async trackPageView(pageName = 'Adventurer Mode') {
    if (this.isTracking) return;

    this.isTracking = true;
    this.pageStartTime = Date.now();

    const visitorInfo = await this.getVisitorInfo();
    const browserInfo = this.getBrowserInfo();

    const visitData = {
      sessionId: this.sessionId,
      pageName,
      timestamp: new Date().toISOString(),
      timeOnSite: this.getTimeOnSite(),
      visitor: visitorInfo,
      browser: browserInfo,
      referrer: document.referrer || 'Direct',
      url: window.location.href,
    };

    this.visitData = visitData;

    // Store in localStorage for now (replace with API call to your backend)
    this.saveVisitData(visitData);

    // Send to backend API if configured
    this.sendToBackend(visitData);

    return visitData;
  }

  // Save visit data to localStorage
  saveVisitData(visitData) {
    try {
      const existingData = JSON.parse(localStorage.getItem('analytics_visits') || '[]');
      existingData.push(visitData);
      
      // Keep only last 100 visits to avoid localStorage overflow
      const recentData = existingData.slice(-100);
      localStorage.setItem('analytics_visits', JSON.stringify(recentData));
    } catch (error) {
      console.error('Failed to save visit data:', error);
    }
  }

  // Send data to backend API
  async sendToBackend(visitData) {
    const API_ENDPOINT = import.meta.env.VITE_ANALYTICS_API_URL || null;
    
    if (!API_ENDPOINT) {
      // No backend configured, data is stored in localStorage only
      console.log('No backend API URL configured. Data stored in localStorage only.');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitData),
      });

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Analytics data sent to backend:', result);
      return result;
    } catch (error) {
      console.error('Failed to send analytics to backend:', error);
      // Don't throw - we still want to store locally even if backend fails
    }
  }

  // Fetch visits from backend
  async fetchVisitsFromBackend(limit = 100) {
    const API_ENDPOINT = import.meta.env.VITE_ANALYTICS_API_URL || null;
    
    if (!API_ENDPOINT) {
      // Fallback to localStorage
      return this.getAllVisits();
    }

    try {
      // Convert POST endpoint to GET endpoint for fetching
      const baseUrl = API_ENDPOINT.replace('/visit', '');
      const response = await fetch(`${baseUrl}/visits?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const data = await response.json();
      return data.visits || data.data || [];
    } catch (error) {
      console.error('Failed to fetch visits from backend:', error);
      // Fallback to localStorage
      return this.getAllVisits();
    }
  }

  // Fetch aggregated stats from backend
  async fetchStatsFromBackend() {
    const API_ENDPOINT = import.meta.env.VITE_ANALYTICS_API_URL || null;
    
    if (!API_ENDPOINT) {
      // Fallback to local calculation
      return this.getAggregatedStats();
    }

    try {
      // Convert POST endpoint to stats endpoint
      const baseUrl = API_ENDPOINT.replace('/visit', '');
      const response = await fetch(`${baseUrl}/stats`);
      
      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const data = await response.json();
      return data.stats || data;
    } catch (error) {
      console.error('Failed to fetch stats from backend:', error);
      // Fallback to local calculation
      return this.getAggregatedStats();
    }
  }

  // Track time updates (call this periodically)
  updateTimeOnSite() {
    if (this.visitData) {
      this.visitData.timeOnSite = this.getTimeOnSite();
      // Update stored data
      const existingData = JSON.parse(localStorage.getItem('analytics_visits') || '[]');
      const lastVisit = existingData[existingData.length - 1];
      if (lastVisit && lastVisit.sessionId === this.sessionId) {
        lastVisit.timeOnSite = this.visitData.timeOnSite;
        localStorage.setItem('analytics_visits', JSON.stringify(existingData));
      }
    }
  }

  // Get all stored visit data
  getAllVisits() {
    try {
      return JSON.parse(localStorage.getItem('analytics_visits') || '[]');
    } catch (error) {
      console.error('Failed to get visit data:', error);
      return [];
    }
  }

  // Get aggregated statistics
  getAggregatedStats() {
    const visits = this.getAllVisits();
    
    if (visits.length === 0) {
      return {
        totalVisits: 0,
        uniqueCountries: 0,
        averageTimeOnSite: 0,
        topCountries: [],
        topBrowsers: [],
        topDevices: [],
      };
    }

    // Calculate unique countries
    const countries = new Set(visits.map(v => v.visitor.country));
    
    // Calculate average time on site
    const totalTime = visits.reduce((sum, v) => sum + (v.timeOnSite?.seconds || 0), 0);
    const avgTime = Math.floor(totalTime / visits.length);

    // Top countries
    const countryCounts = {};
    visits.forEach(v => {
      const country = v.visitor.country;
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([country, count]) => ({ country, count }));

    // Top browsers
    const browserCounts = {};
    visits.forEach(v => {
      const browser = v.browser.browser;
      browserCounts[browser] = (browserCounts[browser] || 0) + 1;
    });
    const topBrowsers = Object.entries(browserCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([browser, count]) => ({ browser, count }));

    // Top devices
    const deviceCounts = {};
    visits.forEach(v => {
      const device = v.browser.deviceType;
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });
    const topDevices = Object.entries(deviceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([device, count]) => ({ device, count }));

    return {
      totalVisits: visits.length,
      uniqueCountries: countries.size,
      averageTimeOnSite: avgTime,
      averageTimeFormatted: this.formatDuration(avgTime * 1000),
      topCountries,
      topBrowsers,
      topDevices,
    };
  }

  // Clean up on page unload
  cleanup() {
    if (this.visitData) {
      this.updateTimeOnSite();
    }
  }
}

// Export singleton instance
export const analyticsTracker = new AnalyticsTracker();

// Auto-cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    analyticsTracker.cleanup();
  });
}

export default analyticsTracker;

