let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let teorico = require('../models/teorico-schema');

/*router.route('/create').post((req, res, next) => {
    teorico.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});*/
router.route('/').get((req, res) => {
    teorico.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


router.route('/:codigo').get((req, res) => {
    //console.log("consulta teorico con codigo: ",req.params.codigo )
    teorico.find({codigo:req.params.codigo}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;