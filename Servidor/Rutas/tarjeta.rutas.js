const express = require('express');
const ruta = express.Router();
const usuarios = require('../Controladores/tarjeta.controlador');

ruta.get('/tarjetas', usuarios.obtenerUsuarios);
ruta.post('/tarjeta/nueva', usuarios.crearUsuario);
ruta.get('/tarjeta/:tarjeta', usuarios.obtenerUsuario);
ruta.put('/tarjeta/:tarjeta', usuarios.actualizarUsuario);
ruta.delete('/tarjeta/:tarjeta', usuarios.eliminarUsuario);

module.exports = ruta;