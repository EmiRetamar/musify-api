'use strict'

//para acceder a las rutas y crear rutas
var express = require('express');
//cargar el controlador
var GenderController = require('../controllers/gender');
//hacer las funciones de get, push etc
var api = express.Router();
//cargar el middleware para restringir el acceso a usu no identificados
var md_auth = require('../middlewares/authenticated');

//crear una ruta de prueba
api.get('/genders', md_auth.ensureAuth, GenderController.getGenders);
api.get('/gender/:id', md_auth.ensureAuth, GenderController.getGender);
api.post('/gender', md_auth.ensureAuth, GenderController.saveGender);
api.put('/gender/:id', md_auth.ensureAuth, GenderController.updateGender);
api.delete('/gender/:id', md_auth.ensureAuth, GenderController.deleteGender);

module.exports = api;