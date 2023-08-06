const express = require('express');
const bodyParser = require('body-parser');

//Ejecuta express (http)
var app = express();

//carga ficheros rutas

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS

//Añadir prefijos a rutas

//Ruta de prueba
app.get('/test', (req, res) =>{

    return res.status(200).send({
        Prueba: 'corriendo',
        Autor: 'Christian Laurian'
    });
});

//Exportar modulo 
module.exports = app;