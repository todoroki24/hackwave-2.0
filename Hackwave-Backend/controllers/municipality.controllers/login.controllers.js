const Municipality = require('../../models/muncipality.model/municipality.model');
const bcrypt = require('bcrypt');
const loginMunicipality = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email, password);
    if(!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    console.log("ok - 1");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });     
    }
    console.log("ok - 2");
    try {
        const municipality = await Municipality.findOne({ email });
        if (!municipality) {
            console.log("Municipality not found");
            return res.status(404).json({ error: "Municipality not found" });
        }

        const isMatch = await bcrypt.compare(password, municipality.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = await municipality.generateAccessToken();
        if(token){
            console.log(token);
        }
        res.cookie("token", token, { httpOnly: true ,path: '/'});
        return res.status(200).json({ message: "Login successful", municipality });
    } catch (error) {
        return res.status(500).json({ error: "Failed to login municipality" });
    }
}

module.exports = {
    loginMunicipality
};

