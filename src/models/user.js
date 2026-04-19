const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email ID"
        }
    },

    password: {
        type: String,
        required: true ,
        Validator: {
            validator: validator.isStrongPassword,
            message: "Enter Strong password"
        }
    },

    age: {
        type: Number,
        min: 18,
        max: 100
    },

    gender: {
        type: String,
        enum: ["male", "female", "others"],
        lowercase: true
    },

    photoUrl: {
        type: String,
        default: null,
        validate: {
            validator: (value) => !value || validator.isURL(value),
            message: "Invalid photo URL"
        }
    },

    about: {
        type: String,
        default: ""
    },

    skills: {
        type: [String],
        default: []
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);