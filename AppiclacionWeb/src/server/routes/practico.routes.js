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
router.route('/:tid').get((req, res) => {
    console.log("consulta practico con tid: ",req.params.tid )
    practico.find({'teorico_id':req.params.tid}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


module.exports = router;