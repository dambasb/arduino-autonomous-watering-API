const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const SensorData = require('../models/sensorData');

router.get('/', (req, res, next) => {
    SensorData.find()
        .select('temperature airHumidity landHumidity _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                data: docs.map(doc => {
                    return {
                        _id: doc._id,
                        temperature: doc.temperature,
                        airHumidity: doc.airHumidity,
                        landHumidity: doc.landHumidity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/sensorData/' + doc._id
                        }
                    }
                })

            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post("/", (req, res, next) => {

    const data = new SensorData({
        _id: mongoose.Types.ObjectId(),
        temperature: req.body.temperature,
        airHumidity: req.body.airHumidity,
        landHumidity: req.body.landHumidity
    });
    data
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Data stored",
                data: {
                    _id: result._id,
                    temperature: result.temperature,
                    airHumidity: result.airHumidity,
                    landHumidity: result.landHumidity
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/sensorData/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:dataId', (req, res, next) => {

    SensorData.findById(req.params.dataId)
        .exec()
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    message: 'Data not found!'
                })
            }
            res.status(200).json({
                data: data,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/sensorData/"
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })

});

module.exports = router;