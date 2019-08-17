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
        tarjeta: peticion.body.ntarjeta,
        titular: peticion.body.titular,
        email: peticion.body.email,
        telefono: peticion.body.telefono,
        fraKey: peticion.body.fraKey,
        monto: peticion.body.monto
    }
    const insert = 'INSERT INTO tbtarjetas(ntarjeta, titular, email, telefono, "fraKey", monto) VALUES($1, $2, $3, $4, $5, $6)';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(insert, [data.tarjeta, data.titular, data.email, data.telefono, data.fraKey, data.monto])
            .then(result => respuesta.json(respuesta.status(200).json({success: true, data: 'Tarjeta registrada exitosamente'})))
            .catch(e => {
                    console.error('Error al insertar nueva tarjeta: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo registrar la tarjeta: ',e})
                })
            .then(() => conn.end());
};

ControlU.obtenerUsuario = async (peticion, respuesta) => {
        const conn = new Client(cadenaConn);
        const { tarjeta } = peticion.params
        const consulta = 'SELECT * FROM tbtarjetas WHERE ntarjeta=($1)';

        await conn.connect()
                .then(connect => console.log('Conectado exitosamente a la base de datos'))
                .catch(err => {
                        console.error('Ocurrio un error en la conexion: ', err.stack)
                        respuesta.status(500).json({success: false, data: err})
                    });

        await conn
                .query(consulta,[tarjeta])
                .then(result => respuesta.json(result.rows))
                .catch(e => {
                        console.error('Ocurrio un error al buscar la tarjeta: ',e.stack)
                        respuesta.status(500).json({success: false, data: 'No se pudo encontrar la tarjeta: ',e})
                    })
                .then(() => conn.end());
};

ControlU.actualizarUsuario = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const { tarjeta } = peticion.params
    const consulta = 'UPDATE ';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(consulta, [tarjeta])
            .then(result => respuesta.json(result.rows))
            .catch(e => {
                    console.error('Error al actualizar tarjeta ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo actualizar los datos de la tarjeta: ',e})
                })
            .then(() => conn.end());
};

ControlU.eliminarUsuario = async (peticion, respuesta) => {
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
            .catch(e => {
                    console.error('Error al generar consulta: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo elminar la tarjeta: ',e})
                })
            .then(() => conn.end());
};

module.exports = ControlU;