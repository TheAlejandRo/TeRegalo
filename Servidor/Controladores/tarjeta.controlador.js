const ControlU = {};
const cadenaConn = process.env.DATABASE_URL || 'postgres://postgres:DevSystem@127.0.0.1:5433/TeRegalo';
const { Client } = require('pg');

ControlU.obtenerUsuarios = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const consulta = 'SELECT * FROM tbtarjetas';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(consulta)
            .then(result => respuesta.json(result.rows))
            .catch(e => console.error('Error al generar consulta: ',e.stack))
            .then(() => conn.end());
};

ControlU.crearUsuario = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const data = {
        ntarjeta: peticion.body.ntarjeta,
        titular: peticion.body.titular,
        email: peticion.body.email,
        telefono: peticion.body.telefono,
        key: peticion.body.key
    }
    const insert = 'INSERT INTO tbtarjetas(ntarjeta, titular, email, telefono, key) values($1, $2, $3, $4, $5)';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(insert, [data.ntarjeta, data.titular, data.email, data.telefono, data.key])
            .then(result => respuesta.json(result.rows))
            .catch(e => console.error('Error al generar consulta: ',e.stack))
            .then(() => conn.end());
};

ControlU.obtenerUsuario = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const consulta = 'SELECT * FROM tbtarjetas';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => console.error('Ocurrio un error en la conexion: ', err.stack));

    await conn
            .query(consulta)
            .then(result => respuesta.json(result.rows))
            .catch(e => console.error('Error al generar consulta: ',e.stack))
            .then(() => conn.end());
};

ControlU.editarUsuario = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const consulta = 'SELECT * FROM tbtarjetas';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => console.error('Ocurrio un error en la conexion: ', err.stack));

    await conn
            .query(consulta)
            .then(result => respuesta.json(result.rows))
            .catch(e => console.error('Error al generar consulta: ',e.stack))
            .then(() => conn.end());
};

ControlU.eliminarUsuario = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const consulta = 'SELECT * FROM tbtarjetas';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => console.error('Ocurrio un error en la conexion: ', err.stack));

    await conn
            .query(consulta)
            .then(result => respuesta.json(result.rows))
            .catch(e => console.error('Error al generar consulta: ',e.stack))
            .then(() => conn.end());
};

module.exports = ControlU;