var sensor_data = require('../models/sensor_data_model');
var body_parser = require('body-parser');

module.exports = function (app) {

    app.use(body_parser.json());
    app.use(body_parser.urlencoded({ extended: true }));


    app.get('/api/sensorData', function (req, res) {
        sensor_data.find({}, function (err, data) {
            if (err) throw err;

            res.send(data);
        });
    });

    app.get('/api/sensorData/:id', function (req, res) {

        sensor_data.findById({ _id: req.params.id }, function (err, data) {
            if (err) throw err;

            res.send(data);
        });

    });

    app.post('/api/sensorData', function (req, res) {
        
        if (req.body.id) {
            sensor_data.findByIdAndUpdate(req.body.id, {
                temperature: req.body.temperature,
                air_humidity: req.body.air_humidity,
                land_humidity: req.body.land_humidity 
            }, function (err, data) {
                if (err) throw err;
                res.send(data);
            });
        }

        else {

            var new_sensor_data = sensor_data({
                temperature: req.body.temperature,
                air_humidity: req.body.air_humidity,
                land_humidity: req.body.land_humidity 
            });
            new_sensor_data.save(function (err) {
                if (err) throw err;
                res.send(req.body);
            });

        }

    });

}