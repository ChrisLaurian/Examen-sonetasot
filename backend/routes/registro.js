'use strict'

var express = require('express');
var RegistroController = require('../controllers/registro');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/registros'});

// Rutas de prueba
//router.post('/datos', RegistroController.datosCurso);
router.get('/test-de-controlador', RegistroController.test);

// Rutas útiles
router.post('/save', RegistroController.save);
router.get('/registros/:last?', RegistroController.getRegistros);
router.get('/registro/:id', RegistroController.getRegistro);
router.put('/registro/:id', RegistroController.update);
router.delete('/registro/:id', RegistroController.delete);
router.post('/upload-image/:id?', md_upload, RegistroController.upload);
router.get('/get-image/:image', RegistroController.getImage);
router.get('/search/:search', RegistroController.search);

module.exports = router;