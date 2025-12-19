/**
 * Express Backend Server with MongoDB
 * 
 * To run: node backend/server.js
 * Or with nodemon: nodemon backend/server.js
 * 
 * Make sure to set MONGODB_URI in backend/.env file
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Visit from './models/Visit.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || '';

let isDatabaseConnected = false;

// Connect to MongoDB
async function connectToDatabase() {
  if (!MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI not set. Database features disabled.');
    console.warn('   Set MONGODB_URI in backend/.env to enable database storage.');
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      // These options are recommended for newer MongoDB versions
    });
    isDatabaseConnected = true;
    console.log('✅ Connected to MongoDB successfully!');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('   Server will continue without database (in-memory mode)');
    isDatabaseConnected = false;
    return false;
  }
}

// Initialize database connection
connectToDatabase();

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
  isDatabaseConnected = false;
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
  isDatabaseConnected = false;
});

// Fallback in-memory storage (used if database is not available)
let visits = [];

// Routes
app.post('/api/analytics/visit', async (req, res) => {
  try {
    const visitData = {
      ...req.body,
      timestamp: req.body.timestamp ? new Date(req.body.timestamp) : new Date()
    };

    if (isDatabaseConnected) {
      // Save to MongoDB
      const visit = new Visit(visitData);
      await visit.save();
      console.log('✅ Visit saved to database:', visitData.sessionId);
      
      res.status(201).json({ 
        success: true, 
        id: visit._id.toString(),
        storage: 'database'
      });
    } else {
      // Fallback to in-memory storage
      const visitDataWithId = {
        ...visitData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      visits.push(visitDataWithId);
      
      // Keep only last 1000 visits in memory
      if (visits.length > 1000) {
        visits = visits.slice(-1000);
      }

      console.log('⚠️  Visit saved to memory (database not available):', visitData.sessionId);
      
      res.status(201).json({ 
        success: true, 
        id: visitDataWithId.id,
        storage: 'memory',
        warning: 'Database not connected. Data will be lost on server restart.'
      });
    }
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.get('/api/analytics/visits', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;

    if (isDatabaseConnected) {
      // Fetch from MongoDB
      const dbVisits = await Visit.find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .lean(); // .lean() returns plain JavaScript objects instead of Mongoose documents
      
      const total = await Visit.countDocuments();
      
      res.json({
        success: true,
        visits: dbVisits,
        total,
        storage: 'database'
      });
    } else {
      // Fallback to in-memory storage
      const sortedVisits = [...visits].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      
      res.json({
        success: true,
        visits: sortedVisits.slice(0, limit),
        total: visits.length,
        storage: 'memory',
        warning: 'Database not connected. Showing in-memory data only.'
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.get('/api/analytics/stats', async (req, res) => {
  try {
    const formatDuration = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
      if (minutes > 0) return `${minutes}m ${secs}s`;
      return `${secs}s`;
    };

    if (isDatabaseConnected) {
      // Calculate stats from MongoDB using aggregation
      const totalVisits = await Visit.countDocuments();
      
      if (totalVisits === 0) {
        return res.json({
          success: true,
          stats: {
            totalVisits: 0,
            uniqueCountries: 0,
            averageTimeOnSite: 0,
            averageTimeFormatted: '0s',
            topCountries: [],
            topBrowsers: [],
            topDevices: []
          },
          storage: 'database'
        });
      }

      // Get unique countries
      const uniqueCountries = await Visit.distinct('visitor.country');
      
      // Calculate average time on site
      const avgResult = await Visit.aggregate([
        {
          $group: {
            _id: null,
            avgTime: { $avg: '$timeOnSite.seconds' }
          }
        }
      ]);
      const avgTime = Math.floor(avgResult[0]?.avgTime || 0);

      // Top countries
      const topCountriesData = await Visit.aggregate([
        { $match: { 'visitor.country': { $exists: true, $ne: null } } },
        { $group: { _id: '$visitor.country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
      const topCountries = topCountriesData.map(item => ({
        country: item._id || 'Unknown',
        count: item.count
      }));

      // Top browsers
      const topBrowsersData = await Visit.aggregate([
        { $match: { 'browser.browser': { $exists: true, $ne: null } } },
        { $group: { _id: '$browser.browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
      const topBrowsers = topBrowsersData.map(item => ({
        browser: item._id || 'Unknown',
        count: item.count
      }));

      // Top devices
      const topDevicesData = await Visit.aggregate([
        { $match: { 'browser.deviceType': { $exists: true, $ne: null } } },
        { $group: { _id: '$browser.deviceType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
      const topDevices = topDevicesData.map(item => ({
        device: item._id || 'Unknown',
        count: item.count
      }));

      res.json({
        success: true,
        stats: {
          totalVisits,
          uniqueCountries: uniqueCountries.filter(Boolean).length,
          averageTimeOnSite: avgTime,
          averageTimeFormatted: formatDuration(avgTime),
          topCountries,
          topBrowsers,
          topDevices
        },
        storage: 'database'
      });
    } else {
      // Fallback to in-memory calculation
      if (visits.length === 0) {
        return res.json({
          success: true,
          stats: {
            totalVisits: 0,
            uniqueCountries: 0,
            averageTimeOnSite: 0,
            averageTimeFormatted: '0s',
            topCountries: [],
            topBrowsers: [],
            topDevices: []
          },
          storage: 'memory'
        });
      }

      // Calculate unique countries
      const countries = new Set(visits.map(v => v.visitor?.country).filter(Boolean));
      
      // Calculate average time on site
      const totalTime = visits.reduce((sum, v) => sum + (v.timeOnSite?.seconds || 0), 0);
      const avgTime = Math.floor(totalTime / visits.length);

      // Top countries
      const countryCounts = {};
      visits.forEach(v => {
        const country = v.visitor?.country || 'Unknown';
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      });
      const topCountries = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([country, count]) => ({ country, count }));

      // Top browsers
      const browserCounts = {};
      visits.forEach(v => {
        const browser = v.browser?.browser || 'Unknown';
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
      });
      const topBrowsers = Object.entries(browserCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([browser, count]) => ({ browser, count }));

      // Top devices
      const deviceCounts = {};
      visits.forEach(v => {
        const device = v.browser?.deviceType || 'Unknown';
        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
      });
      const topDevices = Object.entries(deviceCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([device, count]) => ({ device, count }));

      res.json({
        success: true,
        stats: {
          totalVisits: visits.length,
          uniqueCountries: countries.size,
          averageTimeOnSite: avgTime,
          averageTimeFormatted: formatDuration(avgTime),
          topCountries,
          topBrowsers,
          topDevices
        },
        storage: 'memory',
        warning: 'Database not connected. Showing in-memory data only.'
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: isDatabaseConnected ? 'connected' : 'disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Analytics backend server running on http://localhost:${PORT}`);
  console.log(`📊 Endpoints:`);
  console.log(`   POST /api/analytics/visit`);
  console.log(`   GET  /api/analytics/visits`);
  console.log(`   GET  /api/analytics/stats`);
  console.log(`   GET  /health`);
  console.log('');
  if (isDatabaseConnected) {
    console.log('✅ Database: Connected');
  } else {
    console.log('⚠️  Database: Not connected (using in-memory storage)');
    console.log('   Set MONGODB_URI in backend/.env to enable database');
  }
});

