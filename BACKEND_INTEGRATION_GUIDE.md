# Backend Integration Guide

This guide explains how the backend fits into your project structure and how to set it up.

## Project Structure

Your project now has two backend options:

```
KEEGAN_CHETTY_PORTFOLIO/
├── api/                    # Serverless functions (Vercel/Netlify)
│   ├── analytics.js        # POST endpoint for tracking visits
│   └── analytics-stats.js  # GET endpoint for aggregated stats
│
├── backend/                # Express server (traditional backend)
│   ├── server.js           # Main Express server
│   └── package.json        # Backend dependencies
│
├── src/
│   ├── lib/
│   │   └── analytics.js    # Frontend analytics tracker
│   └── pages/
│       └── AdventurerPage.jsx  # Uses analytics tracker
│
└── .env                    # Environment variables
```

## Two Backend Options

### Option 1: Express Server (Recommended for Development)

**Best for:** Local development, full control, easy debugging

**Setup:**
```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Start the server
npm start
# Server runs on http://localhost:3001

# 3. Update .env file
VITE_ANALYTICS_API_URL=http://localhost:3001/api/analytics/visit
```

**How it works:**
- Runs as a separate Node.js process
- Stores data in memory (replace with database for production)
- Accessible at `http://localhost:3001`
- Frontend connects to it via the `VITE_ANALYTICS_API_URL` environment variable

**Endpoints:**
- `POST /api/analytics/visit` - Track a visit
- `GET /api/analytics/visits` - Get all visits
- `GET /api/analytics/stats` - Get aggregated statistics

### Option 2: Serverless Functions (Recommended for Production)

**Best for:** Production deployment, serverless platforms (Vercel, Netlify)

**Setup for Vercel:**
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Update .env file
VITE_ANALYTICS_API_URL=https://your-project.vercel.app/api/analytics
```

**Setup for Netlify:**
```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Move api/ files to netlify/functions/
mkdir -p netlify/functions
cp api/analytics.js netlify/functions/analytics.js

# 3. Deploy
netlify deploy --prod

# 4. Update .env file
VITE_ANALYTICS_API_URL=https://your-site.netlify.app/.netlify/functions/analytics
```

## How It All Connects

### 1. Frontend (React/Vite)
- `src/lib/analytics.js` tracks visitor data
- Automatically sends data to backend if `VITE_ANALYTICS_API_URL` is set
- Falls back to localStorage if no backend is configured

### 2. Backend API
- Receives POST requests with visit data
- Stores data (in-memory, database, etc.)
- Returns aggregated statistics on GET requests

### 3. Data Flow

```
User visits page
    ↓
AdventurerPage unlocks
    ↓
analyticsTracker.trackPageView()
    ↓
Gets IP, country, browser info
    ↓
Sends to backend (if configured)
    ↓
Backend stores data
    ↓
Frontend displays in dashboard
```

## Environment Configuration

Create a `.env` file in the root directory:

```env
# For local Express server
VITE_ANALYTICS_API_URL=http://localhost:3001/api/analytics/visit

# OR for production serverless
VITE_ANALYTICS_API_URL=https://your-api.com/api/analytics/visit

# OR leave empty to use localStorage only
# VITE_ANALYTICS_API_URL=
```

## Development Workflow

### Running Everything Locally

**Terminal 1 - Frontend:**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm start
# Runs on http://localhost:3001
```

**Terminal 3 - Watch backend (optional):**
```bash
cd backend
npm run dev
# Auto-restarts on file changes
```

## Adding a Database

The current backend uses in-memory storage. For production, add a database:

### MongoDB Atlas (Free Tier)

```bash
cd backend
npm install mongoose
```

Update `backend/server.js`:
```javascript
import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'your-connection-string');

// Define schema
const visitSchema = new mongoose.Schema({
  sessionId: String,
  pageName: String,
  timestamp: Date,
  timeOnSite: Object,
  visitor: Object,
  browser: Object,
  referrer: String,
  url: String
}, { timestamps: true });

const Visit = mongoose.model('Visit', visitSchema);

// Update POST endpoint
app.post('/api/analytics/visit', async (req, res) => {
  const visit = new Visit(req.body);
  await visit.save();
  res.json({ success: true, id: visit._id });
});
```

### Supabase (Free Tier)

```bash
cd backend
npm install @supabase/supabase-js
```

### PostgreSQL with Prisma

```bash
cd backend
npm install prisma @prisma/client
npx prisma init
```

## Testing the Backend

### Test POST endpoint:
```bash
curl -X POST http://localhost:3001/api/analytics/visit \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test123",
    "pageName": "Adventurer Mode",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "visitor": {"ip": "192.168.1.1", "country": "US"},
    "browser": {"browser": "Chrome", "deviceType": "Desktop"}
  }'
```

### Test GET endpoints:
```bash
# Get all visits
curl http://localhost:3001/api/analytics/visits

# Get stats
curl http://localhost:3001/api/analytics/stats
```

## Deployment

### Deploy Frontend + Backend Together (Vercel)

1. Vercel automatically detects `/api` folder
2. Deploy: `vercel`
3. API functions are available at `https://your-project.vercel.app/api/analytics`

### Deploy Separately

1. **Frontend:** Deploy to Vercel/Netlify
2. **Backend:** Deploy to Railway/Render/Heroku
3. Update `VITE_ANALYTICS_API_URL` to point to your backend

## Troubleshooting

### CORS Errors
- Make sure backend has CORS enabled
- Check that `Access-Control-Allow-Origin` header is set

### Backend Not Receiving Data
- Check browser console for errors
- Verify `VITE_ANALYTICS_API_URL` is set correctly
- Test backend endpoint with curl/Postman
- Check network tab in browser DevTools

### Data Not Persisting
- Current Express server uses in-memory storage
- Add a database for persistent storage
- Or use serverless functions with a database

## Next Steps

1. ✅ Choose your backend option (Express or Serverless)
2. ✅ Set up environment variables
3. ✅ Test locally
4. ⏭️ Add a database for persistent storage
5. ⏭️ Deploy to production
6. ⏭️ Set up monitoring/logging

The frontend is already configured to work with any backend that follows the API structure!

