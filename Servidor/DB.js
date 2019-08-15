const { Pool, Client } = require('pg');
const StringConexion = 'postgresql://postgres:DevSystem@127.0.0.1:61544/TeRegalos';

const client = new Client({
    connectionString:StringConexion
});

client.connect()

client.query('SELECT * FROM tbusuario', (err, res)=>{
    console.log(err, res)
    client.end()
})