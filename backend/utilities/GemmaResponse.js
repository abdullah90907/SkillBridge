const Groq = require("groq-sdk");
require('dotenv').config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const main = async (Content) => {
    try {
        console.log("Sending request to Groq API...");
        console.log("Content length:", Content.length);
        
        const chatCompletion = await GemmaResponse(Content);
        
        if (!chatCompletion || !chatCompletion.choices || !chatCompletion.choices[0]) {
            throw new Error("Invalid response structure from Groq API");
        }
        
        const response = chatCompletion.choices[0]?.message?.content || "";
        console.log("Received response from Groq API, length:", response.length);
        
        return response;
    } catch (error) {
        console.error("Error in main:", error);
        console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        throw new Error(`Failed to fetch AI response: ${error.message}`);
    }
};

const GemmaResponse = async (Content) => {
    try {
        console.log("Making request to Groq with model: llama3-8b-8192");
        
        const response = await groq.chat.completions.create({
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
            model: "llama3-8b-8192",
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: false,
        });
        
        console.log("Groq API response received successfully");
        return response;
        
    } catch (error) {
        console.error("Error in GemmaResponse:", error);
        if (error.status === 401) {
            throw new Error("Invalid API key. Please check your GROQ_API_KEY");
        } else if (error.status === 429) {
            throw new Error("Rate limit exceeded. Please try again later");
        } else if (error.status === 500) {
            throw new Error("Groq API server error. Please try again later");
        }
        throw error;
    }
};

module.exports = { main, GemmaResponse };
