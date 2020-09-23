const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let practicoSchema = new Schema({
    _id: {
        type: String
    },
    codigo: {
        type: String
    },
    eventos: {
        type: Object
    },
    nombre: {
        type: String
    },
    paralelo: {
        type: Number
    },
    profesor: {
        type: String
    },
    teorico_id: {
        type: String
    }
},{
    collection: 'practico'
})

module.exports = mongoose.model("Practico", practicoSchema);