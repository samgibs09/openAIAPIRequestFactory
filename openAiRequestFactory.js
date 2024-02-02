require('dotenv').config();

const openAiChatFactory = (model, userVars) => {
    // Use the API key from the environment variables
    const api_key = process.env.OPENAI_API_KEY;

const openAiChatFactory = (api_key, model, userVars) => {
    // Returns a new function for sending messages
    return async (message) => {
        // Construct the message by appending user-specific variables
        const fullMessage = `${userVars.username}: ${message}`;

        // Prepare the payload
        const data = {
            model: model,
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: fullMessage }
            ]
        };

        // Configure request options
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify(data)
        };

        try {
            // Send the request
            const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', options);
            
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            // Parse the JSON response
            const responseData = await response.json();
            
            return responseData;
        } catch (error) {
            console.error('Error sending message to OpenAI:', error);
            throw error;
        }
    };
};

// Usage:
const userVars = { username: "JohnDoe" };
const sendMessage = openAiChatFactory('davinci-codex', userVars);
sendMessage('Hello, how can I assist you today?').then(response => {
    console.log('OpenAI response:', response);
}).catch(error => {
    console.error('Error:', error);
});
