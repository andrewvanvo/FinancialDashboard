'use strict'

const express = require('express')
const { engine } = require ('express-handlebars');
const path = require('path')

const app = express();

const PORT = process.env.PORT || 3000

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/features.html', (req, res) => {
    res.render('features');
});

app.get('/help.html', (req, res) => {
    res.render('help');
});

//static files
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.json());
//app.use(express.urlencoded({
//    extended: true
//}));
//
//

//
//
//

//



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}....`)
});