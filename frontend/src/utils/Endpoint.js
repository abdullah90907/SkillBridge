// Use environment variable for production, fallback to localhost for development
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

// Backend mounts all routes under /api — include it in both dev and production
export const endpoint = process.env.NODE_ENV === 'production'
    ? '/api'
    : `${baseURL}/api`