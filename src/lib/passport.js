const passport = require("passport")
const strategy = require("passport-local").Strategy;
const pool = require('../database')
const helpers = require("../lib/helpers")
passport.use('local.singup', new strategy({ 
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => { 
    
    const { fullname } = req.body;

    const newUser = { 
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password)
    const result = await pool.query('INSERT INTO users SET ?', [newUser])
    newUser.id = result.insertId;
    return done(null, newUser);
}))

passport.serializeUser((usr, done) => { 
        done(null, user.id);
})

passport.deserializeUser(async (id, done) => { 
   const rows = pool.query('SELECT * FROM users WHERE id = ?', [id])
   done(null, rows[0])
})