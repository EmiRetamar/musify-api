'use strict'

//cargar modulo de mongoose
var mongoose = require('mongoose');

//definimos una eschema, variable de la base de datos
//que se guarda en forma de objeto de tipo Schema en la bd
var Schema = mongoose.Schema;

//una objeto para el Schema del usuario
var SongSchema = Schema({
    number: String,
    name: String,
    duration: Number,
    file: String,
    //hacer referencia a otro objeto de la bd
    album: { type: Schema.ObjectId, ref: 'Album' }
});

//para poder utilizar este objeto fuera del fichero hay que exportarlo
module.exports = mongoose.model('Song', SongSchema);