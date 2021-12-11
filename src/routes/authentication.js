const express = require("express")
const app = express.Router()
const passport = require("passport")

app.get("/singup", (req, res) => { 
    res.render('auth/singup')
})

app.post('/singup', passport.authenticate('local.singup', { 
    successRedirect: '/profile',
    failureRedirect: '/singup',
    failureFlash: true
}))

app.get("/profile", (req, res) => { 
    res.send("This is your Profile")
})

app.get("/singin", (req, res) => { 
    res.render('auth/login')
})

app.post("/singin", async (req, res, next) => { 
    passport.authenticate('local.singin', { 
        successRedirect: '/profile',
         failureRedirect: '/singin',
            failureFlash: true
    })(req, res, next);
})

module.exports = app;