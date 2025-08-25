const Complaint = require('../../models/complaint.model');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const storingApiData = async (req,res)=> {
    try {
        console.log(req.body)
    const data = req.body.command;
    console.log("Complaint received:", data);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const prompt = `
    You are a complaint classification system.
    Classify the following citizen complaint into one of these categories:
    [Water, Garbage, House Tax, Street Light, Drainage, Road Repair, Other].
    Return only the category name without extra text.

    Complaint: "${data}"
    `;

    const result = await model.generateContent(prompt);
    const category = result.response.text().trim();
    
        console.log(category);
        const complaint = new Complaint({
            userId: req.user._id,
            issueType: category,
            issueDetails: data
        });
        await complaint.save();
        return res.status(200).json({message: "Complaint classified and saved"});
    }   catch (err) {
        console.error("Error saving complaint:", err);
        return res.status(500).json({ error: "Failed to save complaint" });     
    }
    console.log("Predicted category:", category);
}

module.exports = { storingApiData };
