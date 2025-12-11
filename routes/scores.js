const express = require("express")
const router = express.Router()

// Input validation
const { check, validationResult } = require('express-validator');

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('../../users/login') // redirect to the login page
    } else { 
        next(); // move to the next middleware function
    } 
}

// Print the current times in a table
router.get('/', function (req, res, next) {
    let sqlquery = "SELECT * FROM scores ORDER BY time ASC"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("scoreboard.ejs", {currentScores:result})
        });
})

router.get('/submit', redirectLogin, function (req, res, next) {
    res.render("submitscore.ejs")
})

router.post('/submitted', 
    [check('routename').isLength({min: 1}), 
    check('time').isLength({ min: 1}),
    check('runnername').isLength({ min: 1})], 
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send('<script>alert("You must fill in all fields."); window.location.href = "' + req.baseUrl + '/submit"; </script>')
        } else { 
            let sqlquery = "INSERT INTO scores (routename, time, runnername) VALUES (?,?,?)"
            let newrecord = [req.body.routename, req.body.time, req.body.runnername]

            // Add the user info to the database and print the result to the page
            db.query(sqlquery, newrecord, (err, result) => {
                if (err) {
                    next(err)
                }
                else
                    result = '<script>alert("Score submitted succesfully."); window.location.href = "' + req.baseUrl + '/"; </script>'
                    res.send(result)
            })
        }
    }
)

// Export the router object so index.js can access it
module.exports = router