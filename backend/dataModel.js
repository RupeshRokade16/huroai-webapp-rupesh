const {sequelize} = require('./db');
const {DataTypes} = require('sequelize')

const weatherData = sequelize.define('User',
    {
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        API_DATA: {
            type: DataTypes.JSON,
            allowNull: false
        },
        date_requested:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue : DataTypes.NOW
        }
    },{
        timestamps: false
    }
)

module.exports = {weatherData}