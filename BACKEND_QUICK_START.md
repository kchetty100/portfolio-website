# Backend Quick Start Guide

## 🚀 How the Backend Fits In

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR PROJECT                          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Frontend (React/Vite)                                    │
│  ┌─────────────────────────────────────┐                │
│  │  src/pages/AdventurerPage.jsx       │                │
│  │  └─> Uses analytics tracker         │                │
│  └─────────────────────────────────────┘                │
│           │                                            │
│           ▼                                            │
│  ┌─────────────────────────────────────┐                │
│  │  src/lib/analytics.js               │                │
│  │  └─> Tracks visits, sends to API   │                │
│  └─────────────────────────────────────┘                │
│           │                                            │
│           │ HTTP POST/GET                              │
│           ▼                                            │
│  ┌─────────────────────────────────────┐                │
│  │  Backend API                        │                │
│  │  (Choose one option below)          │                │
│  └─────────────────────────────────────┘                │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  OPTION 1: Express Server (backend/)                    │
│  ┌─────────────────────────────────────┐                │
│  │  backend/server.js                  │                │
│  │  - Runs on localhost:3001           │                │
│  │  - Stores data in memory            │                │
│  │  - Easy to add database             │                │
│  └─────────────────────────────────────┘                │
│                                                           │
│  OPTION 2: Serverless Functions (api/)                  │
│  ┌─────────────────────────────────────┐                │
│  │  api/analytics.js                    │                │
│  │  - Deploys to Vercel/Netlify         │                │
│  │  - Auto-scales                       │                │
│  │  - No server management              │                │
│  └─────────────────────────────────────┘                │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## 📋 Setup Steps

### Step 1: Choose Your Backend

**Option A: Express Server (Easiest for local dev)**
```bash
cd backend
npm install
npm start
```

**Option B: Serverless (Best for production)**
- Deploy to Vercel: `vercel`
- Or Netlify: `netlify deploy`

### Step 2: Configure Environment

Create `.env` file in root:
```env
# For local Express server
VITE_ANALYTICS_API_URL=http://localhost:3001/api/analytics/visit

# OR for production
VITE_ANALYTICS_API_URL=https://your-api.com/api/analytics/visit
```

### Step 3: Start Everything

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend (if using Express):**
```bash
npm run backend:start
```

### Step 4: Test It

1. Open http://localhost:5173
2. Navigate to Adventurer Mode
3. Enter password: `0836003411`
4. Click "Show Detailed Analytics"
5. You should see your visit data!

## 🔄 Data Flow

```
1. User visits Adventurer Mode page
   ↓
2. Page unlocks (password entered)
   ↓
3. analytics.js tracks:
   - IP address (via ipapi.co)
   - Country, city, timezone
   - Browser, device, OS
   - Time on site
   ↓
4. Data sent to backend API
   POST /api/analytics/visit
   ↓
5. Backend stores data
   (memory or database)
   ↓
6. Frontend fetches stats
   GET /api/analytics/stats
   ↓
7. Dashboard displays metrics
```

## 📁 File Structure

```
your-project/
├── api/                      # Serverless functions
│   ├── analytics.js          # POST endpoint
│   └── analytics-stats.js    # GET endpoint
│
├── backend/                  # Express server
│   ├── server.js             # Main server
│   ├── package.json          # Backend deps
│   └── README.md             # Backend docs
│
├── src/
│   ├── lib/
│   │   └── analytics.js      # Frontend tracker
│   └── pages/
│       └── AdventurerPage.jsx # Uses analytics
│
├── .env                      # Environment config
├── BACKEND_INTEGRATION_GUIDE.md  # Full guide
└── BACKEND_QUICK_START.md   # This file
```

## 🎯 What Happens When...

### No Backend Configured
- ✅ Analytics still works
- ✅ Data stored in localStorage
- ✅ Dashboard shows local data only
- ❌ Data lost when browser clears storage
- ❌ Can't see data from other devices

### Backend Configured
- ✅ Analytics sends to backend
- ✅ Data persists in backend storage
- ✅ Can view from any device
- ✅ Aggregated stats across all visitors
- ✅ Historical data tracking

## 🛠️ Next Steps

1. ✅ Backend is set up
2. ⏭️ Add a database (MongoDB, PostgreSQL, etc.)
3. ⏭️ Deploy to production
4. ⏭️ Add authentication (optional)
5. ⏭️ Set up monitoring

## 💡 Tips

- **Development:** Use Express server (Option 1)
- **Production:** Use serverless functions (Option 2)
- **Testing:** Check browser console and network tab
- **Debugging:** Backend logs to console, frontend logs to browser console

## ❓ Common Questions

**Q: Do I need both backend options?**  
A: No, choose one. Express for local dev, serverless for production.

**Q: Can I use both?**  
A: Yes, but you'd need different endpoints. Usually pick one.

**Q: What if backend is down?**  
A: Frontend falls back to localStorage automatically.

**Q: How do I add a database?**  
A: See `BACKEND_INTEGRATION_GUIDE.md` for database setup.

**Q: Is the data secure?**  
A: Currently no authentication. Add API keys for production.

---

**Ready to go!** Start the backend and frontend, and your analytics will start tracking! 🎉

