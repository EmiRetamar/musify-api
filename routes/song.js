'use strict'

//para acceder a las rutas y crear rutas
var express = require('express');
//cargar el controlador
var SongController = require('../controllers/song');
//hacer las funciones de get, push etc
var api = express.Router();
//cargar el middleware para restringir el acceso a usu no identificados
var md_auth = require('../middlewares/authenticated');
//método de cargar las imágenes
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/songs' });

//crear una ruta de prueba
api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.get('/songs/:album?', md_auth.ensureAuth, SongController.getSongs);
api.put('/song/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);
api.post('/upload-file-song/:id', [md_auth.ensureAuth, md_upload], SongController.uploadFile);
api.get('/get-file-song/:songFile', SongController.getSongFile);
api.get('/search-songs/:text', md_auth.ensureAuth, SongController.searchSongs);

module.exports = api;