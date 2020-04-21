const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let teoricoSchema = new Schema({
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
        type: String
    },
    paralelos_practico: {
        type: Array
    },
    profesor: {
        type: String
    }
},{
    collection: 'teorico'
})

let teorico = mongoose.model("Teorico", teoricoSchema);

module.exports = teorico

