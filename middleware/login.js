function checkLogin(req, res, next){
  if(req.session.isLogin){
    next()
  }else{
    req.session.errors = "You dont have the right access"
    res.redirect("/users/login")
  }
}

function pageLogin(req, res, next){
  if(req.session.isLogin){
    res.redirect("/posts")
  }else{
    next()
  }
}

module.exports = {checkLogin, pageLogin}