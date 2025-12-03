// Create a new router
const express = require("express")
const router = express.Router()

router.get('/',function(req, res, next){
    res.render('inputbook.ejs')
});

router.get('/books', function (req, res, next) {
    let book = req.query.search;
    let minprice = req.query.minprice;
    let maxprice = req.query.maxprice;
    let sort = req.query.sort || "name";

    // SQL query construction
    let sqlquery = "SELECT * FROM books";
    let conditions = [];
    let parameters = [];

    // Search query for book name
    if (book) {
        conditions.push("name LIKE ?");
        parameters.push("%" + book + "%");
    }

    // Search query for minimum price
    if (minprice) {
        conditions.push("price >= ?");
        parameters.push(minprice);
    }

    // Search query for maximum price
    if (maxprice) {
        conditions.push("price <= ?");
        parameters.push(maxprice);
    }

    // Append WHERE to SQL query if any conditions exist
    if (conditions.length > 0) {
        sqlquery += " WHERE " + conditions.join(" AND ");
    }

    // Append the sort type to the SQL query and sort by ascending
    sqlquery += " ORDER BY " + sort + " ASC";
    
    // Execute the sql query
    db.query(sqlquery, parameters, (err, result) => {
        // Return results as a JSON object
        if (err) {
            res.json(err)
            next(err)
        } else {
            res.json(result)
        }
    })
})

module.exports = router;