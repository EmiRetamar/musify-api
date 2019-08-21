'use strict'

let Gender = require('../models/gender');


function getGender(req, res) {
    let genderId = req.params.id;

    Gender.findById(genderId, (err, gender) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!gender) {
                res.status(404).send({ message: 'El genero musical no existe' });
            } else {
                res.status(200).send({ gender });
            }
        }
    });
}

function getGenders(req, res) {

    Gender.find({}, (err, genders) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!genders) {
                res.status(404).send({ message: 'No hay generos musicales' });
            } else {
                res.status(200).send({ genders });
            }
        }
    });

}

function saveGender(req, res) {
    let gender = new Gender();

    let params = req.body;
    gender.name = params.name;

    gender.save((err, genderStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!genderStored) {
                res.status(404).send({ message: 'No se ha guardado el genero musical' });
            } else {
                res.status(200).send({ gender: genderStored });
            }
        }
    });
}

function updateGender(req, res) {
    let genderId = req.params.id;
    let update = req.body;

    Gender.findByIdAndUpdate(genderId, update, (err, genderUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el genero musical' });
        } else {
            if (!genderUpdate) {
                res.status(404).send({ message: 'Genero musical no actualizado correctamente' });
            } else {
                res.status(200).send({ gender: genderUpdate });
            }
        }
    });
}

function deleteGender(req, res) {
    let genderId = req.params.id;

    Gender.findByIdAndRemove(genderId, (err, genderRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el genero musical' });
        } else {
            if (!genderRemoved) {
                res.status(404).send({ message: 'El genero musical no ha sido eliminado' });
            } else {
                res.status(200).send({ gender: genderRemoved });
            }
        }
    });
}


module.exports = {
    getGender,
    getGenders,
    saveGender,
    updateGender,
    deleteGender
};