const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let practicoSchema = new Schema({
    codigo: {
        type: String
    },
    eventos: {
        type: Object
    },
    paralelo: {
        type: String
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