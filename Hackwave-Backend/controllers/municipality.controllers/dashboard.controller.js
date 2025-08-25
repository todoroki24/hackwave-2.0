const Complaint = require('../../models/complaint.model.js');

const getDashboardData = async (req, res) => {
    try {
        // Get total complaints
        const totalComplaints = await Complaint.countDocuments();
        
        // Get all complaints with issueType and issueDetails
        const allComplaints = await Complaint.find({})
            .sort({ createdAt: -1 })
            .populate('userId', 'name email')
            .select('issueType issueDetails createdAt');
        
        // Get recent complaints (last 10)
        const recentComplaints = allComplaints.slice(0, 10);
        
        // Get active complaints (all complaints as tasks)
        const activeTasks = allComplaints.slice(0, 5).map(complaint => ({
            id: complaint._id,
            issueType: complaint.issueType,
            issueDetails: complaint.issueDetails,
            createdAt: complaint.createdAt,
            userName: complaint.userId?.name || 'Anonymous',
            userEmail: complaint.userId?.email || 'No email'
        }));
        
        // Simple statistics based on available data
        const stats = {
            totalComplaints,
            assigned: totalComplaints, // All complaints are considered assigned
            inProgress: 0, // No status field, so default to 0
            completed: 0,  // No status field, so default to 0
            pending: totalComplaints  // All complaints are considered pending
        };
        
        // Simple progress metrics
        const progress = {
            daily: { completed: 0, target: 15, percentage: 0 },
            weekly: { completed: 0, target: 75, percentage: 0 },
            monthly: { completed: 0, target: 300, percentage: 0 }
        };
        
        const dashboardData = {
            success: true,
            data: {
                stats,
                progress,
                activeTasks,
                recentComplaints: recentComplaints.map(complaint => ({
                    issueType: complaint.issueType,
                    issueDetails: complaint.issueDetails,
                    createdAt: complaint.createdAt,
                    userName: complaint.userId?.name || 'Anonymous'
                }))
            }
        };
        
        res.status(200).json(dashboardData);
        
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    getDashboardData
};
