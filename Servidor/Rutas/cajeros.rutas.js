const express = require('express');
const ruta = express.Router();
const cajeros = require('../Controladores/cajeros.controlador');

ruta.get('/cajeros', cajeros.obtenerCajeros);
ruta.post('/cajero/nuevo', cajeros.crearCajero);
ruta.get('/cajero/:id', cajeros.obtenerCajero);
ruta.put('/cajero/:id', cajeros.actualizarCajero);
ruta.delete('/cajero/:id', cajeros.eliminarCajero);

module.exports = ruta;