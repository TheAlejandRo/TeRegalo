const postgres = require('pg');
const { Schema } = postgres;

const usuariosEsquema = new Schema({
    idusuario: { type: Number, require: true},
    nombreUS: { type: String, require: true},
    apellidoUS: { type: String, require: true},
    dpi: { type: Number, require: true},
    email: { type: String, require: true},
    telefono: { type: Number, require: true},
    palabraKEY: { type: Number, require: true}
})

module.exports = postgres.model('tbusuario', usuariosEsquema);