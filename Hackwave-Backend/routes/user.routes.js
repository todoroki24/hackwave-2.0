const express = require("express");
const router = express.Router();
const path = require('path');
const User = require('../models/users.model');
const {registerUser} = require('../controllers/User.controllers/register.user');
const {loginUser} = require('../controllers/User.controllers/login.user');
const {authmiddleware} = require('../middlewares/auth.middleware');
const {logOut} = require('../controllers/User.controllers/logout.user')
const {reportIssue} =  require('../controllers/User.controllers/reportIssue');
const {storingApiData}= require('../controllers/User.controllers/storingApiData');
const Complaint = require("../models/complaint.model");
const listComplaints = require('../controllers/User.controllers/listComplaints');
// Routes for registration of User
router.get('/register',(req,res)=>{
    res.render('citizen/citizen-register');
})
router.post('/register',registerUser);

// Routes for login of User
router.get('/login',(req,res)=>{
    res.render('citizen/citizen-login');
});
router.post('/login',loginUser);
router.get('/dashboard',authmiddleware,(req,res)=>{
    res.render('citizen/citizen-portal');
});
router.get('/logout',authmiddleware,logOut);
router.post('/classify',authmiddleware,storingApiData);

router.get('/api/services',async (req,res)=>{
    try {
        const services = await Service.find({});
        return res.status(200).json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        return res.status(500).json({ error: "Failed to fetch services" });
    }
});
router.get('/services',authmiddleware,(req,res)=>{
    res.render('citizen/citizen-services');
});

router.get('/api/complaints',authmiddleware,listComplaints);


//router.post('/report-issue/:type', reportIssue);


// Home Route
module.exports = router;