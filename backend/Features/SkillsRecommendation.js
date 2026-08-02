const PlainTextConversion = require('../utilities/PlainTextConversion');
const GemmaResponse = require('../utilities/GemmaResponse');

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

exports.RecommendSkills = async (req, res) => {
    try {
        let fileText = "";
        if (req.file) {
            fileText = await PlainTextConversion(req.file.path || req.file.buffer);
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
            promptContext = `Provide a concise skill roadmap for modern tech professionals (software engineering, data, AI).`;
        }

        const Prompt = `${promptContext}
Task: Recommend 3 essential skills to master with a brief Beginner -> Intermediate -> Advanced learning roadmap for each. Keep it balanced, highly concise, structured with bullet points, and include 1-2 platform links. Limit to under 250 words total.`;

        const SkillsRoadMap = await GemmaResponse.main(Prompt);

        return res.json({
            SkillsRoadMap: notePrefix + SkillsRoadMap,
            Type: "Recommend"
        });
    } catch (error) {
        console.error('Error recommending skills:', error);
        return res.status(500).json({ error: 'Failed to generate skills recommendation' });
    }
};