const { Post, Tag, User } = require("../models")
const { compare } = require("../helpers/bcrypt")

class Controller{
    // get
    static add(req, res) {
        const errors = req.session.errors || null
        delete req.session.errors
        res.render('UserRegister', { errors, session: req.session })
    }
    // post
    static fixAdd(req, res) {
        // res.send(req.body)
        const {username, email, password, confirmPassword} = req.body
        if(password != confirmPassword){
            req.session.errors = "Wrong Confirm Password"
            res.redirect("/users/register")
        }else{
            const newUser = {
                username, email, password
            }
            User.create(newUser)
            .then(data => {
                req.session.success = `Selamat Bergabung ${data.username}`
                res.redirect('/users/login')}
            )
            .catch(err => {
                req.session.errors = err.message
                res.send(req.session.errors)
                res.redirect("/users/register")
            })
        }
    }

    static userLogin(req, res){
        const success = req.session.success || null
        delete req.session.success
        const errors = req.session.errors || null
        delete req.session.errors
        res.render('UserLogin', { errors, success, session: req.session })
        // belum render errors
    }

    static postUserLogin(req, res){
        // res.send(req.body)
        const {email, password} = req.body
        User.findOne({
            where:{
                email: email
            }
        })
        .then(user =>{
            if(user){
                if(compare (password, user.password)){
                    console.log("LOGIN SUKSES");
                    req.session.isLogin = true
                    if(user.isAdmin){
                        req.session.isAdmin = true
                    }
                    res.redirect('/posts')
                }
                else{
                    req.session.errors = "Wrong password"
                    res.redirect("/users/login")
                }
            }else{
                req.session.errors = "Email tidak ditemukan"
                res.redirect("/users/login")
            }
        })
        .catch(err => {
            req.session.errors = err.message
            res.redirect("/users/login")
        })
        
    }

    static logout(req, res){
        delete req.session
        res.redirect("/")
    }

    // show all users
    static show(req, res) {
        User.findAll()
        .then(dataUsers => {
            res.render('UserShow', {dataUsers, session: req.session})
        })
    }

}

module.exports = Controller