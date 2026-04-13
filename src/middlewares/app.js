const express = require("express");
const { connectDb } = require("../config/database");
const User = require("../models/user");
const app = express();

app.use(express.json());
app.post("/signup",async(req,res)=> {

    const user = new User(req.body);
    try { 
        await user.save();
        res.send("Users created successfully");
    }
    catch(err) {
        res.status(400).send("Error while creating user");
    }   
});

app.get("/user", async (req,res) =>{
    const userEmailId = req.body.emailId;
    try {
        const user = await User.find({emailId:userEmailId});
        if(user.length!=0) { 
            res.send(users);
        } 
        else { 
            res.status(404).send("User not Found");
        } 
    }
    catch(err) {
        res.status(400).send("Failed to load feed");
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

app.patch("/user",async (req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try { 
        await User.findByIdAndUpdate({_id:userId},data);
        res.send("user data updated successfully");
    }
    catch(err) {
        res.status(400).send("Update failed");
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

