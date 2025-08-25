const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const municipalitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    services: [{
       type : mongoose.Schema.Types.ObjectId,
       ref: 'Service',
       required: true
    }],
    city : {
        type: String,
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


municipalitySchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {_id : this._id},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn : "15m"} // short-lived
    )
};

municipalitySchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Municipality = mongoose.model('Municipality', municipalitySchema);

module.exports = Municipality;
