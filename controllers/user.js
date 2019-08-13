'use strict'
/* 
Los errores:
200 - cuando faltan datos, error de servidor, no se ha guardado un dato
400 - no existe un registro en la bd, o un dato en la bd
500 - error de excepción, o de no guardarse bien un dato
*/

//imortamos el modulo de bcrypt para encryptar directamente las contraseñas
var bcrypt = require('bcrypt-nodejs');
//importar el modelo
var User = require('../models/user');
//importar el token
var jwt = require('../services/jwt');
//modulos para extraer la imágen del usu
var fs = require('fs');
var path = require('path');

//creamos un metodo que recibe la petición y la devuelve
function pruebas(req, res) {
    res.status(200).send({
        message: 'Progando una acción del controlador del usuario del api'
    });
}

//guardar nuevos usuarios en la bd
//un nuevo método
function saveUser(req, res) {
    var user = new User();

    //recojer los parametros que llegan por el post
    var params = req.body;

    //ver que llega por los parametros
    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    //encryptar la pass
    if (params.password) {
        //encryptar
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;

            if (user.name != null && user.surname != null && user.email != null) {
                //guardar el usuario
                user.save((err, userStored) => {
                    //si se ha guardado bien sino da un error
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario!' });
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario!' });
                        } else {
                            res.status(200).send({ user: userStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: 'Tienes que rellenar todos los campos!' });
            }
        });
    } else {
        res.status(500).send({ message: 'Introduce la contraseña!' });
    }
} //guardar los datos en la bd

//crear método para el login
function loginUser(req, res) {
    //recojemos los parametros que nos llega por post y convertidos en objeto json
    var params = req.body;

    //recojemos email y password
    var email = params.email;
    var password = params.password;

    //buscamos en mongo el email y lo pasamos a lower case
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        //si existe el error
        if (err) {
            res.status(500).send({ message: 'Error en la petición!' });
        } else { //sino
            //si el usuario no existe
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe!' });
            } else { //sino
                //comprobar la contraseña que llega por post
                bcrypt.compare(password, user.password, function(err, check) {
                    //si el check es correcto
                    if (check) {
                        //devolver los datos del usuario logueado
                        if (params.gethash) {
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else { //sino
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no se ha podido loguear!' });
                    }
                });
            }
        }
    });
}

//método de actualizar un usuario
function updateUser(req, res) {
    //recojemos el id del usuario de la url
    var userId = req.params.id;
    //conseguimos el body de la petición que llega por post
    var update = req.body;

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tienes permiso para actualizar este usuario' });
    }

    //este método se encarga de actualizar los datos del usuario
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        //si nos devuelve un error
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario!' });
        } else { //sino
            //si no llega los datos del usuario
            if (!userUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario!' });
            } else { //sino
                res.status(200).send({ user: userUpdated });
            }
        }
    });
}

//método para cargar ficheros
function uploadImage(req, res) {
    //recibimos userId como parámetro de la url
    var userId = req.params.id;
    var file_name = 'Imágen no subida...';

    if (req.files) {
        var file_path = req.files.image.path;
        //recortar el string que llega por path y dejar solo el nombre de la imagen
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        //sacar extención de la imágen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        //console.log(ext_split);

        //comprobar que el fichero tiene la extención correcta
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            //actualizar la imágen que hay el la bd del usu
            User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
                //si no llega los datos del usuario
                if (!userUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario!' });
                } else { //sino
                    res.status(200).send({ image: file_name, user: userUpdated });
                }
            });
        } else {
            res.status(200).send({ message: 'Extenció de archivo no valido' });
        }
    } else {
        res.status(200).send({ message: 'No se ha subida ningúna imágen' });
    }
}

//método para extraer la imágen del usuario
function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;

    fs.exists(path_file, function(exists) {
        //si la imágen existe
        if (exists) {
            //respuesta que manda un fichero
            res.sendFile(path.resolve(path_file));
        } else { //sino
            res.status(200).send({ message: 'No existe la imágen' });
        }
    });
}

//para poder utilizar estos metodos fuera del fichero lo exportamos
module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};