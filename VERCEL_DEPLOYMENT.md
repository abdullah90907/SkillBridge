# Vercel Deployment Guide for SkillBridge

## Prerequisites
- GitHub account (or GitLab/Bitbucket)
- Vercel account (free tier available)
- Groq API key

## Environment Variables (.env file)

Create a `.env` file in the root directory with your actual API key:

```env
GROQ_API_KEY=your_actual_groq_api_key_here
```

**Important:** Never commit your actual `.env` file to Git. Use `.env.example` as a template.

## Deployment Steps

### 1. Push to GitHub Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Setup Vercel deployment configuration"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/skillbridge.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Vercel

1. **Visit [vercel.com](https://vercel.com)** and sign up/login
2. **Connect GitHub:** Link your GitHub account
3. **Import Project:** Click "Add New Project" → Import your repository
4. **Configure Build Settings:**
   - Framework Preset: `Other`
   - Root Directory: `./` (leave empty)
   - Build Command: `npm run build`
   - Output Directory: `frontend/build`

### 3. Set Environment Variables in Vercel

1. Go to your project dashboard in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `GROQ_API_KEY` | `your_actual_groq_api_key` | Production, Preview |
| `REACT_APP_API_URL` | `https://your-app-name.vercel.app/api` | Production, Preview |

### 4. Deploy

1. Click **Deploy** in Vercel dashboard
2. Wait for deployment to complete (usually 2-5 minutes)
3. Your app will be available at `https://your-app-name.vercel.app`

## File Structure for Vercel

```
├── package.json (root - for Vercel build)
├── vercel.json (Vercel configuration)
├── .env.example (environment template)
├── .gitignore (ignore sensitive files)
├── frontend/
│   ├── package.json
│   ├── src/
│   └── public/
└── backend/
    ├── package.json
    ├── index.js (updated with /api routes)
    └── routes/
```

## API Routes in Production

- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-app.vercel.app/api`
- Health Check: `https://your-app.vercel.app/api/health`
- Resume Analysis: `https://your-app.vercel.app/api/ResumeAnalysis`

## Testing Deployment

1. Visit your Vercel URL
2. Test the health endpoint: `https://your-app.vercel.app/api/health`
3. Upload a resume and test the AI analysis
4. Check browser console for any errors

## Troubleshooting

### Common Issues:

1. **API Routes Not Working:**
   - Check `vercel.json` routing configuration
   - Ensure backend routes have `/api` prefix

2. **Environment Variables:**
   - Verify all environment variables are set in Vercel dashboard
   - Redeploy after adding new environment variables

3. **CORS Errors:**
   - Check CORS configuration in `backend/index.js`
   - Ensure your Vercel domain is allowed

4. **Build Failures:**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are properly installed

## Custom Domain (Optional)

1. Go to **Settings** → **Domains** in Vercel
2. Add your custom domain
3. Update DNS records as instructed
4. Update `REACT_APP_API_URL` environment variable

## Monitoring

- View deployment logs in Vercel dashboard
- Monitor function execution in Vercel Analytics
- Check error logs for debugging

## Security Notes

- Never commit `.env` files with real API keys
- Use Vercel's environment variables for sensitive data
- Regularly rotate API keys
- Monitor API usage and set limits if needed