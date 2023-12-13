const express = require('express');
const app = express();

// config ejs
app.set("view engine","ejs");

// config express static (same as middleware)
app.use(express.static('./public'));

// render view index page
app.get('/', function (req, res) {
  res.render('index');
});

// passing data using render (superpower)
app.get('/contact', function (req, res) {
    res.render('contact', {age : 12})
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