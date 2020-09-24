let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let profesor = require('../models/profesor-schema');


router.route('/').get((req, res) => {
    profesor.find({}, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/:profesor/:codigo/:nombreMateria').get((req, res) => {
    profesor.aggregate([
        {
            $match: { 
                $and:[  
                    { "nombre":req.params.profesor },
                    {
                        $or:[
                            {"registros.nombreMateria": req.params.nombreMateria},
                            {"registros.codigo": req.params.codigo}
                        ] 
                    }
                ]
                }
        },
        {$project: {
            registros: {$filter: {
                input: '$registros',
                as: 'registros',
                cond: {
                    $or:[
                        {$eq: ['$$registros.codigo', req.params.codigo]},
                        {$eq: ['$$registros.nombreMateria', req.params.nombreMateria]}
                    ]
                },
                
            }},
            _id:0,
            nombre: 1
        }}
    ]).exec((error, data) => {
        if (error) {
            res.send(error)
        } else {
            if(data.length >= 1){
                res.json(data[0])
            }else{
                res.json({"nombre":req.params.profesor,
                'registros': [{'promedio': 0}]})
            }
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