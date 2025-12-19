# MongoDB Setup Guide

Follow these steps to set up MongoDB Atlas (free tier) for your analytics backend.

## Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with email or Google account
4. Verify your email if required

## Step 2: Create a Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (512MB storage, perfect for analytics)
3. Select a cloud provider and region (choose closest to you)
4. Click **"Create"** (takes 1-3 minutes)

## Step 3: Create Database User

1. In the **"Database Access"** section (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username (e.g., `analytics_user`)
5. Enter a strong password (save this!)
6. Under **"Database User Privileges"**, select **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Configure Network Access

1. Go to **"Network Access"** section (left sidebar)
2. Click **"Add IP Address"**
3. For development, click **"Add Current IP Address"**
4. For production, click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

## Step 5: Get Connection String

1. Go to **"Database"** section (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"5.5 or later"**
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Connection String

Replace the placeholders in the connection string:

1. Replace `<username>` with your database username
2. Replace `<password>` with your database password
3. Add a database name at the end (before `?`):
   ```
   mongodb+srv://analytics_user:yourpassword@cluster0.xxxxx.mongodb.net/analytics?retryWrites=true&w=majority
   ```

## Step 7: Configure Backend

1. Create `backend/.env` file:
   ```bash
   cd backend
   touch .env
   ```

2. Add your connection string:
   ```env
   MONGODB_URI=mongodb+srv://analytics_user:yourpassword@cluster0.xxxxx.mongodb.net/analytics?retryWrites=true&w=majority
   PORT=3001
   ```

3. **Important:** Add `backend/.env` to `.gitignore` (already done)

## Step 8: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable loader

## Step 9: Test Connection

1. Start the backend:
   ```bash
   npm start
   ```

2. You should see:
   ```
   ✅ Connected to MongoDB successfully!
   🚀 Analytics backend server running on http://localhost:3001
   ✅ Database: Connected
   ```

3. If you see an error, check:
   - Connection string is correct
   - Username and password are correct
   - IP address is whitelisted
   - Internet connection is working

## Step 10: Verify It Works

1. Start your frontend:
   ```bash
   npm run dev
   ```

2. Visit Adventurer Mode and unlock it
3. Check backend console - you should see:
   ```
   ✅ Visit saved to database: session_xxxxx
   ```

4. Check MongoDB Atlas:
   - Go to **"Database"** → **"Browse Collections"**
   - You should see a `visits` collection
   - Click on it to see your visit data!

## Troubleshooting

### "Authentication failed"
- Check username and password in connection string
- Make sure special characters in password are URL-encoded

### "IP not whitelisted"
- Go to Network Access in MongoDB Atlas
- Add your current IP address

### "Connection timeout"
- Check your internet connection
- Verify the connection string is correct
- Try using the connection string from Atlas dashboard again

### "Database not connected" in console
- Check that `MONGODB_URI` is set in `backend/.env`
- Make sure the file is named exactly `.env` (not `.env.txt`)
- Restart the backend server after creating `.env`

## What You Get

✅ **Free Forever:**
- 512MB storage (plenty for analytics)
- Shared RAM and vCPU
- No credit card required

✅ **Features:**
- Persistent data storage
- Automatic backups
- Web interface to view data
- Scales as you grow

✅ **Security:**
- Encrypted connections
- IP whitelisting
- User authentication

## Next Steps

Once connected:
1. ✅ Data persists across server restarts
2. ✅ View analytics from any device
3. ✅ Track all visitors
4. ✅ Historical data tracking
5. ✅ Browse data in MongoDB Atlas dashboard

## Production Tips

For production deployment:
1. Use environment variables (not hardcoded connection strings)
2. Set up database backups (Atlas does this automatically)
3. Monitor database usage in Atlas dashboard
4. Consider upgrading if you exceed free tier limits

---

**That's it!** Your analytics backend now has a real database! 🎉

