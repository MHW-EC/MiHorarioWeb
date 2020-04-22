let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let practico = require('../models/practico-schema');

/*router.route('/create').post((req, res, next) => {
    practico.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});*/

router.route('/').get((req, res) => {
    console.log("Consulta todos los practicos")
    practico.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/:id').get((req, res) => {
    console.log("Consulta practico con id: ",req.params.id)
    practico.find({_id:req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data)
        }
    })
})


module.exports = router;