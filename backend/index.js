const express = require('express');
const {sequelize, testDbConnection} = require("./db");
const {data} = require('./dataModel');

const app = express(); //Instantiating express app
app.use(express.json()); //Config to parse json payload requests
require('dotenv').config();  //Access to .env

const port = 5000;

//Test db connection
sequelize.sync().then(console.log('SYNCED'));

const weatherDataController = require('./weatherDataController')

//Defining api route
app.get('/api/weather', weatherDataController.findData);


module.exports = {app};