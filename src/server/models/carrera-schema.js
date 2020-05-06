const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let carreraSchema = new Schema(
	{
		_id: {
			type: Object,
		},
		nombre: {
			type: String,
		},
		facultad: {
			type: String,
		},
		materias: {
			type: Array,
		},
	},
	{
		collection: 'carrera',
	}
);

module.exports = mongoose.model('Carrera', carreraSchema);
