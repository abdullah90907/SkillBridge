const Groq = require("groq-sdk");
require('dotenv').config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const main = async (Content) => {
    try {
        const chatCompletion = await GemmaResponse(Content);
        return chatCompletion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Error in main:", error);
        throw new Error("Failed to fetch AI response");
    }
};

const GemmaResponse = async (Content) => {
    return groq.chat.completions.create({
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
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 4096,
        top_p: 1,
        stop: null,
        stream: false,
    });
};

module.exports = { main, GemmaResponse };
