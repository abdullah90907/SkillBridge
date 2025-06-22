# Gemma AI Resume Analyzer 🚀

An AI-powered resume analysis tool built with React and Node.js, using Groq's Gemma models for intelligent resume insights.

## Features ✨

- **Resume Analysis**: Upload PDF resumes for AI-powered analysis
- **Career Path Suggestions**: Get personalized career recommendations 
- **Mock Interviews**: Practice with AI-generated interview questions
- **Skills Recommendations**: Discover relevant skills to develop
- **Modern UI**: Beautiful React interface with Bootstrap styling

## Quick Start 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Groq API key

### 1. Get API Key
1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign up/Login and create an API key
3. Copy your API key

### 2. Configure Environment
1. Open `backend\.env`
2. Add your API key:
   ```env
   GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

### 3. Install & Run

**Option A: Quick Start (Recommended)**
- Double-click `start.bat` in the root directory

**Option B: Manual Start**
1. Install dependencies (already done)
2. Start backend: `cd backend && npm start`
3. Start frontend: `cd frontend && npm start`

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## Important Notes 📝

- Make sure to set your GROQ_API_KEY in the `backend/.env` file
- Both servers should be running for the application to work properly
- The backend runs on port 8000, frontend on port 3000

