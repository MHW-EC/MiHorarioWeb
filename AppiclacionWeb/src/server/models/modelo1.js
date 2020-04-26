const mongoose = require('mongoose');
const { Schema } = mongoose;

//Aqui definimos el modelo de la coleccion en la db
const TaskSchema = new Schema({
	atributo1: { type: String, required: true },
	atributo2: { type: Number, required: true },
});

module.exports = mongoose.model('Nombre de la Coleccion', TaskSchema);
