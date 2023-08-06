const express = require('express');
const mongoose = require('mongoose');

const app = require('./app');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api_rest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
