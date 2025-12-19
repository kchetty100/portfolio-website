import React, { useEffect, useState } from 'react';
import { FaRocket, FaArrowLeft, FaHome, FaEye, FaEyeSlash, FaChartLine, FaChartBar, FaClock, FaExclamationTriangle, FaGlobe, FaMapMarkerAlt, FaDesktop, FaMobile, FaTablet, FaUser, FaNetworkWired } from 'react-icons/fa';
import SkillsSimple from './SkillsSimple';
import ExperiencePage from './ExperiencePage';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';
import analyticsTracker from '../lib/analytics';

const AdventurerPage = ({ onBack, onHome }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState('adventurer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visitStats, setVisitStats] = useState({ total: 0, today: 0, unique: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentVisitData, setCurrentVisitData] = useState(null);
  const [timeOnSite, setTimeOnSite] = useState({ formatted: '0s', seconds: 0 });
  const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false);
  const [aggregatedStats, setAggregatedStats] = useState(null);

  const correctPassword = '0836003411';

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val === correctPassword) {
      setIsUnlocked(true);
      setPasswordError('');
    } else if (val.length === correctPassword.length) {
      setPasswordError('Incorrect password');
      setTimeout(() => setPasswordError(''), 2000);
      setPassword('');
    }
  };

  const handleBackToPassword = () => {
    setIsUnlocked(false);
    setPassword('');
    setPasswordError('');
  };

  useEffect(() => {
    let isMounted = true;

    const fetchVisitStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError('');

        const namespace = 'keegan_chetty_portfolio';
        const todayKey = `adventurer_${new Date().toISOString().slice(0, 10)}`;
        const visitedKey = 'adventurer_unique_visit';

        const [totalRes, todayRes] = await Promise.all([
          fetch(`https://api.countapi.xyz/hit/${namespace}/adventurer_total`),
          fetch(`https://api.countapi.xyz/hit/${namespace}/${todayKey}`)
        ]);

        const totalData = await totalRes.json();
        const todayData = await todayRes.json();

        let uniqueData;
        if (!localStorage.getItem(visitedKey)) {
          uniqueData = await fetch(`https://api.countapi.xyz/hit/${namespace}/adventurer_unique`).then(res => res.json());
          localStorage.setItem(visitedKey, 'true');
        } else {
          uniqueData = await fetch(`https://api.countapi.xyz/get/${namespace}/adventurer_unique`).then(res => res.json());
        }

        if (!isMounted) return;

        setVisitStats({
          total: totalData.value || 0,
          today: todayData.value || 0,
          unique: uniqueData.value || 0
        });
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to fetch visit stats:', error);
        if (isMounted) {
          setStatsError('Unable to fetch live traffic metrics right now. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setStatsLoading(false);
        }
      }
    };

    fetchVisitStats();

    return () => {
      isMounted = false;
    };
  }, []);

  // Track detailed analytics when page is unlocked
  useEffect(() => {
    if (!isUnlocked) return;

    let timeUpdateInterval;

    const initializeAnalytics = async () => {
      // Track page view
      const visitData = await analyticsTracker.trackPageView('Adventurer Mode');
      setCurrentVisitData(visitData);
      setTimeOnSite(visitData.timeOnSite);

      // Update time on site every 5 seconds
      timeUpdateInterval = setInterval(() => {
        analyticsTracker.updateTimeOnSite();
        const updatedTime = analyticsTracker.getTimeOnSite();
        setTimeOnSite(updatedTime);
      }, 5000);
    };

    initializeAnalytics();

    // Cleanup on unmount
    return () => {
      if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval);
      }
      analyticsTracker.cleanup();
    };
  }, [isUnlocked]);

  // Load aggregated stats when showing detailed analytics
  useEffect(() => {
    if (showDetailedAnalytics) {
      const loadStats = async () => {
        // Try to fetch from backend first, fallback to local
        const stats = await analyticsTracker.fetchStatsFromBackend();
        setAggregatedStats(stats);
      };
      loadStats();
    }
  }, [showDetailedAnalytics]);

  // If home view is selected, go back to landing page
  if (currentView === 'home') {
    if (onHome) {
      onHome();
    }
    return null;
  }

  // Handle different views
  if (currentView === 'skills') {
    return <SkillsSimple onBack={() => setCurrentView('adventurer')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'experience') {
    return <ExperiencePage onBack={() => setCurrentView('adventurer')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'projects') {
    return <ProjectsPage onBack={() => setCurrentView('adventurer')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'contact') {
    return <ContactPage onBack={() => setCurrentView('adventurer')} onHome={() => setCurrentView('home')} />;
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        {/* Password Protection Overlay */}
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <div className="bg-black/80 border border-red-700 rounded-xl p-8 w-96 text-center shadow-[0_0_25px_rgba(229,9,20,0.5)]">
            <div className="flex items-center justify-center mb-6">
              <FaRocket className="text-red-500 text-4xl mr-4" />
              <h2 className="text-2xl font-bold text-white">Adventurer Access</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-2">
                Enter Access Code
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full text-center tracking-widest text-white bg-black/60 border-2 rounded-lg py-3 px-4 outline-none ${
                    passwordError ? 'border-red-600 animate-pulse' : 'border-red-700 focus:border-red-500'
                  }`}
                  placeholder="Enter access code"
                  maxLength={10}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && (
                <div className="text-red-500 mt-2 text-sm">{passwordError}</div>
              )}
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              10-digit access code required
            </p>
            
            <div className="flex space-x-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => { if (onHome) onHome(); }}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={onBack} 
                className="text-xl sm:text-3xl font-bold text-netflixRed tracking-tight font-netflix text-arc-effect hover:text-red-400 transition-colors cursor-pointer"
              >
                KEEGAN CHETTY
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={() => { setCurrentView('home'); if (onHome) onHome(); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button onClick={() => { setCurrentView('skills'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Skills</button>
              <button onClick={() => { setCurrentView('experience'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Experience</button>
              <button onClick={() => { setCurrentView('projects'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Projects</button>
              <button onClick={() => { setCurrentView('contact'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Contact</button>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back to Profile Selection"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  🚀
                </div>
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white text-2xl hover:text-gray-300 transition-colors"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setIsMobileMenuOpen(false);
                  if (onHome) onHome();
                }} 
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentView('skills'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Skills
              </button>
              <button 
                onClick={() => { setCurrentView('experience'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Experience
              </button>
              <button 
                onClick={() => { setCurrentView('projects'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Projects
              </button>
              <button 
                onClick={() => { setCurrentView('contact'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Contact
              </button>
              <div className="pt-4 border-t border-gray-700">
                <button 
                  onClick={() => {
                    onBack();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                    🚀
                  </div>
                  <span>Back to Profile Selection</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Centered Image */}
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <img
              src="/yas.jpg"
              alt="Adventurer Profile"
              className="w-80 h-80 sm:w-96 sm:h-96 rounded-full object-cover mx-auto shadow-2xl border-4 border-red-500 hover:border-red-400 transition-all duration-300 hover:scale-105"
            />
          </div>
          
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="text-red-500">Adventurer</span> Mode
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Welcome to the secret adventurer profile! This is where the real journey begins.
            </p>
          </div>

          {/* Live Usage Metrics */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-900/70 border border-white/5 rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wide text-gray-400">TOTAL VISITS</p>
                  <FaChartLine className="text-red-400 text-xl" />
                </div>
                <p className="text-3xl font-bold text-white">
                  {statsLoading ? '—' : visitStats.total.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-900/70 border border-white/5 rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wide text-gray-400">TODAY'S VISITS</p>
                  <FaChartBar className="text-red-400 text-xl" />
                </div>
                <p className="text-3xl font-bold text-white">
                  {statsLoading ? '—' : visitStats.today.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-900/70 border border-white/5 rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wide text-gray-400">UNIQUE VISITORS</p>
                  <FaRocket className="text-red-400 text-xl" />
                </div>
                <p className="text-3xl font-bold text-white">
                  {statsLoading ? '—' : visitStats.unique.toLocaleString()}
                </p>
              </div>
            </div>
            {statsError && (
              <div className="mt-4 bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded-lg text-sm flex items-center space-x-2 w-full">
                <FaExclamationTriangle className="text-red-400 flex-shrink-0" />
                <span>{statsError}</span>
              </div>
            )}
            {!statsError && lastUpdated && (
              <div className="mt-3 flex items-center space-x-2 text-xs text-gray-400">
                <FaClock />
                <span>Last updated {lastUpdated.toLocaleTimeString()}</span>
              </div>
            )}
            
            {/* Detailed Analytics Toggle */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowDetailedAnalytics(!showDetailedAnalytics)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <FaChartLine />
                <span>{showDetailedAnalytics ? 'Hide' : 'Show'} Detailed Analytics</span>
              </button>
            </div>
          </div>

          {/* Detailed Analytics Dashboard */}
          {showDetailedAnalytics && (
            <div className="max-w-6xl mx-auto mb-8 mt-8">
              <div className="bg-gray-900/90 border border-white/10 rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <FaChartLine className="text-red-400" />
                  <span>Detailed Visitor Analytics</span>
                </h2>

                {/* Current Session Info */}
                {currentVisitData && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Current Session</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center space-x-2 mb-2">
                          <FaClock className="text-red-400" />
                          <p className="text-sm text-gray-400">Time on Site</p>
                        </div>
                        <p className="text-2xl font-bold text-white">{timeOnSite.formatted}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center space-x-2 mb-2">
                          <FaNetworkWired className="text-blue-400" />
                          <p className="text-sm text-gray-400">IP Address</p>
                        </div>
                        <p className="text-lg font-mono text-white break-all">{currentVisitData.visitor.ip}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center space-x-2 mb-2">
                          <FaGlobe className="text-green-400" />
                          <p className="text-sm text-gray-400">Country</p>
                        </div>
                        <p className="text-xl font-bold text-white">{currentVisitData.visitor.country}</p>
                        <p className="text-sm text-gray-400">{currentVisitData.visitor.city}, {currentVisitData.visitor.region}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center space-x-2 mb-2">
                          <FaDesktop className="text-purple-400" />
                          <p className="text-sm text-gray-400">Browser</p>
                        </div>
                        <p className="text-lg font-bold text-white">{currentVisitData.browser.browser}</p>
                        <p className="text-xs text-gray-400">{currentVisitData.browser.os}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center space-x-2 mb-2">
                          {currentVisitData.browser.deviceType === 'Mobile' ? (
                            <FaMobile className="text-yellow-400" />
                          ) : currentVisitData.browser.deviceType === 'Tablet' ? (
                            <FaTablet className="text-yellow-400" />
                          ) : (
                            <FaDesktop className="text-yellow-400" />
                          )}
                          <p className="text-sm text-gray-400">Device</p>
                        </div>
                        <p className="text-lg font-bold text-white">{currentVisitData.browser.deviceType}</p>
                        <p className="text-xs text-gray-400">{currentVisitData.browser.screenWidth}x{currentVisitData.browser.screenHeight}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center space-x-2 mb-2">
                          <FaMapMarkerAlt className="text-orange-400" />
                          <p className="text-sm text-gray-400">Timezone</p>
                        </div>
                        <p className="text-lg font-bold text-white">{currentVisitData.visitor.timezone}</p>
                        <p className="text-xs text-gray-400">ISP: {currentVisitData.visitor.isp}</p>
                      </div>
                    </div>
                    {currentVisitData.visitor.latitude && currentVisitData.visitor.longitude && (
                      <div className="mt-4 bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <p className="text-sm text-gray-400 mb-1">Location Coordinates</p>
                        <p className="text-sm font-mono text-white">
                          {currentVisitData.visitor.latitude}, {currentVisitData.visitor.longitude}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Aggregated Statistics */}
                {aggregatedStats && aggregatedStats.totalVisits > 0 && (
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Aggregated Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <p className="text-sm text-gray-400 mb-1">Total Visits Tracked</p>
                        <p className="text-3xl font-bold text-white">{aggregatedStats.totalVisits}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <p className="text-sm text-gray-400 mb-1">Unique Countries</p>
                        <p className="text-3xl font-bold text-white">{aggregatedStats.uniqueCountries}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <p className="text-sm text-gray-400 mb-1">Avg. Time on Site</p>
                        <p className="text-2xl font-bold text-white">{aggregatedStats.averageTimeFormatted}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                        <p className="text-sm text-gray-400 mb-1">Session ID</p>
                        <p className="text-xs font-mono text-white break-all">{analyticsTracker.sessionId}</p>
                      </div>
                    </div>

                    {/* Top Countries */}
                    {aggregatedStats.topCountries.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Top Countries</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {aggregatedStats.topCountries.map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 rounded-lg p-3 border border-white/5 flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <FaGlobe className="text-blue-400" />
                                <span className="text-white font-semibold">{item.country}</span>
                              </div>
                              <span className="text-red-400 font-bold">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Top Browsers */}
                    {aggregatedStats.topBrowsers.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Top Browsers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {aggregatedStats.topBrowsers.map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 rounded-lg p-3 border border-white/5 flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <FaDesktop className="text-purple-400" />
                                <span className="text-white font-semibold">{item.browser}</span>
                              </div>
                              <span className="text-red-400 font-bold">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Top Devices */}
                    {aggregatedStats.topDevices.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Device Types</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {aggregatedStats.topDevices.map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 rounded-lg p-3 border border-white/5 flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                {item.device === 'Mobile' ? (
                                  <FaMobile className="text-yellow-400" />
                                ) : item.device === 'Tablet' ? (
                                  <FaTablet className="text-yellow-400" />
                                ) : (
                                  <FaDesktop className="text-yellow-400" />
                                )}
                                <span className="text-white font-semibold">{item.device}</span>
                              </div>
                              <span className="text-red-400 font-bold">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {(!aggregatedStats || aggregatedStats.totalVisits === 0) && (
                  <div className="text-center py-8 text-gray-400">
                    <p>No historical data available yet. Analytics will be tracked as visitors use the site.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Adventure Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-blue-400 text-3xl mb-2">🌍</div>
              <h3 className="text-white font-bold text-lg mb-2">Explorations</h3>
              <p className="text-gray-300 text-sm">42 countries visited</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-2">🏔️</div>
              <h3 className="text-white font-bold text-lg mb-2">Peaks Conquered</h3>
              <p className="text-gray-300 text-sm">15 mountains climbed</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-orange-400 text-3xl mb-2">⚡</div>
              <h3 className="text-white font-bold text-lg mb-2">Adventures</h3>
              <p className="text-gray-300 text-sm">127 epic experiences</p>
            </div>
          </div>
          
          {/* Secret Message */}
          <div className="bg-gradient-to-r from-red-900/30 to-gray-900/30 rounded-xl p-6 max-w-2xl mx-auto border border-red-500/30">
            <p className="text-white text-lg leading-relaxed">
              "The greatest adventure is the one that begins with a single step into the unknown. 
              Every line of code is a new path, every bug a hidden treasure, and every deployment 
              a leap into the digital wilderness. Welcome to the adventure of a lifetime! 🚀"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventurerPage;
