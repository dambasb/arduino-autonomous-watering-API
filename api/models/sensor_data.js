var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sensor_data_schema = new Schema({
    temperature: Number,
    air_humidity: Number,
    land_humidity: Number
});

var sensor_data = mongoose.model('sensor_data', sensor_data_schema);

module.exports = sensor_data;