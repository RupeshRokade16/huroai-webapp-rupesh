require('dotenv').config();
const {Sequelize} = require("sequelize");

//Postgre vars
const dbuser = process.env.PSQL_USER;
const dbpass = process.env.PSQL_PASS;
const dbname = process.env.PSQL_DBNAME;


const sequelize = new Sequelize(dbname,dbuser,dbpass, {
    dialect: 'postgres',
});

const testDbConnection = async() => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established');
        return true;
        
        

    } catch (error){
        console.log('Unable to connect to database', error);
        return false;
        
        
    }
};



//Export the sequelize instance created and testdbconnection
module.exports = {sequelize, testDbConnection};