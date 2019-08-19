const ControlSu = {};
const cadenaConn = process.env.DATABASE_URL || 'postgres://postgres:DevSystem@127.0.0.1:5433/TeRegalo';
const { Client } = require('pg');

ControlSu.obtenerSucursales = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const consulta = 'SELECT * FROM tbsucursales;';

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

ControlSu.crearSucursal = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const data = {
        idsocio: peticion.body.idsocio,
        sucursal: peticion.body.sucursal,
        encargado: peticion.body.encargado
    }
    const insert = 'INSERT INTO tbsucursales(idsocio, sucursal, encargado) VALUES($1, $2, $3);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(insert, [data.socio, data.sucursal, data.encargado])
            .then(result => respuesta.json(respuesta.status(200).json({success: true, data: 'Socio registrado exitosamente'})))
            .catch(e => {
                    console.error('Error al insertar un nuevo socio: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo registrar el nuevo socio: ',e})
                })
            .then(() => conn.end());
};

ControlSu.obtenerSucursal = async (peticion, respuesta) => {
        const conn = new Client(cadenaConn);
        const { id } = peticion.params
        const consulta = 'SELECT * FROM tbsucursales WHERE idsucursal=($1);';

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
                        console.error('Ocurrio un error al buscar la sucursal: ',e.stack)
                        respuesta.status(500).json({success: false, data: 'No se encontraron sucursales con esos datos: ',e})
                    })
                .then(() => conn.end());
};

ControlSu.actualizarSucursal = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const { id } = peticion.params
    const data = {
        idsocio: peticion.body.idsocio,
        sucursal: peticion.body.sucursal,
        encargado: peticion.body.encargado
    }
    const update = 'UPDATE tbsocios SET idsocio=($1), sucursal=($2), encargado=($3) WHERE idsucursal=($4);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(update, [data.idsocio, data.sucursal, data.encargado, id])
            .then(result => respuesta.status(200).json({success: true, data: 'Los datos se actualizaron correctamente'}))
            .catch(e => {
                    console.error('Error al actualizar tarjeta ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo actualizar los datos: ',e})
                })
            .then(() => conn.end());
};

ControlSu.eliminarSucursal = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const { id } = peticion.params
    const consulta = 'DELETE FROM tbsucursales WHERE idsucursal=($1);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(consulta, [id])
            .then(result => respuesta.status(200).json({ success: true, data: 'La sucursal fue eliminado correctamente' }))
            .catch(e => {
                    console.error('Error al generar consulta: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo elminar la sucursal: ',e})
                })
            .then(() => conn.end());
};

module.exports = ControlSu;