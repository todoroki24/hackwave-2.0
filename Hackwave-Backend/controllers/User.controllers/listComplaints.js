const Complaints = require('../../models/complaint.model');

const listComplaints = async (req, res) => {
    try {
        if(!req.user || !req.user._id) {
            return res.status(404).json({ error: "User not found" });
        }
        const complaints = await Complaints.find({ user: req.user._id });
        return res.status(200).json({ success: true, complaints });
    } catch (error) {
        console.error("Error fetching complaints:", error);
        return res.status(500).json({ error: "Failed to fetch complaints" });
    }
};

module.exports = listComplaints;
