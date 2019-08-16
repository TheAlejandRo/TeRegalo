const express = require("express");
const morgan = require("morgan"); //Eliminar módulo antes de la versión final para LucaSafe
const app = express();

const { conn } = require('./DB.js');

//Configuraciones
app.set('port', process.env.PORT || 3000);

//Conectores
app.use(morgan('Rserver'));  //Eliminar dependencia de morgan
app.use(express.json());

//Rutas
app.use('/API/all', require('./Rutas/usuarios.rutas'));

//Inicialización de servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto: ', app.get('port'));
});