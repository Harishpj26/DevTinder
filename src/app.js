const express = require("express");
const app = express();
app.listen(7777,()=>console.log("Our server has started and running on port 7777")
);
app.use("/getSecretData",(req,res)=>{
    res.send("No secreat data");
})
app.use("/",(req,res)=>{
    res.send("Ready to serve the request");
});

