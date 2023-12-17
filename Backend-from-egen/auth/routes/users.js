var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/auth");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String
})

// to encrypt-decrypt data using plm
userSchema.plugin(plm);

module.exports= mongoose.model("user", userSchema);
