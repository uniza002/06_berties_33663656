// Import express and ejs, along with other modules
var express = require ('express')
var ejs = require('ejs')
const request = require('request')
const path = require('path')
var mysql = require('mysql2')
var session = require('express-session')
const expressSanitizer = require('express-sanitizer');
require('dotenv').config()


// Create the express application object
const app = express()
const port = 8000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Set up public folder (for css and static js)
app.use(express.static(path.join(__dirname, 'public')))

// Create an input sanitizer
app.use(expressSanitizer());

// Define our application-specific data
app.locals.healthAppData = {appName: "Speed Demons"}

// Define the database connection pool from the .env file
const db = mysql.createPool({
    host: process.env.HEALTH_HOST,
    user: process.env.HEALTH_USER,
    password: process.env.HEALTH_PASSWORD,
    database: process.env.HEALTH_DATABASE,
    
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});
global.db = db;

// Create a session
app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

// Load the route handlers
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

// Load the route handlers for /users
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

// Load the route handlers for /routes
const routesRoutes = require('./routes/routes')
app.use('/routes', routesRoutes)

// Load the route handlers for /weather
const weatherRoutes = require('./routes/weather')
app.use('/weather', weatherRoutes)

// Load the route handlers for /scores
const scoresRoutes = require('./routes/scores')
app.use('/scores', scoresRoutes)

// Load the route handlers for /api
const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

// Start the web app, listening on the specified port
app.listen(port, () => console.log(`Web app now listening on port ${port}`))