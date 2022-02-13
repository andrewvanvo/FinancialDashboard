'use strict'

const express = require("express");
const axios = require('axios');
const app = express();
const PORT = 3000 //process.env.PORT || 80;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', express.static('public'));






app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}....`)
});