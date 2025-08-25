const User = require('../../models/users.model');
const bcrypt = require('bcrypt');
const loginUser = async function (req,res)
{
    const {email,password} = req.body;
    console.log(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation done
    if(!emailRegex.test(email))
    {
        return res.status(400).json({error : "Invalid email address"});
    }
    if(password.length<6)
    {
        return res.status(400).json({error : "Password is of atlest 6 charcters"});
    }

    // Let's find the user
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser)
        {
            console.log("Did not find the user");
            return res.status(404).json({error : "Did not find the User"});
        }
        else{
            console.log(existingUser?.password);
            const isMatch = await bcrypt.compare(password,existingUser.password);
            if(!isMatch)
            {
                return res.status(400).json({error : "Wrong Password"});
            }
            console.log("User found");
            const token = existingUser.generateAccessToken();
            if(token)
            {
                console.log("Access Token generated ",token);
            }
            res.cookie("token",token,{httpOnly:true,path:"/"});
            console.log("Going to dashboard");
            //res.redirect('/author/dashboard/myBlogs');
            return res.status(200).json({message : "Found the User"});
        }
    }catch(err)
    {
        console.log("Server error",err);
    }
    
}

module.exports  = {loginUser};