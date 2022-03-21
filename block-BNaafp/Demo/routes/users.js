var express = require('express');
var router = express.Router();
var User=require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//login handler
router.post('/login',async(req,res,next)=>{
  var {email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({error:"Email/Password required"});
  }
  try {
    var user=await User.findOne({email})
    if(!user){
      return res.status(400).json({error:"Email not registered"});
    }
    var result=await user.verifyPassword(password);
    //
    if(!result){
      return res.status(400).json({error:"Invalid Password"});
    }
    console.log(result,user);
  } catch (error) {
    next(error);
    
  }
})



module.exports = router;