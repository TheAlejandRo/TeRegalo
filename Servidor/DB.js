const { Client } = require("pg");
const cadenaConn = process.env.DATABASE_URL || 'postgres://postgres:DevSystem@127.0.0.1:5433/TeRegalo';

const conn = new Client(cadenaConn);
 
conn.connect(err => {
    if (err) {
      console.error('Error al conectarse a la base de datos =>', err.stack)
    } else {
      console.log('Conectado a la base de datos')
    }
})

module.exports = conn;