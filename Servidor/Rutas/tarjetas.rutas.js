const express = require('express');
const ruta = express.Router();
const tarjeta = require('../Controladores/tarjetas.controlador');

ruta.get('/tarjetas', tarjeta.obtenerTarjetas);
ruta.post('/tarjeta/nueva', tarjeta.crearTarjeta);
ruta.get('/tarjeta/:tarjeta', tarjeta.obtenerTarjeta);
ruta.put('/tarjeta/:tarjeta', tarjeta.actualizarTarjeta);
ruta.delete('/tarjeta/:tarjeta', tarjeta.eliminarTarjeta);

module.exports = ruta;