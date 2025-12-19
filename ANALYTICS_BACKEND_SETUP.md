# Analytics Backend Setup Guide

This document explains how to set up a backend API to store detailed analytics data from the Adventurer Mode page.

## Current Implementation

The analytics system currently stores data in **localStorage** (browser storage). This means:
- ✅ Data is collected and displayed
- ❌ Data is only stored locally in each browser
- ❌ Data is lost when localStorage is cleared
- ❌ You can't view analytics from other devices/browsers

## Backend Integration

To persist analytics data across all visitors and devices, you'll need to set up a backend API endpoint.

### Step 1: Create Backend API Endpoint

Create a POST endpoint that accepts analytics data. Example structure:

**Endpoint:** `POST /api/analytics/visit`

**Request Body:**
```json
{
  "sessionId": "session_1234567890_abc123",
  "pageName": "Adventurer Mode",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "timeOnSite": {
    "milliseconds": 45000,
    "seconds": 45,
    "minutes": 0,
    "formatted": "45s"
  },
  "visitor": {
    "ip": "192.168.1.1",
    "country": "United States",
    "countryCode": "US",
    "city": "New York",
    "region": "New York",
    "timezone": "America/New_York",
    "isp": "Verizon",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "browser": {
    "browser": "Chrome",
    "deviceType": "Desktop",
    "os": "Windows",
    "userAgent": "Mozilla/5.0...",
    "language": "en-US",
    "screenWidth": 1920,
    "screenHeight": 1080,
    "viewportWidth": 1920,
    "viewportHeight": 1080
  },
  "referrer": "https://google.com",
  "url": "https://yoursite.com/adventurer"
}
```

### Step 2: Configure Environment Variable

Add your backend API URL to your `.env` file:

```env
VITE_ANALYTICS_API_URL=https://your-api.com/api/analytics/visit
```

### Step 3: Backend Implementation Examples

#### Node.js/Express Example

```javascript
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Visit Schema
const visitSchema = new mongoose.Schema({
  sessionId: String,
  pageName: String,
  timestamp: Date,
  timeOnSite: {
    milliseconds: Number,
    seconds: Number,
    minutes: Number,
    formatted: String
  },
  visitor: {
    ip: String,
    country: String,
    countryCode: String,
    city: String,
    region: String,
    timezone: String,
    isp: String,
    latitude: Number,
    longitude: Number
  },
  browser: {
    browser: String,
    deviceType: String,
    os: String,
    userAgent: String,
    language: String,
    screenWidth: Number,
    screenHeight: Number,
    viewportWidth: Number,
    viewportHeight: Number
  },
  referrer: String,
  url: String
}, { timestamps: true });

const Visit = mongoose.model('Visit', visitSchema);

// POST endpoint
app.post('/api/analytics/visit', express.json(), async (req, res) => {
  try {
    const visit = new Visit(req.body);
    await visit.save();
    res.status(201).json({ success: true, id: visit._id });
  } catch (error) {
    console.error('Error saving visit:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET endpoint to retrieve analytics
app.get('/api/analytics/visits', async (req, res) => {
  try {
    const visits = await Visit.find().sort({ timestamp: -1 }).limit(100);
    res.json(visits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET aggregated stats
app.get('/api/analytics/stats', async (req, res) => {
  try {
    const totalVisits = await Visit.countDocuments();
    const uniqueCountries = await Visit.distinct('visitor.country');
    
    // Calculate average time on site
    const visits = await Visit.find();
    const avgTime = visits.reduce((sum, v) => sum + (v.timeOnSite?.seconds || 0), 0) / visits.length;
    
    // Top countries
    const countryCounts = await Visit.aggregate([
      { $group: { _id: '$visitor.country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    res.json({
      totalVisits,
      uniqueCountries: uniqueCountries.length,
      averageTimeOnSite: Math.floor(avgTime),
      topCountries: countryCounts.map(c => ({ country: c._id, count: c.count }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### Python/Flask Example

```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///analytics.db'
db = SQLAlchemy(app)

class Visit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(100))
    page_name = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    # Store JSON data for complex nested structures
    time_on_site = db.Column(db.JSON)
    visitor = db.Column(db.JSON)
    browser = db.Column(db.JSON)
    referrer = db.Column(db.String(500))
    url = db.Column(db.String(500))

@app.route('/api/analytics/visit', methods=['POST'])
def track_visit():
    data = request.json
    visit = Visit(
        session_id=data.get('sessionId'),
        page_name=data.get('pageName'),
        time_on_site=data.get('timeOnSite'),
        visitor=data.get('visitor'),
        browser=data.get('browser'),
        referrer=data.get('referrer'),
        url=data.get('url')
    )
    db.session.add(visit)
    db.session.commit()
    return jsonify({'success': True, 'id': visit.id}), 201

@app.route('/api/analytics/visits', methods=['GET'])
def get_visits():
    visits = Visit.query.order_by(Visit.timestamp.desc()).limit(100).all()
    return jsonify([{
        'sessionId': v.session_id,
        'pageName': v.page_name,
        'timestamp': v.timestamp.isoformat(),
        'timeOnSite': v.time_on_site,
        'visitor': v.visitor,
        'browser': v.browser,
        'referrer': v.referrer,
        'url': v.url
    } for v in visits])

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
```

### Step 4: Database Schema Recommendations

**MongoDB (NoSQL):**
- Store documents as-is (flexible schema)
- Easy to query and aggregate
- Good for analytics data

**PostgreSQL (SQL):**
```sql
CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(100),
  page_name VARCHAR(100),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_on_site_seconds INTEGER,
  visitor_ip VARCHAR(45),
  visitor_country VARCHAR(100),
  visitor_city VARCHAR(100),
  browser_name VARCHAR(50),
  device_type VARCHAR(20),
  os_name VARCHAR(50),
  referrer TEXT,
  url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_timestamp ON visits(timestamp);
CREATE INDEX idx_country ON visits(visitor_country);
```

### Step 5: Security Considerations

1. **Rate Limiting:** Implement rate limiting to prevent abuse
2. **CORS:** Configure CORS to only allow your frontend domain
3. **IP Validation:** Validate IP addresses
4. **Data Sanitization:** Sanitize all input data
5. **Authentication (Optional):** Add API key authentication for write operations

**Example Rate Limiting (Express):**
```javascript
const rateLimit = require('express-rate-limit');

const analyticsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.post('/api/analytics/visit', analyticsLimiter, express.json(), async (req, res) => {
  // ... your code
});
```

### Step 6: Hosting Options

**Free/Cheap Options:**
- **Vercel** (Serverless functions) - Free tier available
- **Netlify Functions** - Free tier available
- **Railway** - $5/month
- **Render** - Free tier available
- **Supabase** - Free tier with PostgreSQL
- **MongoDB Atlas** - Free tier (512MB)

**Quick Setup with Vercel:**
1. Create `api/analytics.js` in your project
2. Deploy to Vercel
3. Endpoint automatically available at `https://your-project.vercel.app/api/analytics`

### Step 7: Viewing Analytics Data

Once your backend is set up, you can:

1. **Query the database directly** using your database admin tool
2. **Create an admin dashboard** to view analytics
3. **Use the existing frontend** - it will automatically send data to your backend

### Current Limitations

- **IP Geolocation APIs:** The free tier of `ipapi.co` allows 1000 requests/day. For production, consider:
  - Upgrading to a paid plan
  - Using `ip-api.com` (45 requests/minute free)
  - Implementing server-side IP detection (more accurate)

### Testing

Test your endpoint with curl:

```bash
curl -X POST https://your-api.com/api/analytics/visit \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session",
    "pageName": "Adventurer Mode",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "timeOnSite": {"seconds": 45, "formatted": "45s"},
    "visitor": {"ip": "192.168.1.1", "country": "US"},
    "browser": {"browser": "Chrome", "deviceType": "Desktop"}
  }'
```

## Summary

1. ✅ Analytics tracking is already implemented in the frontend
2. ⚙️ Set up a backend API endpoint
3. 🔧 Add `VITE_ANALYTICS_API_URL` to your `.env` file
4. 📊 Data will automatically be sent to your backend
5. 🎉 View analytics from your database or create a dashboard

The frontend code in `src/lib/analytics.js` will automatically send data to your backend once `VITE_ANALYTICS_API_URL` is configured!

