'use strict'

var express = require('express');
var RegistroController = require('../controllers/registro');

var router = express.Router();

router.get('/test-controlador', RegistroController.test);

module.exports = router;