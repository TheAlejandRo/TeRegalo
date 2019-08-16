const express = require('express');
const ruta = express.Router();
const usuarios = require('../Controladores/usuarios.controlador');

ruta.get('/', usuarios.obtenerUsuarios);

module.exports = ruta;