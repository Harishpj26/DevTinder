const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { connectDb } = require("./config/database");
const {validateSignupData} = require("./utils/validator");
const { userAuth } = require("./middlewares/auth");
const User = require("./models/user");
const app = express();

app.use(express.json());            // middleware to perfrom 
app.use(cookieParser()); 

app.post("/signup",async(req,res)=> {
    try { 
        validateSignupData(req.body);
        const {firstName , lastName , emailId , password }=req.body;
        const passwordHash = await bcrypt.hash(password,10);

        const user = new User( {
            firstName ,
            lastName , 
            emailId , 
            password:passwordHash 
        }
        );
        await user.save();
        res.send("Users created successfully");
    }
    catch(err) {
        res.status(400).send("Error while creating user"+err);
    }   
});

app.post("/login",async(req,res)=>{
    const {emailId,password} = req.body;
    try {
        if(!validator.isEmail(emailId)) {
            throw new Error("Invalid EmailId... Please provide valid Email Id");
        }
        else {
            const user = await User.findOne({emailId : emailId});
            if(!user) {
                throw new Error("Invalid credentials");
            }
            const isValidPassword = await bcrypt.compare(password,user.password);
            if(isValidPassword) {
                //create JWT token 
                const token = await jwt.sign( {_id:user._id} , "HaaHuu@12345");
                //console.log(token);
                // add the tocken into the cookie and send the response to the user
                res.cookie("token",token);
                res.send("Login successfully!!!");
            }
            else {
                throw new Error("Invalid credentials");
            }
        }
    }
    catch(err) {
        res.status(400).send("Error :"+err.message);
    }
});

app.get("/profile", userAuth , async(req,res)=> {
        try {
            const user = req.user;
            console.log("The Logged in User was "+user.firstName);
            res.send(user);
        }
        catch(err) {
            res.status(400).send("Error :"+err.message);
        }
});

app.post("/sendConnectionRequest", userAuth ,async (req,res)=>{
    const user = req.user;
    console.log(user.firstName+" is Sending connection request");
    res.send("connection  request sent");
});


 














connectDb()
    .then(()=>{
        console.log("Database connection established"); 
        app.listen(3000, ()=>{
            console.log("Server stared successfully");
        }
    ); 
    })
    .catch((err)=> {
        console.error("Database connection failed");
    });

