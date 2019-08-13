//crear un método
'use strict'

//importar libreria
var jwt = require('jwt-simple');
//importar libreria para comprobar las fechas del token 
//comprobando la fecha de creción y de expiración
var moment = require('moment');
//para genere el hash secreta
var secret = 'clave_secreta';

//crear el método y exportarlo directamente
exports.createToken = function(user) {
    //cojer todos los datos del usuario logueado y códificarlos
    var payload = {
        //para guardar el id del objeto usuario
        sub: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        //fecha de creación del token
        iat: moment().unix(),
        //fecha de expiración del token
        exp: moment().add(30, 'days').unix
    };

    //devolver el token códificado
    return jwt.encode(payload, secret);
};