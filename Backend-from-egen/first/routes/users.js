// require mongoose after install
const mongoose = require("mongoose");

// setup connection
mongoose.connect("mongodb://127.0.0.1:27017/practice")

// make schema
const userSchema = mongoose.Schema({
    username : String,
    age : Number
});

// make model
module.exports = mongoose.model("users", userSchema);