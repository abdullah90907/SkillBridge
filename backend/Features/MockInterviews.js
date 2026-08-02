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

const Mock = async (req, res) => {
    try {
        let fileText = "";
        if (req.file) {
            fileText = await PlainTextConversion(req.file.path || req.file.buffer);
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

        const qPrompt = `${promptContext}
Task: Generate 4 concise, high-impact interview questions (mix of technical and behavioral). Number them 1-4. Keep it direct and under 120 words total.`;

        const questions = await GemmaResponse.main(qPrompt);

        const aPrompt = `Questions: ${questions}
Task: Provide brief, point-by-point sample key answers for each question above. Keep answers concise, clear, and structured. Limit to 200 words total.`;

        const answers = await GemmaResponse.main(aPrompt);

        return res.json({
            Questions: notePrefix + questions,
            answers: answers,
            Type: "Mock"
        });

    } catch (error) {
        console.error('Error in MockInterviews:', error);
        res.status(500).json({ error: 'Failed to generate mock interview.' });
    }
};

module.exports = Mock;