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

exports.suggestCareerPaths = async (req, res) => {
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
                notePrefix = `> 📝 **Note:** This document doesn't appear to be a standard CV or Resume. Based on the domain topics found in your document, here are suggested career directions:\n\n`;
                promptContext = `Based on document content: "${fileText.slice(0, 3000)}"`;
            }
        } else {
            notePrefix = `> 💡 **Note:** No document was uploaded. Here is a concise, balanced guide on current top career paths in technology & business:\n\n`;
            promptContext = `Provide a concise overview of modern career paths in technology, AI, data, and software engineering.`;
        }

        const prompt = `${promptContext}
Task: Suggest 3-4 clear career paths, key industry trends, and high-growth skill areas. Keep the response balanced, concise, and structured with bullet points. Avoid long preambles. Limit response to under 250 words.`;

        const rawResult = await GemmaResponse.main(prompt);

        return res.status(200).json({
            message: "Career paths suggested successfully",
            recommendedPaths: notePrefix + rawResult,
            Type: "Career",
        });
    } catch (error) {
        console.error('Error suggesting career paths:', error);
        return res.status(500).json({ message: "Error processing career path suggestions." });
    }
};