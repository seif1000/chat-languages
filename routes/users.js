var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const mysql = require('../database/datanase');
const {urlGoogle} = require('../Gauth/google');
const {isAuth, isGoBack}  = require('../middelware/helper');
const { addUser, removeUser, getUser, getUsersInRoom } = require('../utils/users');
const {User} = require("../database/User") ;


router.get('/chat',isAuth,(req, res, next)=>{
 
 res.render('chat',{
   auth:true
 })
})
router.get('/login', isGoBack,function(req, res, next) {
   res.render('users/login', {
     titie:"login",
     auth:false,
     googlUrl:urlGoogle()
     
    
   })
});

router.post('/login', async (req, res, next)=>{
  const email = req.body.email;
  let password = req.body.password;
   //const userQuery =  ' select * from users where email = ?;';

   try {
     // const getUser = await  mysql.query(userQuery,email);
     const getUser = await User.findOne({email}) ;
    
     if (!getUser) return res.redirect('/users/login');
       
      const doMatch = await  bcrypt.compare(password, getUser.password);
      if (doMatch){
        req.session.isLogined = true;
        req.session.user = getUser
         return req.session.save(async (err)=>{
             if (err) throw err;  
              res.redirect('/home');
        
         })
      }
     
   } catch (error) {
       console.log(error);
   }
})
router.get('/register' ,isGoBack,(req,res,next)=>{

   res.render('users/rgister',{
     title:'regisetr',
     auth:false,
     googlUrl:urlGoogle()
   })
})

router.post('/register',async (req, res,next)=>{
     const email = req.body.email;
     let password = req.body.password;
  try {
  
    const getUser = await  User.findOne({email}) ;
    console.log(getUser) ;
    if(getUser){
      console.log("user allreday exist");
    } else{
      const hashPassword = await bcrypt.hash(password,12)
      const createdUser = new User({email,password:hashPassword} );
      await createdUser.save() ;
      res.redirect('/users/login')
    }
 

  } catch (error) {
    console.log(error)
  }
     


})






router.post('/logout',isAuth, (req, res, next)=>{
 const email = req.session.user.emails ? req.session.user.emails[0].value :req.session.user.email;
  req.session.destroy((err)=>{
    

    console.log(err);
    res.redirect('/')
  })
})


module.exports = router;
