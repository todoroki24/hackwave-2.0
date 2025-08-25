const express = require("express")
const path = require('path')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"../Hackwave-Frontend/views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"../Hackwave-Frontend/public")));
app.use(cors({
    origin : "http://localhost:9696",  // '*'
    credentials : true
}));
module.exports = app;