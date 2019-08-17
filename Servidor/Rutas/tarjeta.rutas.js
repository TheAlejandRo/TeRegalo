const express = require('express');
const ruta = express.Router();
const usuarios = require('../Controladores/tarjeta.controlador');

ruta.get('/tarjetas', usuarios.obtenerTarjetas);
ruta.post('/tarjeta/nueva', usuarios.crearTarjeta);
ruta.get('/tarjeta/:tarjeta', usuarios.obtenerTarjeta);
ruta.put('/tarjeta/:tarjeta', usuarios.actualizarTarjeta);
ruta.delete('/tarjeta/:tarjeta', usuarios.eliminarTarjeta);

module.exports = ruta;