const express = require("express")
const app = express.Router()
const passport = require("passport")
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth")


app.get("/singup", isNotLoggedIn, (req, res) => { 
    res.render('auth/singup')
})

app.post('/singup', isNotLoggedIn, passport.authenticate('local.singup', { 
    successRedirect: '/profile',
    failureRedirect: '/singup',
    failureFlash: true
}))

app.get("/profile", isLoggedIn, (req, res) => { 
    res.render('profile')
})

app.get("/singin", isNotLoggedIn, (req, res) => { 
    res.render('auth/login')
})

app.post("/singin", isNotLoggedIn, async (req, res, next) => { 
    passport.authenticate('local.singin', { 
        successRedirect: '/profile',
         failureRedirect: '/singin',
            failureFlash: true
    })(req, res, next);
})

app.get("/logout", isLoggedIn, (req, res) => { 
    req.logOut();
    res.redirect("/singin")
})

module.exports = app;