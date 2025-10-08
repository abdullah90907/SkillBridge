# SkillBridge 🚀

**AI-Powered Resume Analysis & Career Guidance Platform**

SkillBridge is a comprehensive web application that leverages AI to analyze resumes, provide personalized career path suggestions, conduct mock interviews, and offer skill recommendations to help professionals advance their careers.

## ✨ Features

- **📄 Resume Analysis**: Upload PDF resumes for AI-powered analysis
- **🎯 Career Path Suggestions**: Get personalized career recommendations
- **🗣️ Mock Interviews**: Practice with AI-generated interview questions
- **📈 Skills Recommendations**: Discover skills to enhance your profile
- **🤖 AI-Powered Insights**: Powered by Groq's advanced language models

## 🛠️ Tech Stack

**Frontend:**
- React.js 18
- Bootstrap 5
- React Router
- Axios for API calls
- React Icons
- React Markdown

**Backend:**
- Node.js & Express.js
- Groq SDK for AI integration
- Multer for file uploads
- PDF-Parse for document processing
- CORS for cross-origin requests

**Deployment:**
- Vercel (Frontend & Serverless API)
- Environment variables for security

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Groq API key

### 1. Clone the Repository
```bash
git clone https://github.com/abdullah90907/skillbridge-app.git
cd skillbridge-app
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install API dependencies
cd ../api
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Groq API key
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run Development Servers
```bash
# Terminal 1: Frontend (React)
cd frontend
npm start

# Terminal 2: Backend (Express)
cd backend
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🌐 Deployment

### Deploy to Vercel

1. **Fork this repository**
2. **Connect to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings (auto-detected)

3. **Set Environment Variables:**
   ```
   GROQ_API_KEY=your_actual_groq_api_key
   REACT_APP_API_URL=https://your-app.vercel.app/api
   ```

4. **Deploy:** Vercel will automatically build and deploy your app

### Production URLs
- **App:** `https://your-app.vercel.app`
- **API Health:** `https://your-app.vercel.app/api/health`
- **Resume Analysis:** `https://your-app.vercel.app/api/ResumeAnalysis`

## 📁 Project Structure

```
skillbridge-app/
├── 📁 frontend/          # React.js application
│   ├── 📁 src/
│   │   ├── 📁 Components/
│   │   │   ├── 📁 FileUpload/
│   │   │   ├── 📁 LLM/
│   │   │   └── 📁 CustomModal/
│   │   ├── 📁 utils/
│   │   ├── App.js
│   │   └── index.js
│   └── 📄 package.json
├── 📁 backend/           # Express.js server
│   ├── 📁 routes/
│   ├── 📁 Features/
│   ├── 📁 utilities/
│   └── 📄 index.js
├── 📁 api/               # Vercel serverless functions
│   ├── 📄 index.js
│   └── 📄 package.json
├── 📄 vercel.json        # Vercel configuration
├── 📄 .env.example       # Environment template
└── 📄 README.md
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/ResumeAnalysis/upload` | Upload resume |
| POST | `/api/ResumeAnalysis/analyze` | Analyze resume |
| POST | `/api/ResumeAnalysis/career-suggestions` | Get career paths |
| POST | `/api/ResumeAnalysis/mock-interview` | Mock interview |
| POST | `/api/ResumeAnalysis/skill-recommendations` | Skill suggestions |

## 🎯 Key Features in Detail

### Resume Analysis
- Upload PDF resumes up to 10MB
- Extract text and analyze content
- Identify skills, experience, and qualifications
- Provide improvement suggestions

### Career Path Suggestions
- AI-powered career recommendations
- Based on current skills and experience
- Industry-specific guidance
- Growth opportunities identification

### Mock Interviews
- Generate relevant interview questions
- Industry and role-specific questions
- Practice responses and get feedback
- Build confidence for real interviews

### Skills Recommendations
- Identify skill gaps
- Suggest relevant technologies to learn
- Prioritize based on career goals
- Track learning progress

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for AI features | ✅ Yes |
| `REACT_APP_API_URL` | Backend API URL | ✅ Yes |
| `FRONTEND_URL` | Frontend URL for CORS | ❌ Optional |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure your domain is added to CORS configuration
- Check environment variables are set correctly

**File Upload Issues:**
- Maximum file size: 10MB
- Supported formats: PDF only
- Check file is not corrupted

**API Errors:**
- Verify Groq API key is valid and has credits
- Check network connectivity
- Review server logs in Vercel dashboard

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Abdullah Siddique**
- GitHub: [@abdullah90907](https://github.com/abdullah90907)
- LinkedIn: [Abdullah Siddique](https://linkedin.com/in/abdullah-siddique-682734263)
- Email: abdullahsiddique773@gmail.com

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for AI infrastructure
- [React](https://reactjs.org/) for the frontend framework
- [Vercel](https://vercel.com/) for hosting platform
- [Bootstrap](https://getbootstrap.com/) for UI components

---

⭐ Star this repository if you found it helpful!

