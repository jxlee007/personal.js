const mongoose = require("mongoose")
// setting connection
mongoose.connect("mongodb://127.0.0.1:27017/flash");

// make schema with document layout
const userSchema = mongoose.Schema({
  Username : String,
  Password : String,
  nickname : String,
  desc : String, 
    // Categories : [] // otherwise
  Categories : {
    type : Array,
    default : []
  },
  Date_created : {
    type : Date,
    default : Date.now
  },
})

module.exports = mongoose.model("user", userSchema)