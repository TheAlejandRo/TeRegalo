const { Client } = require("pg");
const cadenaConn = process.env.DATABASE_URL || 'postgres://postgres:DevSystem@127.0.0.1:5433/TeRegalo';
const conn = new Client(cadenaConn);
 
conn.connect()
  .then(connect => console.log('Conectado exitosamente a la base de datos'))
  .catch(err => console.error('Ocurrio un error en la conexion: ', err.stack));

module.exports = conn;