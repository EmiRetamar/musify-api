'use strict'

//cargar librerias express y body-parser
var express = require('express');
var bodyParser = require('body-parser');

//crear el objeto
var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');
var gender_routes = require('./routes/gender');

//configurar bodyParser
//convertir los datos que nos llega por las peticiones http en objeto
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next) => {
    //configurar cabecera
    //para permitir el acceso a nuestra api de todos los dominios
    res.header('Access-Control-Allow-Origin', '*');
    //cabeceras necesarias para AJAX
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    //para salir del flujo y seguir
    next();
});

//rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);
app.use('/api', gender_routes);

//ejemplo de ruta
/*app.get('/pruebas', function(req, res) { //una función de callback
    res.status(200).send({ message: "Bienvenido al curos" });
});*/

//exportamos modulo
module.exports = app;