const express = require('express');
const ruta = express.Router();
const transacciones = require('../Controladores/transacciones.controlador');

ruta.get('/transacciones', transacciones.obtenerTransacciones);
ruta.post('/transaccion/nueva', transacciones.crearTransaccion);
ruta.get('/transaccion/:id', transacciones.obtenerTransaccion);

module.exports = ruta;