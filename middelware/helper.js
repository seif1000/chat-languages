exports.isAuth = (req, res, next)=>{
    if(!req.session.isLogined){
        return res.redirect('/users/login')
    }
    next();
   
}

exports.isGoBack = (req, res, next)=>{
    if(!req.session.isLogined){
      return next();
    }
    res.redirect('/home')
   
}