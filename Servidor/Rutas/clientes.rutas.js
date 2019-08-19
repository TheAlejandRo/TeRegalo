const express = require('express');
const ruta = express.Router();
const clientes = require('../Controladores/clientes.controlador');

ruta.get('/clientes', clientes.obtenerClientes);
ruta.post('/cliente/nuevo', clientes.crearCliente);
ruta.get('/cliente/:cliente', clientes.obtenerCliente);
ruta.put('/cliente/:cliente', clientes.actualizarCliente);
ruta.delete('/cliente/:cliente', clientes.eliminarCliente);

module.exports = ruta;