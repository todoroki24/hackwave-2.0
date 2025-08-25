const User = require('../../models/users.model');
const bcrypt = require('bcrypt');
const {uploadOnCloudinary} = require('../../utils/cloudinary');
const registerUser = async function (req,res){
    // Data Validation
    try{
        console.log(req.body);
        const{fullName,email,password,phoneNumber,address} = req.body;
        if(!fullName || !email || !password || !phoneNumber || !address)
        {
            return res.status(400).json({error : "All fields are required"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        const phoneRegex = /^\d{10}$/;

        if(!nameRegex.test(fullName)){
            return res.status(400).json({error : "Name can only contain letters and spaces."});
        }
        if(!emailRegex.test(email))
        {
            return res.status(400).json({error : "Invalid email address"});
        }
        if(!phoneRegex.test(phoneNumber)){
            return res.status(400).json({error : "Phone number must be 10 digits"});
        }
        if(!address){
            return res.status(400).json({error : "Address is required"});
        }
        if(password.length<6){
            return res.status(400).json({error : "Password must be at least 6 characters long"});
        }
        // Checking for duplicate user
        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            console.log("User Already exists");
            return res.status(400).json({error : "User Already Exists"});
        }
        const newUser = new User({
            fullName,
            email,
            password,
            phoneNumber,
            address
        });

        await newUser.save();

        console.log("Registered Successfully",newUser);
        return res.status(200).json({message:"Registered successfully"})
        //return res.redirect('/author/dashboard'                                                                                                                                                                                                                                     );
        //res.status(201).json({message:"User Registered Successfully"});
        
    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
}

module.exports = {registerUser};