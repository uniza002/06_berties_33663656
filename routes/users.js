// Configuring bcrypt
const bcrypt = require('bcrypt')
const saltRounds = 10

// Create a new router
const express = require("express")
const router = express.Router()

// Input validation
const { check, validationResult } = require('express-validator');

// Redirect logins
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('./login') // redirect to the login page
    } else { 
        next(); // move to the next middleware function
    } 
}

// Redirect if a user attempts to browse to this route directly
router.get('/', function (req, res, next) {
    res.redirect('../')
})

// Print Register page
router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

// Register a user by saving their details to the database
router.post('/registered', 
    [check('email').isEmail(), 
    check('username').isLength({ min: 4, max: 20}), 
    check('password').isLength({ min: 8 }),
    check('first').isLength({ min: 2, max: 50 }),
    check('last').isLength({ min: 2, max: 50 })], 
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('./register')
        } else { 
            const plainPassword = req.body.password

            // Encrypt the password and store the data in the database
            bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
            
            // Store data into variables
            let sqlquery = "INSERT INTO users (username, firstname, lastname, email, hashedPassword) VALUES (?,?,?,?,?)"
            let newrecord = [req.sanitize(req.body.username), req.sanitize(req.body.first), req.sanitize(req.body.last), req.sanitize(req.body.email), hashedPassword]

            // Add the user info to the database and print the result to the page
            db.query(sqlquery, newrecord, (err, result) => {
                if (err) {
                    next(err)
                }
                else
                    result = 'Hello '+ req.sanitize(req.body.first) + ' '+ req.sanitize(req.body.last) +' you are now registered!  We will send an email to you at ' + req.sanitize(req.body.email) + '</p>'
                    res.send(result)
                })
            })
        }
})

// List users page
router.get('/list', redirectLogin, function (req, res, next) {
    let sqlquery = "SELECT username, firstname, lastname, email FROM users;"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("userlist.ejs", {users:result})
        });
})

// Login page
router.get('/login', function (req, res, next) {
    res.render('login.ejs')
})

// Logged in route
router.post('/loggedin', function (req, res, next) {
    let loginuser = req.body.username
    let sqlquery = "SELECT hashedPassword FROM users WHERE username = ?;"

    db.query(sqlquery, [loginuser], (err, result) => {
        if (err) {
            next(err); 
        }
        
        // Inform the user they didn't enter a username
        if (result.length === 0) {
            return res.send('<script>alert("You must enter a username."); window.location.href = "' + req.baseUrl + '/login"; </script>');
        }

        // Grab the hashed password value from the databse
        const hashedPassword = result[0].hashedPassword;
        
        // Compare the hash value of the inputted password to the hashed value stored in the DB and then attempt to log in
        bcrypt.compare(req.body.password, hashedPassword, function(err, result) {
            if (err) {
                next(err)
            } else if (result == true) {
                req.session.userId = req.body.username;
                res.send('Logged in. <a href="../../">Home</a>');
            } else {
                res.send('Incorrect login details. Try again.')
            }
        })
    });
})

// Export the router object so index.js can access it
module.exports = router


  