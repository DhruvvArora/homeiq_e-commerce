const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getDecision = async (text, imagePath) => {
    const prompt = `A user has reported an issue regarding a received package. Here is their description: "${text}". 
    An image is attached but will not be analyzed. 
    Based on this information, please provide a brief summary of the issue and then a decision strictly from the following options:
    - Refund Order
    - Replace Order
    - Escalate to Human Agent
    Please format your response as follows:
    Summary: [Your summary here]
    Decision: [Your decision here]`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3, 
        });

        const responseContent = response.choices[0].message.content.trim();

        const summaryMatch = responseContent.match(/Summary:\s*(.+)/);
        const decisionMatch = responseContent.match(/Decision:\s*(.+)/);

        const summary = summaryMatch ? summaryMatch[1].trim() : "No summary provided.";
        const decision = decisionMatch ? decisionMatch[1].trim() : "No decision provided.";

        if (!["Refund Order", "Replace Order", "Escalate to Human Agent"].includes(decision)) {
            throw new Error("Decision is not one of the expected options.");
        }

        console.log("Summary from OpenAI:", summary);
        console.log("Decision from OpenAI:", decision);
        return { summary, decision }; // Return both summary and decision
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw new Error('Error processing OpenAI decision');
    }
};

module.exports = { getDecision };
