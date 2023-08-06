'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Registro = require('../models/registro');

var controller = {

    datos: (req, res) => {
        var hola = req.body.hola;
    
        return res.status(200).send({
            Prueba: 'corriendo',
            Autor: 'Christian Laurian'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de registros'
        });
    },

    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;
    
        try {
            // Validar datos (validator)
            var validate_curp_length = validator.isLength(params.curp, { min: 18, max: 18 });
            var containsOnlyLettersAndNumbers = /^[A-Za-z0-9]+$/;
    
            if (!validate_curp_length || !containsOnlyLettersAndNumbers.test(params.curp)) {
                return res.status(400).send({
                    status: 'error',
                    message: 'La CURP no es válida'
                });
            }
    
            // Validar que la CURP contenga al menos una letra y un número
            if (!/[A-Za-z]/.test(params.curp) || !/[0-9]/.test(params.curp)) {
                return res.status(400).send({
                    status: 'error',
                    message: 'La CURP debe contener al menos una letra y un número'
                });
            }
    
            // Crear el objeto a guardar
            var registro = new Registro();
    
            // Asignar valores
            registro.curp = params.curp;
    
            if (params.image) {
                registro.image = params.image;
            } else {
                registro.image = null;
            }
    
            // Guardar el registro en la base de datos
            registro.save((err, registroStored) => {
                if (err || !registroStored) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar el registro'
                    });
                }
    
                // Devolver una respuesta exitosa
                return res.status(201).send({
                    status: 'success',
                    registro: registroStored
                });
            });
    
        } catch (err) {
            return res.status(400).send({
                status: 'error',
                message: 'Los datos no son correctos'
            });
        }
    },
    
    

    getRegistros: (req, res) => {

        var query = Registro.find({});

        var last = req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }

        // Find
        query.sort('-_id').exec((err, registros) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los registros !!!'
                });
            }

            if(!registros){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay registros para mostrar !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                registros
            });

        });
    },

    getRegistro: (req, res) => {

        // Recoger el id de la url
        var registroId = req.params.id;

        // Comprobar que existe
        if(!registroId || registroId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el registro !!!'
            });
        }

        // Buscar el registro
        Registro.findById(registroId, (err, registro) => {
            
            if(err || !registro){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el registro !!!'
                });
            }

            // Devolverlo en json
            return res.status(200).send({
                status: 'success',
                registro
            });

        });
    },

    update: (req, res) => {
        // Recoger el id del registro por la url
        var registroId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar '
            }); 
        }

        if(validate_title && validate_content){
             // Find and update
             Registro.findOneAndUpdate({_id: registroId}, params, {new:true}, (err, registroUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!registroUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el registro !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    registro: registroUpdated
                });
             });
        }else{
             // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }
       
    },

    delete: (req, res) => {
        // Recoger el id de la url
        var registroId = req.params.id;

        // Find and delete
        Registro.findOneAndDelete({_id: registroId}, (err, registroRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!registroRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el registro, posiblemente no exista !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                registro: registroRemoved
            });

        }); 
    },

    upload: (req, res) => {
        // Configurar el modulo connect multiparty router/registro.js (hecho)

        // Recoger el fichero de la petición
        var file_name = 'Imagen no subida...';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Conseguir nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // * ADVERTENCIA * EN LINUX O MAC
        // var file_split = file_path.split('/');

        // Nombre del archivo
        var file_name = file_split[2];

        // Extensión del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Comprobar la extension, solo imagenes, si es valida borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            
            // borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida !!!'
                });
            });
        
        }else{
             // Si todo es valido, sacando id de la url
             var registroId = req.params.id;

             if(registroId){
                // Buscar el registro, asignarle el nombre de la imagen y actualizarlo
                Registro.findOneAndUpdate({_id: registroId}, {image: file_name}, {new:true}, (err, registroUpdated) => {

                    if(err || !registroUpdated){
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen de registro !!!'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        registro: registroUpdated
                    });
                });
             }else{
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
             }
            
        }   
    }, // end upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/registros/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe !!!'
                });
            }
        });
    },

    search: (req, res) => {
        // Sacar el string a buscar
        var searchString = req.params.search;

        // Find or
        Registro.find({ "$or": [
            { "title": { "$regex": searchString, "$options": "i"}},
            { "content": { "$regex": searchString, "$options": "i"}}
        ]})
        .sort([['date', 'descending']])
        .exec((err, registros) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición !!!'
                });
            }
            
            if(!registros || registros.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay registros que coincidan con tu busqueda !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                registros
            });

        });
    }

};  // end controller

module.exports = controller;