const mongoose = require('mongoose');

const sensorDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    temperature: { 
        type: String,
        required: true
    },
    airHumidity: { 
        type: String,
        required: true
    },
    landHumidity: { 
        type: String,
        required: true
    },
});

module.exports = mongoose.model('SensorData', sensorDataSchema);