require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const API = process.env.GROQ_API_KEY;

const app = express();

// CORS configuration for production
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/ResumeAnalysis', require('./routes/analysis'));

// Test endpoint to verify API is working
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Backend is running successfully!', 
        timestamp: new Date().toISOString(),
        env: {
            hasGroqKey: !!process.env.GROQ_API_KEY,
            nodeEnv: process.env.NODE_ENV,
            port: process.env.PORT
        }
    });
});

// Test Groq API endpoint
app.get('/api/test-groq', async (req, res) => {
    try {
        const GemmaResponse = require('./utilities/GemmaResponse');
        const testResponse = await GemmaResponse.main("Say hello and confirm you're working!");
        res.json({ 
            success: true, 
            response: testResponse,
            model: 'gemma2-9b-it'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message,
            details: error.toString()
        });
    }
});

const port = process.env.PORT || 8000;

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log("Server is running on port", port);
    });
}

// Export for Vercel serverless functions
module.exports = app;