const express = require("express")
const morgan = require("morgan")
const { engine } = require('express-handlebars');
const path = require("path")
const flash = require("connect-flash")
const session = require("express-session")
const MySQlStore = require("express-mysql-session")
const { database } = require("./keys")
const passport = require("passport")


//Initializations
const app = express()
require("./lib/passport")

//setings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');
//Middlewares
app.use(session({ 
  secret: "Victor",
  resave: false,
  saveUninitialized: false,
  store: new MySQlStore(database)
}))
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())


//Global Variables
app.use((req, res, next) => { 
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
    next();
})

//routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//public

app.use(express.static(path.join(__dirname, 'public')))
//Starting
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})