const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req,res,next) => {
    try {
        // Read the token from the req cookies
        // validate the token
        // Find the user
        const {token} = req.cookies;
        if(!token) {
            throw new Error("Token is not valid");
        }
        const decodedObject = await jwt.verify(token,"HaaHuu@12345");
        const {_id} = decodedObject;
        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User not Found");
        }
        req.user=user;
        next();
    }
    catch(err) {
        res.status(400).send("Error:"+err.message);
    }
}
module.exports = {
    userAuth
};