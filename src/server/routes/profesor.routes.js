let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let profesor = require('../models/profesor-schema');


router.route('/').get((req, res) => {
    profesor.find({}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/:nombre/:codigo').get((req, res) => {
    profesor.aggregate([
        // Get just the docs that contain a shapes element where color is 'red'
        {$match: {"nombre":req.params.nombre,
        "registros.codigo": req.params.codigo }},
        {$project: {
            registros: {$filter: {
                input: '$registros',
                as: 'registros',
                cond: {$eq: ['$$registros.codigo',  req.params.codigo]}
            }},
        }}
    ]).exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});
/*
router.route('/:nombre/:codigo').get((req, res) => {
    profesor.find({"nombre":req.params.nombre,
        "registros.codigo": req.params.codigo }
         , {"registros.$": 4}
         , { sort: 'registros.anio'},
          (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
*/
module.exports = router;