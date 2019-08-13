'use strict'

//para acceder a las rutas y crear rutas
var express = require('express');
//cargar el controlador
var ArtistController = require('../controllers/artist');
//hacer las funciones de get, push etc
var api = express.Router();
//cargar el middleware para restringir el acceso a usu no identificados
var md_auth = require('../middlewares/authenticated');
//método de cargar las imágenes
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/artists' });

//crear una ruta de prueba
api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile);

module.exports = api;