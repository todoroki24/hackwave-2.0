const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    fullName: {
        required : [true, "Fullname is required"],
        type : String,
        trim : true
    },
    email :{
        required : [true,"Email is required"],
        type : String,
        trim : true,
        unique : true,
        lowercase : true,
        validate : {
            validator : validator.isEmail,
            message : "Please enter a valid Email Address"
        }
    },
    phoneNumber : {
        required : [true,"Phone number is required"],
        type : String,
        trim : true,
        unique : true,
        validate : {
            validator : validator.isMobilePhone,
            message : "Please enter a valid Phone Number"
        }
    },
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address",
        required : true
    },
    password : {
        required : true,
        type : String, 
        minlength : 6
    },
    complaints : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Complaint"
    }]
},{timestamps:true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); // hash only if password is changed
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.comparePassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword,this.password);
}
// JWT token bacha hai

userSchema.methods.generateRefreshToken  = function() {
    return jwt.sign(
        {id : this._id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn : "7D"} // long-lived
    )
};

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {_id : this._id , fullName : this.fullName , email : this.email},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn : "30m"}
    )
}

const User = mongoose.model('Author',userSchema);

module.exports = User;

