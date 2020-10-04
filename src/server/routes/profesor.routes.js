let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let profesor = require('../models/profesor-schema');


router.route('/').get((req, res) => {
    let xforwardedfor = req['headers']['x-forwarded-for']
    console.log("Colección: profesor, x-forwarded-for: "+xforwardedfor)
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
            nombre: 1,
            stats: 1
        }}
    ]).exec((error, data) => {
        let xforwardedfor = req['headers']['x-forwarded-for']
        console.log("Colección: profesor, x-forwarded-for: "+xforwardedfor)
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
module.exports = router;