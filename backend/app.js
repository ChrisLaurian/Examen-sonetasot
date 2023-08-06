const express = require('express');
const bodyParser = require('body-parser');

var validator = require('validator');
var Registro = require('../backend/models/registro');

//Ejecuta express (http)
var app = express();

//carga ficheros rutas

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS

//Añadir prefijos a rutas
app.post('/save', async (req, res) => {
    // Recoger parametros
    var params = req.body;
  
    // Validar datos
    try {
      var validate_curp_length = validator.isLength(params.curp, { min: 18, max: 18 });
      var containsLettersAndNumbers = /^[A-Za-z]+$/;
      var containsOnlyNumbers = /^[0-9]+$/;
  
      if (!validate_curp_length) {
        return res.status(400).send({
          message: 'La longitud de la CURP no es válida'
        });
      }
  
      if (containsLettersAndNumbers.test(params.curp) || containsOnlyNumbers.test(params.curp)) {
        return res.status(400).send({
          message: 'La CURP debe contener letras y números'
        });
      }
  
      // Crear objeto
      var registro = new Registro();
      // Asignar valores
      registro.curp = params.curp;
  
      // Guardar el registro 
      try {
        const registroStored = await registro.save();
        
        return res.status(201).send({
          status: 'success',
          message: 'Curp Correcta, registro guardado exitosamente',
          registro: registroStored
        });
      } catch (error) {
        return res.status(500).send({
          status: 'error',
          message: 'El registro no fue guardado'
          
        });
      }
    } catch (error) {
      return res.status(400).send({
        message: 'Error en los datos de la CURP'
      });
    }
  });

app.get('/registros', async (req, res) => {
    try {
      const registros = await Registro.find({}).exec();
  
      return res.status(200).send({
        status: 'success',
        registros
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: 'Error al obtener los registros'
      });
    }
  });

//Ruta de prueba
app.get('/test', (req, res) =>{

    return res.status(200).send({
        Prueba: 'corriendo',
        Autor: 'Christian Laurian'
    });
});

//Exportar modulo 
module.exports = app;