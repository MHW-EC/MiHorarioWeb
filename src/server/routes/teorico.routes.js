let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let teorico = require('../models/teorico-schema');


router.route('/').get((req, res) => {
    let xforwardedfor = req['headers']['x-forwarded-for']
    console.log("Colección: teorico, x-forwarded-for: "+xforwardedfor)
    teorico.find({},"codigo nombre",(error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


router.route('/:codigo').get((req, res) => {
    let xforwardedfor = req['headers']['x-forwarded-for']
    console.log("Colección: teorico, x-forwarded-for: "+xforwardedfor)
    teorico.find({codigo:req.params.codigo}, null, { sort: 'paralelo'}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;