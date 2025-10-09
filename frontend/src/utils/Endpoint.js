// Use environment variable for production, fallback to localhost for development
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

// For Vercel deployment, the API is at /api
export const endpoint = process.env.NODE_ENV === 'production' 
    ? '/api' 
    : baseURL