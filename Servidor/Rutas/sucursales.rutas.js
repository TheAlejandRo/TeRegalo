const express = require('express');
const ruta = express.Router();
const sucursales = require('../Controladores/sucursales.controlador');

ruta.get('/sucursales', sucursales.obtenerSucursales);
ruta.post('/sucursal/nueva', sucursales.crearSucursal);
ruta.get('/sucursal/:id', sucursales.obtenerSucursal);
ruta.put('/sucursal/:id', sucursales.actualizarSucursal);
ruta.delete('/sucursal/:id', sucursales.eliminarSucursal);

module.exports = ruta;