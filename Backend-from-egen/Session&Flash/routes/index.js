var express = require('express');
var router = express.Router();
// setting mongoose
const userModel = require("./users")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// create
router.get("/create", async function (req, res){
    let userdata = await userModel.create ({
      Username : "akonm",
      Password : "balinha",
      nickname : "bim",
      desc : "kanna kase",
      Categories : [2,30,4,5]
    })
    res.send(userdata)
})

//  find
router.get("/find", async function (req, res){
    // // case insensetive search = using regular expressions = patterns
    // var regex = new RegExp ("K" , 'i');
    // ----------------------------------------------------------------------
    // search using regex terms = ^ $
    // var regex = new RegExp ("^K" , 'i');
    // var regex = new RegExp ("K$" , 'i');
    // var regex = new RegExp ("^akonm$" , 'i');
    // let user = await userModel.find({Username : regex});

    // ----------------------------------------------------------------------
    // // document filter based on array field/label
    // let user = await userModel.find({Categories : { $all : [2,4] }});

    // ----------------------------------------------------------------------
    // // specific date range
    // var date1 = new Date("2023-12-15");
    // var date2 = new Date("2023-12-17");
    // // date2.setHours(23, 59, 59, 999); // add hours of today in range 
    // let user = await userModel.find({ Date_created : { $gte : date1, $lte : date2} });


    // ----------------------------------------------------------------------
    // // for existing field even it they doesn't carry value
    // let user = await userModel.find({ Categories : { $exists : true} });

    // ----------------------------------------------------------------------
    let user = await userModel.find({ Categories : { $exists : true} });
    res.send(user);
})

module.exports = router;
