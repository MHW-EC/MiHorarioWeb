let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let practico = require('../models/practico-schema');


router.route('/').get((req, res, next) => {
    let xforwardedfor = req['headers']['x-forwarded-for']
    console.log("Colección: practico, x-forwarded-for: "+xforwardedfor)
    practico.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});
router.route('/:tid').get((req, res, next) => {
    let xforwardedfor = req['headers']['x-forwarded-for']
    console.log("Colección: practico, x-forwarded-for: "+xforwardedfor)
    practico.find({'teorico_id':req.params.tid}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


module.exports = router;