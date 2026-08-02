const express = require('express');
const router = express.Router();
const multer = require('multer');
const analysisController = require('../Features/ResumeAnalysis');
const careerPathController = require("../Features/careerPathSuggestions");
const SkillsRecommend = require('../Features/SkillsRecommendation');
const Storage = require('../utilities/FileStorage');
const mockInter = require('../Features/MockInterviews');

// Multer middleware — saves uploaded resume as uploads/resume.pdf
const upload = multer({ storage: Storage });

// ──────────────────────────────────────────────────────────────
// NEW ROUTES — matching exactly what the frontend calls
// Frontend calls: POST /ResumeAnalysis/analysis   (with formData 'resume')
// ──────────────────────────────────────────────────────────────
router.post('/analysis', upload.single('resume'), analysisController.analysisControler);
router.post('/mock-interview', upload.single('resume'), mockInter);
router.post('/career-suggestions', upload.single('resume'), careerPathController.suggestCareerPaths);
router.post('/skills-recommendations', upload.single('resume'), SkillsRecommend.RecommendSkills);

// ──────────────────────────────────────────────────────────────
// LEGACY ROUTES — kept for backward compatibility
// ──────────────────────────────────────────────────────────────
router.post('/uploadResume', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log("File uploaded and saved as 'resume.pdf'");
        res.status(200).json({ 
            message: "File uploaded successfully!",
            filename: req.file.filename 
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

router.post('/getcareerpaths', upload.single('resume'), careerPathController.suggestCareerPaths);
router.post('/getmockinterviews', upload.single('resume'), mockInter);
router.post('/getanalysis', upload.single('resume'), analysisController.analysisControler);
router.post('/getskillsrecommendation', upload.single('resume'), SkillsRecommend.RecommendSkills);

module.exports = router;