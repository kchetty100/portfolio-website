# Analytics Backend Server

Express.js server for tracking and storing analytics data from the Adventurer Mode page.

## Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start
# Server runs on http://localhost:3001
```

## API Endpoints

### POST `/api/analytics/visit`
Track a new visit.

**Request Body:**
```json
{
  "sessionId": "session_123",
  "pageName": "Adventurer Mode",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "timeOnSite": { "seconds": 45, "formatted": "45s" },
  "visitor": {
    "ip": "192.168.1.1",
    "country": "United States",
    "city": "New York"
  },
  "browser": {
    "browser": "Chrome",
    "deviceType": "Desktop",
    "os": "Windows"
  }
}
```

**Response:**
```json
{
  "success": true,
  "id": "1234567890"
}
```

### GET `/api/analytics/visits`
Get all tracked visits.

**Query Parameters:**
- `limit` (optional): Maximum number of visits to return (default: 100)

**Response:**
```json
{
  "success": true,
  "visits": [...],
  "total": 150
}
```

### GET `/api/analytics/stats`
Get aggregated statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalVisits": 150,
    "uniqueCountries": 25,
    "averageTimeOnSite": 120,
    "averageTimeFormatted": "2m 0s",
    "topCountries": [
      { "country": "United States", "count": 50 },
      { "country": "United Kingdom", "count": 30 }
    ],
    "topBrowsers": [
      { "browser": "Chrome", "count": 100 }
    ],
    "topDevices": [
      { "device": "Desktop", "count": 80 }
    ]
  }
}
```

## Database Setup

The backend now supports **MongoDB** for persistent storage!

### Quick Setup:

1. **Create MongoDB Atlas account** (free tier available)
2. **Get connection string** from Atlas dashboard
3. **Create `backend/.env` file:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/analytics?retryWrites=true&w=majority
   PORT=3001
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Start server:**
   ```bash
   npm start
   ```

### Fallback Mode:

If `MONGODB_URI` is not set, the server will:
- ✅ Still work (uses in-memory storage)
- ⚠️ Show warnings in console
- ⚠️ Data lost on server restart

See `MONGODB_SETUP.md` in the root directory for detailed setup instructions.

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3001
MONGODB_URI=your-mongodb-connection-string  # Optional, for MongoDB
```

## Development

```bash
# Auto-restart on file changes
npm run dev
```

## Production

For production, you should:
1. Add a database (MongoDB, PostgreSQL, etc.)
2. Add authentication/API keys
3. Add rate limiting
4. Add error logging
5. Deploy to a hosting service (Railway, Render, Heroku, etc.)

