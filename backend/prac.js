


const express = require('express');
const app = express();

// config ejs
app.set("view engine","ejs");

// middleware
app.use(function (req, res, next) {
  // console.log();
  next();
})

// config express static (same as middleware)
app.use(express.static('./public'));
// without this css & js path would not work


// render view index page
app.get('/', function (req, res) {
  res.send('Hello World jsm ');
  res.render('index');
});

// passing data using render (superpower)
app.get('/pass-data', function (req, res) {
    res.render('contact', {age : 12})
}) 

app.get("/profile/me", function (req, res){
  res.send("hello JXLEE")
})

// dynamic routing using : & req.params.username
app.get("/profile/:username", function (req, res){
  res.send(`really you ${req.params.username}`)
  console.log(`really you ${req.params.username}`)
})

// practice route
app.get('/prac', function (req, res) {
  //   res.send('Hello World')
      res.render("prac")
  })
  

// 404 page
app.get('/error', function (req, res, next) {
    throw Error("Something went wrong")
}) 


//  error handling
app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.listen(8000)