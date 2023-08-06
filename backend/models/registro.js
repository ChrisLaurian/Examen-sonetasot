'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistroSchema = Schema({
    id: Number,  // Estos campos no se manejarán por defecto
    nombre:{ type: String, default: 'MARTHA ALICIA CARMONA  SOLIS'}, 
    curp: {
        type: String,
        required: true, // La CURP es obligatoria
        unique: true,   // La CURP debe ser única
    },
    modulo: { type: String, default: 'Auditorio Benito Juarez' },  // Valor por defecto para el módulo
    direccion: { type: String, default: 'Av. Mariano Barcenas s/n Col. Auditorio, 45910 Zapopan, Jalisco' },  // Valor por defecto para la dirección
    fecha: { type: String, default: 'Lunes 11 de Octubre' },  // Valor por defecto para la fecha (fecha actual)
    hora: { type: String, default: '7:30 am' }  // Valor por defecto para la hora (hora actual)
});

module.exports = mongoose.model('Registro', RegistroSchema);
// registros --> guarda documentos de este tipo y con estructura dentro de la colección
