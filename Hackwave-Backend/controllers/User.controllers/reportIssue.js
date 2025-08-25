const Complaint = require("../../models/complaint.model");
const reportIssue = async (req, res) => {
    const issueType = req.params.type;
    const userId = req.user.id;
    const issueDetails = req.body;

    // Handle report issue logic here
    if(!userId || !issueType || !issueDetails) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = new Complaint({
        userId,
        issueType,
        issueDetails
    });
    try{
        await newComplaint.save();
        return res.status(200).json({ message: "Issue reported successfully" });
    }catch(error){
        return res.status(500).json({ message: "Error reporting issue", error });
    }
        
};

module.exports = {
    reportIssue
};
