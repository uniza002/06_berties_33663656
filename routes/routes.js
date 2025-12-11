// Create a new router
const express = require("express")
const router = express.Router()

router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search_result', function (req, res, next) {
    //searching in the database
    let search = req.query.search_result;
    let sqlquery = "SELECT * FROM routes WHERE name LIKE ?";
    let newrecord = [`%${search}%`];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err){
            next(err);
        }
        res.render("list.ejs", { currentRoutes: result });
        });
});

router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM routes"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("list.ejs", {currentRoutes:result})
        });
});

router.get('/shorterroutes', function(req, res, next) {
    let sqlquery = "SELECT * FROM routes WHERE distance < 5"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("shorterroutes.ejs", {currentRoutes:result})
        });
});

router.post('/routeadded', function (req, res, next) {
    // saving data in database
    let sqlquery = "INSERT INTO routes (name, distance) VALUES (?,?)"
    // execute sql query
    let newrecord = [req.body.name, req.body.distance]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            res.send('This route was added to the database. Name: '+ req.body.name + ' / Distance: '+ req.body.distance + 'mi')
    })
}) 

// Export the router object so index.js can access it
module.exports = router
