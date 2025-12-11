// Create a new router
const express = require("express")
const router = express.Router()

// Redirect logins
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
      res.send('You are not logged in.') // Tell the user if they aren't logged in
    } else { 
        next(); // move to the next middleware function
    } 
}

// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

router.get('/routes/addroute', redirectLogin, function(req, res, next){
    res.render('addroute.ejs'); 
});

router.get('/logout', redirectLogin, (req,res) => {
    req.session.destroy(err => {
    if (err) {
        return res.redirect('./')
    }
    res.send('You are now logged out. <a href='+'./'+'>Home</a>');
    })
})

// Export the router object so index.js can access it
module.exports = router