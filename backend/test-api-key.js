require('dotenv').config();
const Groq = require("groq-sdk");

async function testAPIKey() {
    const apiKey = process.env.GROQ_API_KEY;
    
    console.log("API Key found:", !!apiKey);
    console.log("API Key length:", apiKey ? apiKey.length : 0);
    console.log("API Key starts with 'gsk_':", apiKey ? apiKey.startsWith('gsk_') : false);
    console.log("API Key (first 20 chars):", apiKey ? apiKey.substring(0, 20) + '...' : 'None');
    
    try {
        const groq = new Groq({ apiKey: apiKey });
        
        // Try to list models first (simpler API call)
        console.log("\nTesting API connection...");
          const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Say 'API works'" }],
            model: "llama3-8b-8192", // Use current supported model
            max_tokens: 10
        });
        
        console.log("✅ API Key is valid!");
        console.log("Response:", response.choices[0]?.message?.content);
        
    } catch (error) {
        console.log("❌ API Key validation failed:");
        console.log("Error code:", error.status);
        console.log("Error message:", error.message);
        
        if (error.status === 401) {
            console.log("\n🔧 Possible solutions:");
            console.log("1. Check if your API key is correct");
            console.log("2. Verify your Groq account has credits");
            console.log("3. Ensure the API key is active");
            console.log("4. Try generating a new API key from Groq console");
        }
    }
}

testAPIKey();
