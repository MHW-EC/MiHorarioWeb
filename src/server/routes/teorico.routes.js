let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let teorico = require('../models/teorico-schema');


router.route('/').get((req, res) => {
    let xforwardedfor = req['headers']['x-forwarded-for']
    console.log("Colección: teorico, x-forwarded-for: " + xforwardedfor)
    teorico.find({}, "codigo nombre", (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


router.route('/:codigo').get((req, res) => {
    let xforwardedfor = req['headers']['x-forwarded-for']
    console.log("Colección: teorico, x-forwarded-for: " + xforwardedfor)
    //teorico.find({codigo:req.params.codigo}, null, { sort: 'paralelo'}, (error, data) => {
    teorico.find({ codigo: req.params.codigo }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/:codigo/join').get((req, res) => {
    let xforwardedfor = req['headers']['x-forwarded-for']
    console.log("Colección: teorico, x-forwarded-for: " + xforwardedfor)
    teorico.aggregate([
        {
            $match: { codigo: req.params.codigo }
        },
        {
            $lookup:
            {
                from: "profesor2",
                localField: 'profesor',
                foreignField: 'nombre',
                as: "profesor_info"
            }
        },
        {
            $unwind: { path: "$profesor_info", preserveNullAndEmptyArrays: true }
        },
        {
            $lookup:
            {
                from: "paraleloProfesor",
                let: { nombre: "$nombre", profesor: "$profesor_info._id" },
                pipeline: [
                    { $match:
                        { $expr:
                            { $and:
                                [
                                   { $eq: ["$$profesor", "$idProfesor" ] },
                                   { $eq: ["$$nombre", "$nombreMateria" ] }
                                ]
                            }
                        }
                    }
                    //{ $project: { promedio: 1 } }
                ],
                as: "profesor_info2"
            }
        },
        /* ,*/
    ]).exec((error, data) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;