// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request');
require('dotenv').config()

// Set API key
let apiKey = process.env.API_KEY

router.get('/',function(req, res, next){
    res.render('inputweather.ejs')
});

router.get('/now', (req, res, next) => {
    let city = req.query.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) { 
        var weather = JSON.parse(body)
        
        if (weather!==undefined && weather.main!==undefined) {
            const description = weather.weather[0].description;

            var wmsg = weather.name + 
            '<br><br> Temperature: '+ weather.main.temp + '°C '+ 
            '<br> Humidity: ' + weather.main.humidity + '%' +
            '<br> The current weather is ' + description + '.' + 
            '<br><br> Lets get running!';
            
            res.send (wmsg);
        } else {
            res.send ('No data found. Please enter a valid city name and <a href="' + req.baseUrl + '">try again</a>.');
        }
    });
});

module.exports = router;