const Municipality = require('../../models/muncipality.model/municipality.model');

const registerMunicipality = async (req, res) => {
    console.log(req.body);
    const { email, password, name ,city} = req.body;
    if (!email || !password || !name || !city) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
    if(password.length<6){
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    const existingMunicipality = await Municipality.findOne({ email });
    if (existingMunicipality) {
        console.log("Municipality already exists");
        return res.status(400).json({ error: "Municipality already exists" });
    }
    console.log("ok");
    try {
        const newMunicipality = await Municipality.create({ email, password, name, city });
        res.status(200).json({ message: "Municipality registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to register municipality" });
    }
};

module.exports = {
    registerMunicipality
};
