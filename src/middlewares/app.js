const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { connectDb } = require("../config/database");
const {validateSignupData} = require("../utils/validator");
const User = require("../models/user");
const app = express();

app.use(express.json());
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
app.get("/user", async (req,res) =>{
    const userEmailId = req.body.emailId;
    try {
        const user = await User.find({emailId:userEmailId});
        if(user.length!=0) { 
            res.send(user);
        } 
        else { 
            res.status(404).send("Application doesnt have Users currently");
        } 
    }
    catch(err) {
        res.status(400).send("Failed to fetch User data");
    }
});

app.get("/feed",async (req,res) => {
    try {
        const users = await User.find({})
        if(users.length===0) {
            res.status(404).send("This application doesnt have any active user currenly");
        }
        else {
            res.send(users);
        }
    }
    catch(err) {
        res.status(400).send("Couldnt able to load feed");
    }  
});

app.delete("/user",async (req,res)=> {
    const userId=req.body.id;
    try {
        await User.findByIdAndDelete(userId);
        res.send("Deleted the user sucessfully");
    }
    catch(err) {
        res.status(400).send("Cannot able to delete the user");
    }
});

app.patch("/user/:userId",async (req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    try { 
        const ALLOWED_UPDATES = [
            "photoUrl",
            "firstName",
            "lastName",
            "skills",
            "age",
            "gender",
            "about" ,
            "userId"
        ];
        const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed) {
            throw new Error("Update Not allowed");
        }
        if(data?.skills.length > 10) {
            throw new Error("skill should be less then 10");
        }
        await User.findByIdAndUpdate({_id:userId},data,
            {
                returnDocument : "after",
                runValidators: true ,
            }
        );
        res.send("user data updated successfully");
    }
    catch(err) {
        res.status(400).send("Update failed"+err);
    }
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

