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
    req.send("This is your Profile")
})
module.exports = app;