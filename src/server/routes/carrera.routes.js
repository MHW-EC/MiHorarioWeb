let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let carrera = require('../models/carrera-schema');

router.route('/').get((req, res) => {
    //console.log("Consulta todos las carreras")
    carrera.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = router;