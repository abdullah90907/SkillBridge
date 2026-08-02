const PlainTextConversion = require('../utilities/PlainTextConversion');
const GetGemmaResponse = require('../utilities/GemmaResponse');

// Helper to check if text looks like a standard CV/Resume
const isResumeText = (text) => {
    if (!text || text.trim().length < 50) return false;
    const lower = text.toLowerCase();
    const keywords = [
        'experience', 'education', 'skills', 'projects', 'work history',
        'summary', 'curriculum vitae', 'resume', 'contact', 'profile',
        'employment', 'university', 'bachelor', 'master', 'certification',
        'technologies', 'responsibilities', 'achievements'
    ];
    let matches = 0;
    for (const kw of keywords) {
        if (lower.includes(kw)) matches++;
    }
    return matches >= 2;
};

exports.analysisControler = async (req, res) => {
    try {
        const hasFile = req.file || (req.body?.hasResume === 'true');
        let fileText = "";

        if (req.file) {
            fileText = await PlainTextConversion(req.file.path || req.file.buffer);
        }

        let notePrefix = "";
        let analysisPromptContext = "";

        if (req.file && fileText.trim().length > 20) {
            if (isResumeText(fileText)) {
                // Case A: Standard Resume/CV
                analysisPromptContext = `Candidate Resume/CV Content:\n"${fileText.slice(0, 3000)}"\n`;
            } else {
                // Case B: Non-Resume Document
                notePrefix = `> 📝 **Note:** This document doesn't appear to be a standard CV or Resume. However, based on the topics and skills found in your file, here is how it relates to your career growth:\n\n`;
                analysisPromptContext = `Document Content (Non-Resume):\n"${fileText.slice(0, 3000)}"\nAnalyze the skills, domain knowledge, and concepts mentioned in this document to guide the user's career and skill growth.\n`;
            }
        } else {
            // Case C: No File Uploaded
            notePrefix = `> 💡 **Note:** No document was uploaded. Here is a concise, balanced overview of key skill gaps, learning paths, and recommended projects:\n\n`;
            analysisPromptContext = `Provide a concise, balanced guide for a tech/software career professional.\n`;
        }

        const prompt1 = `${analysisPromptContext}
Task 1: Identify 3-4 key Skill Gaps or missing related skills. Keep it concise, direct, and bulleted. Include 2 quick learning links/resources. Limit to 150 words.`;

        const prompt2 = `${analysisPromptContext}
Task 2: Recommend 3 top relevant online courses (free and paid) with platform names, course titles, and quick links. Keep it short and bulleted. Limit to 150 words.`;

        const prompt3 = `${analysisPromptContext}
Task 3: Recommend 3 valuable professional certifications with issuing organizations and URLs. Keep it concise and bulleted. Limit to 120 words.`;

        const prompt4 = `${analysisPromptContext}
Task 4: Suggest 3 practical portfolio projects to showcase expertise. Give brief project title, tech stack, and key goal for each. Keep it concise. Limit to 150 words.`;

        // Execute requests concurrently for speed & efficiency
        const [rawGaps, rawCourses, rawCerts, rawProjects] = await Promise.all([
            GetGemmaResponse.main(prompt1),
            GetGemmaResponse.main(prompt2),
            GetGemmaResponse.main(prompt3),
            GetGemmaResponse.main(prompt4)
        ]);

        return res.json({
            SkillsGaps: notePrefix + rawGaps,
            RecommendedCourse: rawCourses,
            RecommendedCertificates: rawCerts,
            ReleventProjects: rawProjects,
            Type: "Analysis"
        });

    } catch (error) {
        console.error('Error in ResumeAnalysis:', error);
        res.status(500).json({ error: 'Failed to perform analysis. Please try again.' });
    }
};
