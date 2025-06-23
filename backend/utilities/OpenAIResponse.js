// Alternative AI Response utility using OpenAI
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Add this to your .env file
});

const mainOpenAI = async (Content) => {
    try {
        console.log("Sending request to OpenAI API...");
        console.log("Content length:", Content.length);
        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // or "gpt-4" if you have access
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
            max_tokens: 1024,
            temperature: 0.5,
        });
        
        const result = response.choices[0]?.message?.content || "";
        console.log("Received response from OpenAI API, length:", result.length);
        
        return result;
    } catch (error) {
        console.error("Error in OpenAI API:", error);
        if (error.status === 401) {
            throw new Error("Invalid OpenAI API key. Please check your OPENAI_API_KEY");
        } else if (error.status === 429) {
            throw new Error("OpenAI rate limit exceeded. Please try again later");
        } else if (error.status === 500) {
            throw new Error("OpenAI API server error. Please try again later");
        }
        throw error;
    }
};

module.exports = { mainOpenAI };
