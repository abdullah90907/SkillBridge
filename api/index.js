require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();

// CORS configuration for Vercel
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        /\.vercel\.app$/,
        process.env.FRONTEND_URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Import analysis routes
const analysisRouter = require('../backend/routes/analysis');

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'Server is running', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});

// Resume analysis routes
app.use('/ResumeAnalysis', analysisRouter);

// Export for Vercel
module.exports = app;