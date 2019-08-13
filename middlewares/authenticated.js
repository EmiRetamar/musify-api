//crear un método
'use strict'

//importar libreria
var jwt = require('jwt-simple');
//importar libreria para comprobar las fechas del token 
//comprobando la fecha de creción y de expiración
var moment = require('moment');
//para genere el hash secreta
var secret = 'clave_secreta';

//crear método de autenticación
//recibe todos los parámetros de la petición
exports.ensureAuth = function(req, res, next) {
    //recojemos la autorización
    if (!req.headers.authorization) {
        //si no nos viene el headers envia el mensaje de error
        return res.status(403).send({ message: 'La petición no tiene cabecera de autenticación' });
    }

    //si hay cabecera se guarda dentro de la variable token
    //si el token viene con comillas por delante y detras se la quitamos con el método de js replace
    //replace(/['"]+/g, '') y las reemplazomos con nada
    var token = headers.authorization.replace(/['"]+/g, '');

    //decodificar el token
    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado!' });
        }
    } catch (ex) {
        //console.log(ex);
        return res.status(404).send({ message: 'Token no valido!' });
    }

    //añadir a req una propriedad todos los datos del usuario
    req.user = payload;

    //llamamos a la función next para salir del middleware
    next();
};