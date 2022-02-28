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

//DASH TICKERS
var ticker1 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=EPNJK585JY2Y1RPW';
var ticker2 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=QQQ&apikey=EPNJK585JY2Y1RPW';
var ticker3 = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DIA&apikey=EPNJK585JY2Y1RPW'
function dashticker1(asyncCompleted){ //asycnCompleted is the passed callback fnuction apiCall in '/' GET route
    request.get({
        url: ticker1,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log(' Ticker 1 Status:', res.statusCode);
        } else {
          // data is successfully parsed as a JSON object:
          console.log(data);
          return asyncCompleted(data);          //returns the result of the response body into dashTicker function which then returns response body
        }
    });
}

function dashticker2(asyncCompleted){ //asycnCompleted is the passed callback fnuction apiCall in '/' GET route
  request.get({
      url: ticker2,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Ticker 2 Status:', res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        console.log(data);
        return asyncCompleted(data);          //returns the result of the response body into dashTicker function which then returns response body
      }
  });
}

function dashticker3(asyncCompleted){ //asycnCompleted is the passed callback fnuction apiCall in '/' GET route
  request.get({
      url: ticker3,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Ticker 3 Status:', res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        console.log(data);
        return asyncCompleted(data);          //returns the result of the response body into dashTicker function which then returns response body
      }
  });
}

//SEARCH RESULT TICKER
function searchResult(asyncCompleted,symbolInputted){ 
    request.get({
        url: 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+ symbolInputted +'&apikey=EPNJK585JY2Y1RPW', //passing inputted symbol from search box
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log(' Search Result Status:', res.statusCode);
        } else {
          // data is successfully parsed as a JSON object:
          console.log(data);
          return asyncCompleted(data);          //returns the result of the response body into dashTicker function which then returns response body
        }
    });
}
//SEARCH RESULT COMPANY DETAILS
function companyDetail(asyncCompleted,symbolInputted){ 
    request.get({
        url: 'https://api.polygon.io/v3/reference/tickers/'+ symbolInputted +'?apiKey=brp6_cBTpfmTWr8W_IjOQ5wairpYpAW4', //passing inputted symbol from search box
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Company Detail Status:', res.statusCode);
        } else {
          // data is successfully parsed as a JSON object:
          console.log(data);
          return asyncCompleted(data);          //returns the result of the response body into dashTicker function which then returns response body
        }
    });
}

//SEARCH RESULT COMPANY FINANCIALS
function companyFinancials(asyncCompleted,symbolInputted){ 
  request.get({
      url: 'https://api.polygon.io/vX/reference/financials?ticker='+ symbolInputted +'&apiKey=brp6_cBTpfmTWr8W_IjOQ5wairpYpAW4', //passing inputted symbol from search box
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Company Financial Status:', res.statusCode);
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
        console.log('News SearchStatus:', res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        console.log(data);
        return asyncCompleted(data);          
      }
  });
}
///////////////////////////////
//ROUTES
///////////////////////////////
app.get('/', (req, res) => {
    
    dashticker1(function(apiCall){ //callback function named apiCall
        let newArray = []
        let oldArray = apiCall['Global Quote']
        let symbol = oldArray['01. symbol']
        let price = oldArray['05. price']
        let change = oldArray['09. change']
        let percent = oldArray ['10. change percent']
        let volume = oldArray['06. volume']
        //newArray.push(symbol, price, change, percent, volume)
        dashticker2(function(apiCall){
          let newArray2 = []
          let oldArray2 = apiCall['Global Quote']
          let symbol2 = oldArray2['01. symbol']
          let price2 = oldArray2['05. price']
          let change2 = oldArray2['09. change']
          let percent2 = oldArray2['10. change percent']
          let volume2 = oldArray2['06. volume']

          dashticker3(function(apiCall){
            let newArray3 = []
            let oldArray3 = apiCall['Global Quote']
            let symbol3 = oldArray3['01. symbol']
            let price3 = oldArray3['05. price']
            let change3 = oldArray3['09. change']
            let percent3 = oldArray3['10. change percent']
            let volume3 = oldArray3['06. volume']

            res.render('home', {
              symbol: symbol,
              price: price,
              change: change,
              percent: percent,
              volume: volume,
              symbol2: symbol2,
              price2: price2,
              change2: change2,
              percent2: percent2,
              volume2: volume2,
              symbol3: symbol3,
              price3: price3,
              change3: change3,
              percent3: percent3,
              volume3: volume3,
            });
          });       
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
      let passedSymbol = req.body.symbolSearch
      let apiSymbol = passedSymbol.toUpperCase()
      searchResult(function(apiCall){ //callback function named apiCall
        let newArray = []
        let oldArray = apiCall['Global Quote']
        let symbol = oldArray['01. symbol']
        let price = oldArray['05. price']
        let change = oldArray['09. change']
        let percent = oldArray ['10. change percent']
        let volume = oldArray['06. volume']
        newArray.push(symbol, price, change, percent, volume)

        companyDetail(function(apiCall){
          let oldArray = apiCall['results']
          let name = oldArray['name']
          let description = oldArray['description']
          //let iconObj = oldArray['branding']
          //let icon = iconObj['icon_url']
          
          companyFinancials(function(apiCall){
            let oldArray = apiCall['results']
            let resultsArray = oldArray[0]
            let finArray = resultsArray['financials']
            let endDate = resultsArray['end_date']
            let incomeObj = finArray['income_statement']
            let balanceObj = finArray['balance_sheet']
            /////individual line items income statement///
            let usDollar = Intl.NumberFormat('en-US')
            let incomeTableDict = {}
        
            for (let key in incomeObj) {
              if (incomeObj.hasOwnProperty(key)) {
                let newKeyObj = incomeObj[key]
                let newKey = newKeyObj['label']
                let newValue = newKeyObj['value']

                incomeTableDict[newKey] = usDollar.format(newValue)
              } 
            }
            //console.log('INCOME TABLE', incomeTableDict)

            //////// individual line items balance sheet//////
            let balanceTableDict ={}

            for (let key in balanceObj) {
              if (balanceObj.hasOwnProperty(key)) {
                let newKeyObj = balanceObj[key]
                let newKey = newKeyObj['label']
                let newValue = newKeyObj['value']

                balanceTableDict[newKey] = usDollar.format(newValue)
              } 
            }
            
            searchNews(function(newsApiCall){ //callback function named newsApiCall
              let articleArray = {}
              let counter = 0
              while (counter < 10){
                let articleTitle = newsApiCall.articles[counter].title
                let articleLink = newsApiCall.articles[counter].link
                articleArray[articleTitle] = articleLink
                counter += 1}

              res.render('result', {
                symbol: symbol,
                price: price,
                change: change,
                percent: percent,
                volume: volume,
                //icon: icon,
                name: name,
                description: description,
                endDate: endDate,
                // line items for income statement//
                incomeTableDict: incomeTableDict,
                balanceTableDict: balanceTableDict,
                newsDisplay: articleArray,
                
                }); 
              
              }, apiSymbol);
            }, apiSymbol);
          }, apiSymbol);
    }, apiSymbol);
});

//News Microservice integration needed ////////IN PROGRESS//////////
//app.get('/news.html', (req, res) => {
//  let companyName = req.query.newsSearch
//  searchNews(function(newsApiCall){ //callback function named newsApiCall
//      let articleArray = {}
//      let counter = 0
//      while (counter < 10){
//        let articleTitle = newsApiCall.articles[counter].title
//        let articleLink = newsApiCall.articles[counter].link
//        articleArray[articleTitle] = articleLink
//        counter += 1
//      }
//      
//      res.render('news', {
//          newsDisplay: articleArray,
//          companyName: companyName
//      });                 //passing parsed symbol into function params for searchResult 
//  }, req.query.newsSearch );
//});


//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}....`)
});