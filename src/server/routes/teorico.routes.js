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
                as: "profesorJoined"
            }
        },
        {
            $unwind: { path: "$profesorJoined", preserveNullAndEmptyArrays: true }
        },
        {
            $lookup:
            {
                from: "paraleloProfesor",
                let: { nombre: "$nombre", codigo: "$codigo", profesor: "$profesorJoined._id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$$profesor", "$idProfesor"] },
                                        {
                                            $or: [
                                                { $eq: ["$$nombre", "$nombreMateria"] },
                                                { $eq: ["$$codigo", "$codigoMateria"] },
                                            ]
                                        }
                                    ]
                            }
                        }
                    },
                    { $sort: { 'año': -1 } },
                    { $limit: 1 }
                ],
                as: "lastParaleloProfesorJoined"
            }
        },
        {
            $unwind: { path: "$lastParaleloProfesorJoined", preserveNullAndEmptyArrays: true }
        },
        {
            $addFields: {
                score: {
                    $let: {
                        vars: {
                            //obj1: "$lastParaleloProfesorJoined",
                            prom: {
                                $cond: {
                                    if: { $eq: ["$lastParaleloProfesorJoined", undefined] },
                                    then: 0,
                                    else: "$lastParaleloProfesorJoined.promedio"
                                }
                            },
                            sumaPositivo: {
                                $cond: {
                                    if: { $eq: ["$profesorJoined.stats", undefined] },
                                    then: 0,
                                    else: { $add: [
                                        "$profesorJoined.stats.feliz",
                                        "$profesorJoined.stats.confianza",
                                    ]}
                                }
                            },
                            sumaNegativo: {
                                $cond: {
                                    if: { $eq: ["$profesorJoined.stats", undefined] },
                                    then: 0,
                                    else: { $add: [
                                        "$profesorJoined.stats.enojado",
                                        "$profesorJoined.stats.miedo",
                                        "$profesorJoined.stats.triste",
                                    ]}
                                }
                            }
                        },
                        in: {
                            $divide: [
                                {
                                    $multiply:
                                        [   "$$prom",
                                            "$$sumaPositivo"
                                        ]
                                },
                                { $add: [0.01, "$$sumaNegativo"] }
                            ]
                        }
                    }
                }
            }
        },
        { $sort: { 'score': -1 } },
        //{preserveNullAndEmptyArrays: false},

        /* ,*/
    ]).exec((error, data) => {
        if (error) {
            console.log(error)
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;