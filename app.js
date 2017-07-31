let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let mustacheExpress = require('mustache-express')
let path = require('path')
let expressValidator = require('express-validator')
let expressSession = require('express-session')


app.use(expressSession({secret: 'keyboard cat', saveUninitialized: true, resave: false}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(expressValidator({
 customValidators: {
    notPreviouslyGuessed: function(value, previousLetters) {
        let indexOfLetter = previousLetters.indexOf(value)
        return (indexOfLetter === -1) ;
    }
 }
}));

let mRoutes = require('./routes/mainRoutes')
app.use('/', mRoutes)

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static('public'))



app.listen(3000, function(){
  console.log("App running on port 3000")
})