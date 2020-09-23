const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let teoricoSchema = new Schema({
    _id: {
        type: String
    },
    nombre: {
        type: String
    },
    registros: {
        type: Array,
        default: [{anio: String, codigo: String, nombreMateria: String, termino: String, promedio: Number}]
    },
},{
    collection: 'profesor'
})

let profesor = mongoose.model("Profesor", teoricoSchema);

module.exports = profesor

