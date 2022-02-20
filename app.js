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

//SEARCH RESULT TICKER
//Refactored// var symbol = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=EPNJK585JY2Y1RPW'; //hardcoded for MVP, make dynamic later
function searchResult(asyncCompleted,symbolInputted){ 
    request.get({
        url: 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+ symbolInputted +'&apikey=EPNJK585JY2Y1RPW', //passing inputted symbol from search box
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
//SEARCH RESULT COMPANY DETAILS ///////////IN PROGRESS/////////////
function searchDetail(asyncCompleted,symbolInputted){ 
    request.get({
        url: 'https://www.alphavantage.co/query?function=OVERVIEW&symbol='+ symbolInputted +'&apikey=EPNJK585JY2Y1RPW', //passing inputted symbol from search box
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

//Generate News function
function searchNews(asyncCompleted,symbolInputted){ 
  request.get({
      url: 'https://news-microservice-361.herokuapp.com/news/'+ symbolInputted, //passing inputted symbol from search box
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
///////////////////////////////
//ROUTES
///////////////////////////////
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

//search box POST route 
app.post('/result.html', (req, res) => {
    searchResult(function(apiCall){ //callback function named apiCall
        res.render('result', {
            searchDisplay: apiCall
        });                 //passing parsed symbol into function params for searchResult 
    }, req.body.symbolSearch );
});

//News Microservice integration needed ////////IN PROGRESS//////////
app.get('/news.html', (req, res) => {
 
  searchNews(function(newsApiCall){ //callback function named newsApiCall

      const articletest = newsApiCall.articles[0].title

      console.log(articletest)
      res.render('news', {
          newsDisplay: articletest
      });                 //passing parsed symbol into function params for searchResult 
  }, req.query.newsSearch );
});



//static files
app.use(express.static(path.join(__dirname, 'public')));



//News Microservice base url: https://news-microservice-361.herokuapp.com/
//To get the news use the above base url/news/<your_news_query_search>
//Unlimited API calls (1 call/second rate limit) (edited)

//News Microservice base url: https://news-microservice-361.herokuapp.com/ 
//To get the news use the above base url/news/<your_news_query_search> Unlimited API calls (1 call/second rate limit) (edited)




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}....`)
});