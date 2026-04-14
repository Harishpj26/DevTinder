const validator = require("validator");
const validateSignupData =(data)=> {
     const {firstName, lastName , emailId , password}=data;
     if(!firstName) {
        throw new Error("Please Enter First Name");
     }
     else if(firstName.length ==0 || firstName.length > 50 ) {
        throw new Error("First Name should contains only 4-50 characters");
     }
     else if(!validator.isEmail(emailId)) {
        throw new Error("Please provide Valid EmailId");
     }
     else if(!validator.isStrongPassword(password)) {
        throw new Error("please provide Strong password");
     }
};

module.exports = {
    validateSignupData
};