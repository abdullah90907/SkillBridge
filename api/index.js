require('dotenv').config();
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const PdfParser = require('pdf-parse');
const Groq = require("groq-sdk");

const app = express();

// CORS configuration for Vercel
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        /\.vercel\.app$/,
        process.env.FRONTEND_URL || '*'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer memory storage for Vercel serverless environment
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Plain text conversion utility
const PlainTextConversion = (input) => {
    return new Promise((resolve) => {
        try {
            let dataBuffer;
            if (Buffer.isBuffer(input)) {
                dataBuffer = input;
            } else if (input) {
                const fs = require('fs');
                if (fs.existsSync(input)) {
                    dataBuffer = fs.readFileSync(input);
                } else {
                    return resolve("");
                }
            } else {
                return resolve("");
            }
            
            PdfParser(dataBuffer)
                .then((data) => {
                    resolve(data.text || "");
                })
                .catch(() => {
                    try {
                        const rawText = dataBuffer.toString('utf8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
                        resolve(rawText || "");
                    } catch (e) {
                        resolve("");
                    }
                });
        } catch (error) {
            resolve("");
        }
    });
};

// Groq response utility with llama-3.3-70b-versatile
const GemmaResponse = {
    main: async (Content) => {
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are SkillBridge AI, a smart, concise, and helpful career assistant. Always provide well-structured, clear, balanced, and token-efficient responses using bullet points and short sections. Avoid fluff, repetitive text, and long preambles.",
                    },
                    {
                        role: "user",
                        content: Content,
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.4,
                max_tokens: 1500,
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

const isResumeText = (text) => {
    if (!text || text.trim().length < 50) return false;
    const lower = text.toLowerCase();
    const keywords = ['experience', 'education', 'skills', 'projects', 'work history', 'summary', 'curriculum vitae', 'resume', 'contact', 'profile'];
    let matches = 0;
    for (const kw of keywords) {
        if (lower.includes(kw)) matches++;
    }
    return matches >= 2;
};

// Health check endpoint (matches /health and /api/health)
app.get(['/health', '/api/health'], (req, res) => {
    res.json({ 
        status: 'Server is running', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'production'
    });
});

// Helper to handle Analysis logic
const handleAnalysis = async (req, res) => {
    try {
        let fileText = "";
        if (req.file) {
            fileText = await PlainTextConversion(req.file.buffer || req.file.path);
        }

        let notePrefix = "";
        let analysisPromptContext = "";

        if (req.file && fileText.trim().length > 20) {
            if (isResumeText(fileText)) {
                analysisPromptContext = `Candidate Resume/CV Content:\n"${fileText.slice(0, 3000)}"\n`;
            } else {
                notePrefix = `> 📝 **Note:** This document doesn't appear to be a standard CV or Resume. However, based on the topics and skills found in your file, here is how it relates to your career growth:\n\n`;
                analysisPromptContext = `Document Content (Non-Resume):\n"${fileText.slice(0, 3000)}"\nAnalyze the skills and concepts mentioned in this document to guide the user's career growth.\n`;
            }
        } else {
            notePrefix = `> 💡 **Note:** No document was uploaded. Here is a concise, balanced overview of key skill gaps, learning paths, and recommended projects:\n\n`;
            analysisPromptContext = `Provide a concise, balanced guide for a tech/software career professional.\n`;
        }

        const prompt1 = `${analysisPromptContext} Task 1: Identify 3-4 key Skill Gaps or missing related skills. Keep it concise, direct, and bulleted. Include 2 quick learning links/resources. Limit to 150 words.`;
        const prompt2 = `${analysisPromptContext} Task 2: Recommend 3 top relevant online courses (free and paid) with platform names, course titles, and quick links. Keep it short and bulleted. Limit to 150 words.`;
        const prompt3 = `${analysisPromptContext} Task 3: Recommend 3 valuable professional certifications with issuing organizations and URLs. Keep it concise and bulleted. Limit to 120 words.`;
        const prompt4 = `${analysisPromptContext} Task 4: Suggest 3 practical portfolio projects to showcase expertise. Give brief project title, tech stack, and key goal for each. Limit to 150 words.`;

        const [rawGaps, rawCourses, rawCerts, rawProjects] = await Promise.all([
            GemmaResponse.main(prompt1),
            GemmaResponse.main(prompt2),
            GemmaResponse.main(prompt3),
            GemmaResponse.main(prompt4)
        ]);

        return res.json({
            SkillsGaps: notePrefix + rawGaps,
            RecommendedCourse: rawCourses,
            RecommendedCertificates: rawCerts,
            ReleventProjects: rawProjects,
            Type: "Analysis"
        });

    } catch (error) {
        console.error('Error in handleAnalysis:', error);
        return res.status(500).json({ message: 'Error processing resume analysis' });
    }
};

// Helper for Career Suggestions
const handleCareerSuggestions = async (req, res) => {
    try {
        let fileText = "";
        if (req.file) {
            fileText = await PlainTextConversion(req.file.buffer || req.file.path);
        }

        let notePrefix = "";
        let promptContext = "";

        if (req.file && fileText.trim().length > 20) {
            if (isResumeText(fileText)) {
                promptContext = `Based on candidate resume content: "${fileText.slice(0, 3000)}"`;
            } else {
                notePrefix = `> 📝 **Note:** This document doesn't appear to be a standard CV or Resume. Based on the domain topics found in your document, here are suggested career directions:\n\n`;
                promptContext = `Based on document content: "${fileText.slice(0, 3000)}"`;
            }
        } else {
            notePrefix = `> 💡 **Note:** No document was uploaded. Here is a concise, balanced guide on current top career paths in technology & business:\n\n`;
            promptContext = `Provide a concise overview of modern career paths in technology, AI, data, and software engineering.`;
        }

        const prompt = `${promptContext}\nTask: Suggest 3-4 clear career paths, key industry trends, and high-growth skill areas. Keep response balanced, concise, and structured with bullet points. Limit to 250 words.`;

        const recommendedPaths = await GemmaResponse.main(prompt);

        return res.status(200).json({
            message: "Career paths suggested successfully",
            recommendedPaths: notePrefix + recommendedPaths,
            Type: "Career",
        });
    } catch (error) {
        console.error('Error handling career suggestions:', error);
        return res.status(500).json({ message: "Error processing career suggestions." });
    }
};

// Helper for Mock Interview
const handleMockInterview = async (req, res) => {
    try {
        let fileText = "";
        if (req.file) {
            fileText = await PlainTextConversion(req.file.buffer || req.file.path);
        }

        let notePrefix = "";
        let promptContext = "";

        if (req.file && fileText.trim().length > 20) {
            if (isResumeText(fileText)) {
                promptContext = `Candidate resume content: "${fileText.slice(0, 3000)}"`;
            } else {
                notePrefix = `> 📝 **Note:** This document doesn't appear to be a standard CV or Resume. Based on the domain & topics in your document, here are relevant mock interview questions:\n\n`;
                promptContext = `Document content: "${fileText.slice(0, 3000)}"`;
            }
        } else {
            notePrefix = `> 💡 **Note:** No document was uploaded. Here are 4 core technical & behavioral mock interview questions:\n\n`;
            promptContext = `Provide a standard technical & behavioral mock interview for a software/tech role.`;
        }

        const qPrompt = `${promptContext}\nTask: Generate 4 concise, high-impact interview questions (mix of technical and behavioral). Number them 1-4. Keep under 120 words total.`;
        const questions = await GemmaResponse.main(qPrompt);

        const aPrompt = `Questions: ${questions}\nTask: Provide brief, point-by-point sample key answers for each question above. Limit to 200 words total.`;
        const answers = await GemmaResponse.main(aPrompt);

        return res.json({
            Questions: notePrefix + questions,
            answers: answers,
            Type: "Mock"
        });
    } catch (error) {
        console.error('Error handling mock interview:', error);
        return res.status(500).json({ message: "Error generating interview questions." });
    }
};

// Helper for Skills Recommendation
const handleSkillsRecommendations = async (req, res) => {
    try {
        let fileText = "";
        if (req.file) {
            fileText = await PlainTextConversion(req.file.buffer || req.file.path);
        }

        let notePrefix = "";
        let promptContext = "";

        if (req.file && fileText.trim().length > 20) {
            if (isResumeText(fileText)) {
                promptContext = `Based on candidate resume content: "${fileText.slice(0, 3000)}"`;
            } else {
                notePrefix = `> 📝 **Note:** This document doesn't appear to be a standard CV or Resume. Based on the concepts found in your file, here are recommended skills & learning roadmaps:\n\n`;
                promptContext = `Based on document content: "${fileText.slice(0, 3000)}"`;
            }
        } else {
            notePrefix = `> 💡 **Note:** No document was uploaded. Here is a concise, balanced skill roadmap for core technical & soft skills:\n\n`;
            promptContext = `Provide a concise skill roadmap for modern tech professionals.`;
        }

        const Prompt = `${promptContext}\nTask: Recommend 3 essential skills to master with a brief Beginner -> Intermediate -> Advanced learning roadmap for each. Include 1-2 platform links. Limit to under 250 words.`;

        const SkillsRoadMap = await GemmaResponse.main(Prompt);

        return res.json({
            SkillsRoadMap: notePrefix + SkillsRoadMap,
            Type: "Recommend"
        });
    } catch (error) {
        console.error('Error handling skills recommendations:', error);
        return res.status(500).json({ message: "Error generating skills recommendations." });
    }
};

// Mount endpoints under both `/api/ResumeAnalysis/...` AND `/ResumeAnalysis/...` AND legacy paths to prevent 404 on Vercel
const analysisPaths = ['/api/ResumeAnalysis/analysis', '/ResumeAnalysis/analysis', '/api/getanalysis', '/getanalysis'];
const careerPaths = ['/api/ResumeAnalysis/career-suggestions', '/ResumeAnalysis/career-suggestions', '/api/getcareerpaths', '/getcareerpaths'];
const mockPaths = ['/api/ResumeAnalysis/mock-interview', '/ResumeAnalysis/mock-interview', '/api/getmockinterviews', '/getmockinterviews'];
const skillsPaths = ['/api/ResumeAnalysis/skills-recommendations', '/ResumeAnalysis/skills-recommendations', '/api/getskillsrecommendation', '/getskillsrecommendation'];

app.post(analysisPaths, upload.single('resume'), handleAnalysis);
app.post(careerPaths, upload.single('resume'), handleCareerSuggestions);
app.post(mockPaths, upload.single('resume'), handleMockInterview);
app.post(skillsPaths, upload.single('resume'), handleSkillsRecommendations);

// Export for Vercel serverless environment
module.exports = app;