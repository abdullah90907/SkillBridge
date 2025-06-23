const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// CORS configuration for production
const corsOptions = {
    origin: true, // Allow all origins for Vercel deployment
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
app.use('/ResumeAnalysis', require('../backend/routes/analysis'));

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Backend is running successfully on Vercel!', 
        timestamp: new Date().toISOString(),
        env: {
            hasGroqKey: !!process.env.GROQ_API_KEY,
            nodeEnv: process.env.NODE_ENV || 'production'
        }
    });
});

// Test Groq API endpoint
app.get('/test-groq', async (req, res) => {
    try {
        const GemmaResponse = require('../backend/utilities/GemmaResponse');
        const testResponse = await GemmaResponse.main("Say hello and confirm you're working!");
        res.json({ 
            success: true, 
            response: testResponse,
            model: 'llama3-8b-8192'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message,
            details: error.toString()
        });
    }
});

// Export for Vercel
module.exports = app;
