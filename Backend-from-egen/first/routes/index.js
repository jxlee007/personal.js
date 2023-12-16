var express = require('express');
var router = express.Router();
// make model
const userModel = require('./users');
const users = require('./users');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// -----------------------------------------------------------------------------------------
// create
router.get('/create', async function(req, res) {

  const createdUser = await userModel.create({
    username: "me",
    age: 24
  })
  res.send(createdUser);
});

// read
router.get('/read', async function(req, res) {

  let allUsers = await userModel.find();
  res.send(allUsers);

  // for find only one user
  let user = await userModel.findOne({username: "her"});
  console.log(user)
});

// delete
router.get('/delete', async function(req, res) {

  const deletedUser = await userModel.findOneAndDelete({username: "me"})
  res.send(deletedUser);
});

// ----------------------------------------------------------------------------------------
// session = setting
router.get("/check", function (req, res, next) {
    req.session.name = "You are pranked";
    // res.render("check");
    res.send("check /ban")
    // next();
})

// accessing session on another route = checking
router.get("/ban", function (req, res, next) {
    if (req.session.name === "you are pranked") {
      res.send("YOU ARE BANNED");
    } else{
      res.send("YOU ARE REMOVED")
    }
    console.log(req.session);
})

// delete session
router.get("/ban-revoked" , function (req, res) {
  req.session.destroy(function(err){
    // for error handling
    if (err) throw err 
    console.log("ban revoked")
  })
})

// creating cookies
router.get("/cook", function(req, res){
  res.cookie("age",25);
  res.send("your cookie is here")
});

// read 
router.get("/r-cook", function(req, res){
    console.log(req.cookies)
})

// delete
router.get("/d-cook", function (req, res){
  res.clearCookie("age");
  res.send("terminated")
})




module.exports = router;
