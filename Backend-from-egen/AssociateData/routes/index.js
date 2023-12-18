var express = require('express');
var router = express.Router();
const userModel = require("./users")
const postModel = require("./posts")

// creating user 
router.get("/createuser", async function(req, res){
   let createdUser = await userModel.create({
      username: "jsm",
      password: "hello",
      posts:[],
      email: "hello@jsm",
      fullName: "kon hai tu",
   })
   res.send(createdUser)
})

// creating post
router.get("/createpost" , async function(req, res, next){
     let createdPost = await postModel.create({
        postText : "tum kase ho",
        user: "6580443ad40370f6ca99eb19"
     })
     let user = await userModel.findOne({_id : '6580443ad40370f6ca99eb19'});
     user.posts.push(createdPost._id);
     await user.save(); 
     res.send("done");
})

// all posts of user 
// conversion of id into real data using .populate() 
router.get('/allpost', async function(req, res){
  let user = await userModel
  .findOne({_id: '6580443ad40370f6ca99eb19'})
  .populate("posts");
  
  res.send(user)
});


module.exports = router;
