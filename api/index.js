require('dotenv').config();
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');

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

// Configure multer for file uploads in serverless environment
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Import utilities directly
const PdfParser = require('pdf-parse');
const Groq = require("groq-sdk");

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Plain text conversion utility
const PlainTextConversion = (input) => {
    return new Promise((resolve, reject) => {
        try {
            let dataBuffer;
            
            // Check if input is a buffer (from multer) or a file path
            if (Buffer.isBuffer(input)) {
                dataBuffer = input;
            } else {
                // Read from file path (for backward compatibility)
                const fs = require('fs');
                dataBuffer = fs.readFileSync(input);
            }
            
            PdfParser(dataBuffer)
                .then((data) => {
                    resolve(data.text);
                })
                .catch((error) => {
                    console.error("Error while parsing PDF:", error);
                    reject(error);
                });
        } catch (error) {
            console.error("Error while processing file:", error);
            reject(error);
        }
    });
};

// Groq response utility
const GemmaResponse = {
    main: async (Content) => {
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are an AI model designed to assist with user queries in an intelligent and helpful manner.",
                    },
                    {
                        role: "user",
                        content: Content,
                    }
                ],
                model: "llama3-70b-8192",
                temperature: 0.5,
                max_tokens: 1024,
                top_p: 1,
                stop: null,
                stream: false,
            });
            return chatCompletion.choices[0]?.message?.content || "";
        } catch (error) {
            console.error("Error in Groq API call:", error);
            throw new Error("Failed to fetch AI response");
        }
    }
};

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'Server is running', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});

// Resume Analysis endpoint
app.post('/ResumeAnalysis/analysis', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Convert buffer to text
        const resumeText = await PlainTextConversion(req.file.buffer);
        
        const prompt1 = `Here is the detailed resume: ${resumeText}. Based on the skills mentioned, please identify any skill gaps the candidate has. Provide a list of related missing or underdeveloped skills that could improve their qualifications (Note. Only add related to mentioned skills on resume, don't add every skill). Include suggestions for learning resources and platforms where the candidate can improve these skills. Be sure to reference specific skills from the resume.`;
        const prompt2 = `Here is the detailed resume: ${resumeText}. Based on the skills mentioned, recommend online courses (both free and paid) that would help the candidate strengthen their skills and make their resume more competitive. Include course names, platforms, URLs, and any additional relevant information about the course.`;
        const prompt3 = `Here is the detailed resume: ${resumeText}. Based on the skills and job positions mentioned, recommend relevant certifications that would enhance the candidate's qualifications. Include certification names, issuing organizations, URLs, and whether they are free or paid.`;
        const prompt4 = `Here is the detailed resume: ${resumeText}. Based on the candidate's skills and experience, suggest relevant personal or professional projects that can be worked on to improve their portfolio. These projects should be aligned with their career goals and should help showcase their expertise. Provide project ideas along with any resources or tools that can be used to build them.`;

        const [SkillsGaps, RecommendedCourse, RecommendedCertificates, ReleventProjects] = await Promise.all([
            GemmaResponse.main(prompt1),
            GemmaResponse.main(prompt2),
            GemmaResponse.main(prompt3),
            GemmaResponse.main(prompt4)
        ]);
        
        return res.json({
            SkillsGaps,
            RecommendedCourse,
            RecommendedCertificates,
            ReleventProjects,
            Type: "Analysis"
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error processing resume analysis' });
    }
});

// Career Path Suggestions endpoint
app.post('/ResumeAnalysis/career-suggestions', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const resumeText = await PlainTextConversion(req.file.buffer);
        
        const prompt = `Based on the following resume, suggest relevant career paths, industry trends, and future growth areas:
        Resume Text: "${resumeText}"
        
        Focus on skills, qualifications, and interests mentioned in the resume.`;

        const recommendedPaths = await GemmaResponse.main(prompt);

        return res.status(200).json({
            message: "Career paths suggested successfully",
            recommendedPaths,
            Type: "Career",
        });
    } catch (error) {
        console.error('Error processing career suggestions:', error);
        return res.status(500).json({ message: "Error processing the resume." });
    }
});

// Mock Interview endpoint
app.post('/ResumeAnalysis/mock-interview', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const resumeText = await PlainTextConversion(req.file.buffer);
        
        const prompt = `Based on this resume: ${resumeText}
        
        Generate 5 relevant interview questions that an interviewer might ask this candidate. Include:
        1. Technical questions based on their skills
        2. Behavioral questions
        3. Experience-based questions
        
        Format as a JSON array of questions.`;

        const questions = await GemmaResponse.main(prompt);

        return res.status(200).json({
            message: "Mock interview questions generated successfully",
            questions,
            Type: "Interview"
        });
    } catch (error) {
        console.error('Error generating interview questions:', error);
        return res.status(500).json({ message: "Error generating interview questions." });
    }
});

// Skills Recommendations endpoint
app.post('/ResumeAnalysis/skills-recommendations', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const resumeText = await PlainTextConversion(req.file.buffer);
        
        const prompt = `Based on this resume: ${resumeText}
        
        Recommend additional skills that would complement the candidate's current skillset and make them more competitive in their field. Focus on:
        1. Emerging technologies in their domain
        2. Soft skills that would benefit their career
        3. Cross-functional skills
        
        Provide learning resources for each recommended skill.`;

        const skillsRecommendations = await GemmaResponse.main(prompt);

        return res.status(200).json({
            message: "Skills recommendations generated successfully",
            skillsRecommendations,
            Type: "Skills"
        });
    } catch (error) {
        console.error('Error generating skills recommendations:', error);
        return res.status(500).json({ message: "Error generating skills recommendations." });
    }
});

// Export for Vercel
module.exports = app;