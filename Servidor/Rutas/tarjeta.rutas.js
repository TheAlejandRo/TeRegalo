const express = require('express');
const ruta = express.Router();
const usuarios = require('../Controladores/tarjeta.controlador');

ruta.get('/tarjeta', usuarios.obtenerUsuarios);
ruta.post('/tarjeta/nueva', usuarios.crearUsuario);
ruta.get('/tarjeta/:id', usuarios.obtenerUsuario);
ruta.put('/tarjeta/:id', usuarios.editarUsuario);
ruta.delete('/tarjeta/:id', usuarios.eliminarUsuario);

module.exports = ruta;