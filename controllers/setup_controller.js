var sensor_data = require('../models/sensor_data_model');

module.exports = function (app) {

    app.get('/api/setupSensorData', function (req, res) {

        // seed database
        var starterSensorData = [
            {
                temperature: 25.3,
                air_humidity: 25.3,
                land_humidity: 25.3
            },
            {
                temperature: 25.3,
                air_humidity: 25.3,
                land_humidity: 25.3
            },
            {
                temperature: 25.3,
                air_humidity: 25.3,
                land_humidity: 25.3
            }
        ];
        sensor_data.create(starterSensorData, function (err, results) {
            res.send(results);
        });
    });

}