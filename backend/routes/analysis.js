const express = require('express');
const router = express.Router();
const multer = require('multer');
const analysisController = require('../Features/ResumeAnalysis');
const careerPathController = require("../Features/careerPathSuggestions");
const SkillsRecommend = require('../Features/SkillsRecommendation');
const Storage = require('../utilities/FileStorage');
const mockInter = require('../Features/MockInterviews');
const career = require('../Features/careerPathSuggestions');
const { main } = require('../utilities/GemmaResponse');

const upload = multer({ storage: Storage });

// Test endpoint to check if Groq API is working
router.post('/test', async (req, res) => {
    try {
        console.log("Test endpoint called");
        const testResponse = await main("Hello, this is a test message. Please respond with 'API is working correctly!'");
        res.json({ 
            success: true, 
            message: "API test successful", 
            response: testResponse 
        });
    } catch (error) {
        console.error("Test endpoint error:", error);
        res.status(500).json({ 
            success: false, 
            error: error.message,
            details: error.stack
        });
    }
});

router.post('/uploadResume', upload.single('file'), (req, res) => {
    console.log("File uploaded and saved as 'resume.pdf'");
    res.send("File uploaded successfully!");
});


router.post('/getcareerpaths', career.suggestCareerPaths);
router.post('/getmockinterviews', mockInter);
router.post('/getanalysis', analysisController.analysisControler);
router.post('/getskillsrecommendation', SkillsRecommend.RecommendSkills);

module.exports = router;