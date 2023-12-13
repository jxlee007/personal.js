const express = require('express')
const app = express()

// middleware
app.use(function (req, res, next) {
  // console.log();
  next();
})

app.get('/', function (req, res) {
  res.send('Hello World jsm ');
});

app.get("/profile/me", function (req, res){
  res.send("hello JXLEE")
})

// dynamic routing using : & req.params.username
app.get("/profile/:username", function (req, res){
  res.send(`really you ${req.params.username}`)
  console.log(`really you ${req.params.username}`)
})

app.listen(8000)