'use strict'

const express = require('express')
const { engine } = require ('express-handlebars');
const path = require('path')

const app = express();

const PORT = process.env.PORT || 3000

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");



app.get('/', (req, res) => {
    res.render('home');
});




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}....`)
});