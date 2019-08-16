const { Client } = require('pg')
const StringConexion = 'pg://postgres:DevSystem@localhost:61544/TeRegalos'

const conexion = new Client({
    host: 'localhost',
    port: 61544,
    user: 'postgres',
    password: 'DevSystem'
})
conexion.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
})
