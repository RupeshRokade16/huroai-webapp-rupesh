const {sequelize} = require('./db');
const axios = require('axios');
const {weatherData} = require('./dataModel');

const apiKey = process.env.API_KEY
const lat = process.env.LAT;
const lon = process.env.LONG

const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon${lon}&appid=${apiKey}`;

exports.findData = async(req,res) => {

    console.log('Searching Database', weatherData);
    const existingData = await weatherData.findOne({
        order: [['date_requested', 'DESC']]
    })

    if (!existingData){
        console.log("No data found, db empty")
    } else {
        const currentTime = new Date();

        const timeDifference = currentTime - existingData.date_requested;

        const differenceInMinutes = timeDifference/(1000*60);

        if (differenceInMinutes<=30){
            console.log('Data already in valid timeframe');
            return res.status(201).send(existingData);
        } 
    }

    //api request 
    try{
        const apiResponse = await axios.get(api)
        const weatherDataReceived = apiResponse.data;

        //Update db
        const newWeatherData = await weatherData.create({
            API_DATA: weatherDataReceived,
            date_requested: new Date()
        })

        if (newWeatherData){
            console.log('Sending newly fetched data');
            return res.status(201).send(newWeatherData);
        }
    } catch (err){
        console.log(err);
        }

    
    //return new data
    return res.status(500);
    
}