const express = require('express');
const router = express.Router();
const multer = require('multer');
const analysisController = require('../Features/ResumeAnalysis');
const careerPathController = require("../Features/careerPathSuggestions");
const SkillsRecommend = require('../Features/SkillsRecommendation');
const Storage = require('../utilities/FileStorage');
const mockInter = require('../Features/MockInterviews');
const career = require('../Features/careerPathSuggestions');

const upload = multer({ storage: Storage });

router.post('/uploadResume', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        console.log("File uploaded and saved as 'resume.pdf'");
        console.log("File details:", {
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype
        });
        
        res.status(200).json({ 
            message: "File uploaded successfully!",
            filename: req.file.filename 
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});


router.post('/getcareerpaths', career.suggestCareerPaths);
router.post('/getmockinterviews', mockInter);
router.post('/getanalysis', analysisController.analysisControler);
router.post('/getskillsrecommendation', SkillsRecommend.RecommendSkills);

module.exports = router;