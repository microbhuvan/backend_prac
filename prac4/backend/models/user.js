//backend/models/user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: null
    }
},
{timeStamps: true});

const User = mongoose.model('User',userSchema);
module.exports = User;