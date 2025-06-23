# SkillBridge Deployment Guide

## Prerequisites
1. Get your Groq API key
2. Install Git, Node.js, and necessary CLIs

## Backend Deployment (Heroku)
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create Heroku app
heroku create skillbridge-api-yourname

# Set environment variables
heroku config:set GROQ_API_KEY=your_groq_api_key_here
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-app-name.netlify.app

# Deploy
git add .
git commit -m "Deploy backend"
git push heroku main
```

## Frontend Deployment (Netlify)
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Update .env.production with your backend URL
# REACT_APP_API_URL=https://your-heroku-backend.herokuapp.com

# Build for production
npm run build

# Deploy to Netlify (using Netlify CLI)
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod --dir=build
```

## Environment Variables Setup

### Backend (.env):
```
GROQ_API_KEY=your_actual_groq_api_key
PORT=8000
NODE_ENV=production
FRONTEND_URL=https://your-netlify-app.netlify.app
```

### Frontend Netlify Environment Variables:
- Key: REACT_APP_API_URL
- Value: https://your-backend-url.herokuapp.com

## Post-Deployment Checklist
- [ ] Backend is accessible at your Heroku URL
- [ ] Frontend can communicate with backend API
- [ ] File upload functionality works
- [ ] All AI features are functional
- [ ] CORS is properly configured
