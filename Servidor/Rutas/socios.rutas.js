const express = require('express');
const ruta = express.Router();
const socios = require('../Controladores/socios.controlador');

ruta.get('/socios', socios.obtenerSocios);
ruta.post('/socio/nuevo', socios.crearSocio);
ruta.get('/socio/:id', socios.obtenerSocio);
ruta.put('/socio/:id', socios.actualizarSocio);
ruta.delete('/socio/:id', socios.eliminarSocio);

module.exports = ruta;