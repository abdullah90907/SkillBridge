# SkillBridge - Vercel Deployment Guide

## 🚀 Project Structure for Vercel

```
SkillBridge/
├── api/                    # Vercel serverless functions
│   └── index.js           # Main API handler
├── backend/               # Backend logic (imported by API)
│   ├── Features/
│   ├── routes/
│   ├── utilities/
│   └── ...
├── frontend/              # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── vercel.json           # Vercel configuration
├── package.json          # Root package.json
└── .vercelignore         # Files to ignore during deployment
```

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Setup
Create these environment variables in Vercel dashboard:

- `GROQ_API_KEY` = `your_groq_api_key_here`
- `NODE_ENV` = `production`

### 2. Project Configuration
- ✅ Vercel.json configured for full-stack deployment
- ✅ API routes restructured for serverless functions
- ✅ Frontend endpoints updated to use `/api` prefix
- ✅ CORS configured for Vercel domain
- ✅ Build scripts optimized

## 🔧 Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy from project root:**
```bash
cd SkillBridge
vercel
```

4. **Set environment variables:**
```bash
vercel env add GROQ_API_KEY
# Enter your Groq API key when prompted
```

5. **Deploy to production:**
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. **Connect GitHub Repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project:**
   - Root Directory: `./` (keep default)
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `frontend/build`

3. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add: `GROQ_API_KEY` = `your_groq_api_key`
   - Add: `NODE_ENV` = `production`

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

## 🔗 API Endpoints (After Deployment)

Your deployed endpoints will be:
- `https://your-app.vercel.app/api/test` - Test backend
- `https://your-app.vercel.app/api/test-groq` - Test Groq API
- `https://your-app.vercel.app/api/ResumeAnalysis/uploadResume` - Upload resume
- `https://your-app.vercel.app/api/ResumeAnalysis/getanalysis` - Get analysis
- `https://your-app.vercel.app/api/ResumeAnalysis/getcareerpaths` - Career paths
- `https://your-app.vercel.app/api/ResumeAnalysis/getmockinterviews` - Mock interviews
- `https://your-app.vercel.app/api/ResumeAnalysis/getskillsrecommendation` - Skills

## 🧪 Testing Deployment

After deployment, test these URLs:

1. **Frontend:** `https://your-app.vercel.app`
2. **Backend Health:** `https://your-app.vercel.app/api/test`
3. **AI Integration:** `https://your-app.vercel.app/api/test-groq`

## 🔧 Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility

2. **API Not Working:**
   - Verify environment variables are set
   - Check function timeout limits (max 30s)

3. **CORS Issues:**
   - CORS is configured to allow all origins
   - Check browser console for specific errors

4. **File Upload Issues:**
   - Vercel has file size limits for serverless functions
   - Consider using external storage for large files

## 📊 Vercel Benefits for SkillBridge

- ✅ **Zero Config:** Deploy with minimal setup
- ✅ **Serverless:** Automatic scaling
- ✅ **Global CDN:** Fast worldwide access
- ✅ **Free Tier:** Generous limits for development
- ✅ **GitHub Integration:** Auto-deploy on push
- ✅ **Custom Domains:** Easy domain setup
- ✅ **Environment Variables:** Secure config management

## 🚀 Post-Deployment

1. **Custom Domain (Optional):**
   - Add your domain in Vercel dashboard
   - Update DNS settings

2. **Analytics:**
   - Enable Vercel Analytics for insights

3. **Performance:**
   - Monitor function execution times
   - Optimize based on Vercel metrics

Your SkillBridge app is now ready for production on Vercel! 🎉
