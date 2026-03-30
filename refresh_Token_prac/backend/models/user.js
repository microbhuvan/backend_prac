//models folder
//user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,

    refreshToken: {
        type: String,
        default: null
    }
})

const User = mongoose.model("User",userSchema);
module.exports = User;