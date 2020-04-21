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
    practico.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/:id').get((req, res) => {
    practico.find({_id:req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


module.exports = router;