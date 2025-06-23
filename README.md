# SkillBridge - AI-Powered Career Development Platform

A full-stack web application that helps users with career development through AI-powered features including resume analysis, skill recommendations, mock interviews, and career path suggestions.

## 🚀 Features

- **Resume Analysis** - AI-powered resume feedback and optimization
- **Skills Recommendation** - Personalized skill development suggestions  
- **Mock Interviews** - Practice interviews with AI feedback
- **Career Path Suggestions** - AI-guided career roadmaps
- **Modern UI/UX** - Responsive design with React and Bootstrap

## 🛠️ Tech Stack

### Frontend
- **React** - Modern JavaScript library for building user interfaces
- **React Bootstrap** - UI components and responsive design
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### Backend  
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework
- **Groq API** - AI language model integration
- **Multer** - File upload handling
- **PDF Parse** - PDF document processing

## 📁 Project Structure

```
SkillBridge/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/                 # React components and logic
│   ├── package.json         # Frontend dependencies
│   └── .env.production      # Production environment config
├── backend/                 # Node.js backend API
│   ├── Features/            # AI feature implementations
│   ├── routes/              # API route handlers
│   ├── utilities/           # Helper functions
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
├── vercel.json              # Vercel deployment configuration
└── package.json             # Root monorepo scripts
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Select "Other" as framework preset

2. **Environment Variables**
   - Set `GROQ_API_KEY` in Vercel dashboard: `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`

3. **Deploy**
   - Vercel automatically detects the configuration
   - Frontend builds as static site
   - Backend deploys as serverless functions

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Start Development**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

## 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build frontend for production
- `npm start` - Start backend server

## 🌐 API Endpoints

- `GET /api/test` - Backend health check
- `GET /api/test-groq` - Groq AI connectivity test  
- `POST /api/ResumeAnalysis/*` - Resume analysis endpoints

## 📝 Package.json Files (NOT Duplicates)

The project has **3 different package.json files** serving different purposes:

1. **Root `/package.json`** - Monorepo management scripts
2. **`/frontend/package.json`** - React app dependencies 
3. **`/backend/package.json`** - Node.js server dependencies

This is the **correct structure** for a monorepo project.

---

**Ready for Vercel deployment!** 🚀

