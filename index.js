//para poder recibir instrucciones en js
'use strict'

//cargar el modulo de mongodb
let mongoose = require('mongoose');
//cargar modulo app
let app = require('./app');
//configurar un puerto para nuestra API
let port = process.env.PORT || 3977;
// Se define el entorno (desarrollo o produccion)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Se configura el url de conexion a la base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev')
    urlDB = 'mongodb://localhost:27017/musify';
else
    urlDB = 'mongodb://admin:javascript11@cluster0-shard-00-00-oqidx.mongodb.net:27017,cluster0-shard-00-01-oqidx.mongodb.net:27017,cluster0-shard-00-02-oqidx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

process.env.MongoDB_URI = urlDB;

/*
Para eliminar el aviso de mongoose que devuelve por la consola donde hemos
lanzado el npm start, tenemos que añadir la siguiente linea de código */
mongoose.Promise = global.Promise;


//hacer la conexion a mongodb
//hacer una función de callback
mongoose.connect(process.env.MongoDB_URI, { useMongoClient: true }, (err, res) => {
    //si hay error salta una exepción
    if (err) {
        throw err;
    } else {
        console.log("La conexión a la base de datos funciona correctamente...");

        //poner el servidor en escucha
        app.listen(port, function() {
            console.log("Servidor del api rest de musica escuchando en http://localhost:" + port);
        })
    }
});
