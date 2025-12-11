// Create a new router
const express = require("express")
const router = express.Router()

router.get('/',function(req, res, next){
    res.render('findroute.ejs')
});

router.get('/routes', function (req, res, next) {
    let route = req.query.search;
    let mindist = req.query.mindist;
    let maxdist = req.query.maxdist;
    let sort = req.query.sort || "distance";

    // SQL query construction
    let sqlquery = "SELECT * FROM routes";
    let conditions = [];
    let parameters = [];

    // Search query for book name
    if (route) {
        conditions.push("name LIKE ?");
        parameters.push("%" + route + "%");
    }

    // Search query for minimum price
    if (mindist) {
        conditions.push("distance >= ?");
        parameters.push(mindist);
    }

    // Search query for maximum price
    if (maxdist) {
        conditions.push("distance <= ?");
        parameters.push(maxdist);
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