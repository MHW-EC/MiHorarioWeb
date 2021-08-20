let mongoose = require('mongoose'),
	express = require('express'),
	router = express.Router();

let carrera = require('../models/carrera-schema');

router.route('/').get((req, res, next) => {
	let xforwardedfor = req['headers']['x-forwarded-for']
	console.log("Colección: carrera, x-forwarded-for: "+xforwardedfor)
	carrera.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

module.exports = router;
