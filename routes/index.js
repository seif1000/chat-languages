var express = require('express');
const {google} =  require('googleapis');
var plus = google.plus('v1');
const mysql = require('../database/datanase');
var router = express.Router();
const  {isAuth, isGoBack} = require('../middelware/helper');
const {createConnection} = require('../Gauth/google');
const {User} = require('../database/User') ;


router.get('/',isGoBack, function(req, res, next) {
  res.render('index', { title: 'Express' ,auth:null });
});


router.get('/home',isAuth,(req, res, next)=>{

  res.render('home',{
    auth:true,
    user:req.session.user.emails ? req.session.user.emails[0].value :req.session.user.email
  })
})

 
router.get('/oauthCallback', async (req, res, next)=>{
  const oauth2Client = createConnection();
  
   const code  = req.query.code;
   var session = req.session;  

    try {
   
      const {tokens} = await oauth2Client.getToken(code);
  
      oauth2Client.setCredentials(tokens);
      session['tokens'] = tokens;
      const response =await plus.people.get({ userId: 'me', auth: oauth2Client});
    
     // const sqlQueryCHeck = ` select googleID from users where googleID = ?;`;
     // const resUser = await mysql.query(sqlQueryCHeck,response.data.id);
     const resUser = await User.find({googleID:response.data.id}) ;
      const user = resUser;
      console.log(response.data)
      if(user){
        req.session.isLogined = true;
        req.session.user = response.data;

    
        return res.redirect('/home');
        
         
      }
     // const sqlInsert = `insert into users (googleID,email,avatar) values (?,?,?);`
     // await  mysql.query(sqlInsert,[response.data.id,response.data.emails[0].value,response.data.image.url]);
      const newUser = new User({googleID:response.data.id,email:response.data.emails[0].value,avatar:response.data.image.url}) ;
      await newUser.save() ;
      session.isLogined = true;
      session.user = response.data ;
      await req.session.save();
     
      return res.redirect('/home');
    
    
      

    } catch (error) {
      console.log(error);
    }

});




module.exports = router;
