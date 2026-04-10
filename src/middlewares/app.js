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

