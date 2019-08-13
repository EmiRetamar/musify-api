'use strict'

//cargamos modul express
var express = require('express');
//cargamos el fichero user controler
var UserController = require('../controllers/user');

//vamos a cargar el router de express
var api = express.Router();
//cargar modulo de autenticación
var md_auth = require('../middlewares/authenticated');

//libreria para cargar ficheros
var multipart = require('connect-multiparty');
//crear un middleware para cargar ficheros
var md_upload = multipart({ uploadDir: './uploads/users' });

//crear una ruta
api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

//exportar api para que todas la rutas funcione
module.exports = api;