var express = require('express');
const {google} =  require('googleapis');
var plus = google.plus('v1');
const mysql = require('../database/datanase');
var router = express.Router();
const  {isAuth, isGoBack} = require('../middelware/helper');
const {createConnection} = require('../Gauth/google');
const {User} = require('../database/User') ;


router.get('/',isGoBack, function(req, res, next) {
  res.render('index', { title: 'speaksh' ,auth:null });
});


router.get('/home',isAuth,(req, res, next)=>{

  res.render('home',{
    auth:true,
    user:req.session.user.email
  })
})

 




module.exports = router;
