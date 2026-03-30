const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : String,
    emailId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
},
{required : true});

const User = mongoose.model("User", userSchema);
module.exports = User;