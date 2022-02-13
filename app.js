'use strict'


//Setting variables
const express = require("express");
const axios = require('axios');
var exphbs = require('express-handlebars');
const app = express();
const PORT = 3000 //process.env.PORT || 80;

//HBS templating view engine
app.engine('handlebars', exphbs.engine({
    defaultLayout: null
  }));
  app.set('view engine', 'handlebars');
  

//HBS routing
app.get('/', (req, res) => {
    res.render('home');
});

//JSON parsing for http requests
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Base static
app.use('/', express.static('public'));


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}....`)
});