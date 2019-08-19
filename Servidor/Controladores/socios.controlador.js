const ControlS = {};
const cadenaConn = process.env.DATABASE_URL || 'postgres://postgres:DevSystem@127.0.0.1:5433/TeRegalo';
const { Client } = require('pg');

ControlS.obtenerSocios = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const consulta = 'SELECT * FROM tbsocios;';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(consulta)
            .then(result => respuesta.status(200).json(result.rows))
            .catch(e => console.error('Error al generar consulta: ',e.stack))
            .then(() => conn.end());
};

ControlS.crearSocio = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const data = {
        socio: peticion.body.socio
    }
    const insert = 'INSERT INTO tbsocios(socio) VALUES($1);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(insert, [data.socio])
            .then(result => respuesta.json(respuesta.status(200).json({success: true, data: 'Socio registrado exitosamente'})))
            .catch(e => {
                    console.error('Error al insertar un nuevo socio: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo registrar el nuevo socio: ',e})
                })
            .then(() => conn.end());
};

ControlS.obtenerSocio= async (peticion, respuesta) => {
        const conn = new Client(cadenaConn);
        const { id } = peticion.params
        const consulta = 'SELECT * FROM tbsocio WHERE idsocio=($1);';

        await conn.connect()
                .then(connect => console.log('Conectado exitosamente a la base de datos'))
                .catch(err => {
                        console.error('Ocurrio un error en la conexion: ', err.stack)
                        respuesta.status(500).json({success: false, data: err})
                    });

        await conn
                .query(consulta,[id])
                .then(result => respuesta.json(result.rows))
                .catch(e => {
                        console.error('Ocurrio un error al buscar el socio: ',e.stack)
                        respuesta.status(500).json({success: false, data: 'No se encontraron socios con esos datos: ',e})
                    })
                .then(() => conn.end());
};

ControlS.actualizarSocio = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const { id } = peticion.params
    const data = {
        socio: peticion.body.socio
    }
    const update = 'UPDATE tbsocios SET socio=($1) WHERE idsocio=($2);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(update, [data.socio])
            .then(result => respuesta.status(200).json({success: true, data: 'Los datos se actualizaron correctamente'}))
            .catch(e => {
                    console.error('Error al actualizar tarjeta ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo actualizar los datos: ',e})
                })
            .then(() => conn.end());
};

ControlS.eliminarSocio = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const { id } = peticion.params
    const consulta = 'DELETE FROM tbsocios WHERE idsocio=($1);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(consulta, [id])
            .then(result => respuesta.status(200).json({ success: true, data: 'El socio fue eliminado correctamente' }))
            .catch(e => {
                    console.error('Error al generar consulta: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo elminar el socio: ',e})
                })
            .then(() => conn.end());
};

module.exports = ControlS;