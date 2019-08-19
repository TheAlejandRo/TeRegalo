const ControlCaj = {};
const cadenaConn = process.env.DATABASE_URL || 'postgres://postgres:DevSystem@127.0.0.1:5433/TeRegalo';
const { Client } = require('pg');

ControlCaj.obtenerCajeros = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const consulta = 'SELECT * FROM tbcajeros;';

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

ControlCaj.crearCajero = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const data = {
        cajeroUser: peticion.body.cajeroUser,
        nombres: peticion.body.nombres,
        apellidos: peticion.body.apellidos,
        telefono: peticion.body.telefono,
        idsucursal: peticion.body.idsucursal
    }
    const insert = 'INSERT INTO tbcajeros(cajeroUser, nombres, apellidos, telefono, idsucursal) VALUES($1, $2, $3, $4, $5);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(insert, [data.cajeroUser, data.nombres, data.apellidos, data.telefono, data.idsucursal])
            .then(result => respuesta.json(respuesta.status(200).json({success: true, data: 'Datos registrados exitosamente'})))
            .catch(e => {
                    console.error('Error al insertar nueva tarjeta: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo registrar la tarjeta: ',e})
                })
            .then(() => conn.end());
};

ControlCaj.obtenerCajero= async (peticion, respuesta) => {
        const conn = new Client(cadenaConn);
        const { id } = peticion.params
        const consulta = 'SELECT * FROM tbcajeros WHERE idcajero=($1);';

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
                        console.error('Ocurrio un error al buscar los datos: ',e.stack)
                        respuesta.status(500).json({success: false, data: 'No se encontraron datos: ',e})
                    })
                .then(() => conn.end());
};

ControlCaj.actualizarCajero = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const { id } = peticion.params
    const data = {
        cajeroUser: peticion.body.cajeroUser,
        nombres: peticion.body.nombres,
        apellidos: peticion.body.apellidos,
        telefono: peticion.body.telefono,
        idsucursal: peticion.body.idsucursal
    }
    const update = 'UPDATE tbcajeros SET cajeroUser=($1), nombres=($2), apellidos=($3), telefono=($4), idsucursal=($5) WHERE idcajero=($6);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(update, [data.cajeroUser, data.nombres, data.apellidos, data.telefono, data.idsucursal, id])
            .then(result => respuesta.status(200).json({success: true, data: 'Los datos se actualizaron correctamente'}))
            .catch(e => {
                    console.error('Error al actualizar tarjeta ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo actualizar los datos: ',e})
                })
            .then(() => conn.end());
};

ControlCaj.eliminarCajero = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const { id } = peticion.params
    const consulta = 'DELETE FROM tbcajeros WHERE idcajero=($1);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(consulta, [id])
            .then(result => respuesta.status(200).json({ success: true, data: 'El cajero fue eliminado correctamente' }))
            .catch(e => {
                    console.error('Error al generar consulta: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo elminar el cajero: ',e})
                })
            .then(() => conn.end());
};

module.exports = ControlCaj;