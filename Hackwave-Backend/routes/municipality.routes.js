const {authmiddleware} = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();
const path = require('path');
const {loginMunicipality} = require("../controllers/municipality.controllers/login.controllers");
const {getDashboardData} = require("../controllers/municipality.controllers/dashboard.controller");

// Render dashboard page
router.get('/dashboard',authmiddleware,(req,res)=>{
    res.render('municipality/municipality-portal');
});

// API endpoint for dashboard data
router.get('/api/dashboard', authmiddleware, getDashboardData);

router.post('/login', loginMunicipality);
router.get('/login',(req,res)=>{
    return res.render('municipality/login');
});
const {registerMunicipality} = require("../controllers/municipality.controllers/register.controller");
router.post('/register', registerMunicipality);
router.get('/register',(req,res)=>{
    return res.render('municipality/register');
});
module.exports = router;
