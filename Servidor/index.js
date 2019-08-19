const express = require("express");
const morgan = require("morgan"); //Eliminar módulo antes de la versión final para LucaSafe
const cors = require("cors");
const app = express();

const { conn } = require('./DB.js');

//Configuraciones
app.set('port', process.env.PORT || 3000);

//Conectores
app.use(morgan('Rserver'));  //Eliminar dependencia de morgan
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Rutas
app.use(require('./Rutas/tarjetas.rutas'));
app.use(require('./Rutas/transacciones.rutas'));
app.use(require('./Rutas/cajeros.rutas'));
app.use(require('./Rutas/sucursales.rutas'));
app.use(require('./Rutas/socios.rutas'));
app.use(require('./Rutas/clientes.rutas'));

//Inicialización de servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto: ', app.get('port'));
});