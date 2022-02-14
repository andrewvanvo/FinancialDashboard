'use strict'

const express = require('express')
const { engine } = require ('express-handlebars');
const path = require('path')
const { response } = require('express');
const request = require('request')

const app = express();

const PORT = process.env.PORT || 3000

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

//parsing JSON middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//DASH TICKER #1
var ticker1 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=EPNJK585JY2Y1RPW';

function dashticker(asyncCompleted){ //asycnCompleted is the passed callback fnuction apiCall in '/' GET route
    request.get({
        url: ticker1,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          // data is successfully parsed as a JSON object:
          console.log(data);
          return asyncCompleted(data);          //returns the result of the response body into dashTicker function which then returns response body
        }
    });
}

//SEARCH RESULT
//var symbol = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=EPNJK585JY2Y1RPW'; //hardcoded for MVP, make dynamic later
//function searchResult(asyncCompleted){ //asycnCompleted is the passed callback fnuction apiCall in  '/result' POST route
//    request.get({
//        url: symbol,
//        json: true,
//        headers: {'User-Agent': 'request'}
//      }, (err, res, data) => {
//        if (err) {
//          console.log('Error:', err);
//        } else if (res.statusCode !== 200) {
//          console.log('Status:', res.statusCode);
//        } else {
//          // data is successfully parsed as a JSON object:
//          console.log(data);
//          return asyncCompleted(data);          //returns the result of the response body into dashTicker function which then returns response body
//        }
//    });
//}

//ROUTES
app.get('/', (req, res) => {
    dashticker(function(apiCall){ //callback function named apiCall
        res.render('home', {
            dashDisplay: apiCall
        });
    });
});


app.get('/features.html', (req, res) => {
    res.render('features');
});

app.get('/help.html', (req, res) => {
    res.render('help');
});

//search box POST route INCOMPLETE. NEEDS API
app.post('/result.html', (req, res) => {
        const parsed = req.body.symbolSearch                  //parsing symbol input on searchbox
        res.render('result', {
            //searchDisplay: "testing POST",
            searchDisplay: parsed
    });
});



//static files
app.use(express.static(path.join(__dirname, 'public')));





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}....`)
});