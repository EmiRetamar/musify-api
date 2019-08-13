//para poder recibir instrucciones en js
'use strict'

//cargar el modulo de mongodb
var mongoose = require('mongoose');
//cargar modulo app
var app = require('./app');
//configurar un puerto para nuestra API
var port = process.env.PORT || 3977;

/*
Para eliminar el aviso de mongoose que devuelve por la consola donde hemos 
lanzado el npm start, tenemos que añadir la siguiente linea de código :
mongoose.Promise = global.Promise;
*/

//hacer la conexion a mongodb
//hacer una función de callback
mongoose.connect('mongodb://localhost:27017/curso-mean/api', (err, res) => {
    //si hay error salta una exepción
    if (err) {
        throw err;
    } else {
        console.log("La conexión a la base de datos funciona correctamente...");

        //poner el servidor en escucha
        app.listen(port, function() {
            console.log("Servidor del api rest de musica escuchando en http://localhost: " + port);
        })
    }
});