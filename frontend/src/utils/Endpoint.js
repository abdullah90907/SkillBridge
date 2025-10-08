// Use environment variable for production, fallback to localhost for development
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000'
export const endpoint = baseURL.endsWith('/api') ? baseURL : `${baseURL}/api`