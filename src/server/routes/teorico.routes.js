let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let teorico = require('../models/teorico-schema');


router.route('/').get((req, res) => {
    teorico.find({},"codigo nombre",(error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


router.route('/:codigo').get((req, res) => {
    //console.log("consulta teorico con codigo: ",req.params.codigo )
    teorico.find({codigo:req.params.codigo}, null, { sort: 'paralelo'}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;