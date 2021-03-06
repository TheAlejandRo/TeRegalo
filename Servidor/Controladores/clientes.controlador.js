const ControlC = {};
const cadenaConn = process.env.DATABASE_URL || 'postgres://postgres:DevSystem@127.0.0.1:5433/TeRegalo';
const { Client } = require('pg');

ControlC.obtenerClientes = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const consulta = 'SELECT * FROM tbclientes;';

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
                respuesta.status(500).json({success: false, data: 'No se pudieron buscar los clientes: ',e})
            })
            .then(() => conn.end());
};

ControlC.crearCliente = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const data = {
        nombres: peticion.body.nombres,
        apellidos: peticion.body.apellidos,
        telefono: peticion.body.telefono,
        edad: peticion.body.edad,
        identificacion: peticion.body.identificacion,
        cliente: peticion.body.cliente
    }
    const insert = 'INSERT INTO tbclientes(nombres, apellidos, telefono, edad, identificacion, cliente) VALUES($1, $2, $3, $4, $5, $6);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(insert, [data.nombres, data.apellidos, data.telefono, data.edad, data.identificacion, data.cliente])
            .then(result => respuesta.json(respuesta.status(200).json({success: true, data: 'Cliente registrado exitosamente'})))
            .catch(e => {
                    console.error('Error al insertar nueva tarjeta: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo registrar el cliente: ',e})
                })
            .then(() => conn.end());
};

ControlC.obtenerCliente = async (peticion, respuesta) => {
        const conn = new Client(cadenaConn);
        const { cliente } = peticion.params
        const consulta = 'SELECT * FROM tbclientes WHERE cliente=($1);';

        await conn.connect()
                .then(connect => console.log('Conectado exitosamente a la base de datos'))
                .catch(err => {
                        console.error('Ocurrio un error en la conexion: ', err.stack)
                        respuesta.status(500).json({success: false, data: err})
                    });

        await conn
                .query(consulta,[cliente])
                .then(result => respuesta.json(result.rows))
                .catch(e => {
                        console.error('Ocurrio un error al buscar el cliente: ',e.stack)
                        respuesta.status(500).json({success: false, data: 'No se pudo encontrar el cliente: ',e})
                    })
                .then(() => conn.end());
};

ControlC.actualizarCliente = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const { cliente } = peticion.params
    const data = {
        nombres: peticion.body.nombres,
        apellidos: peticion.body.apellidos,
        telefono: peticion.body.telefono,
        edad: peticion.body.edad,
        identificacion: peticion.body.identificacion,
    }
    const consulta = 'UPDATE tbcliente SET nombres=($1), apellidos=($2), telefono=($3), edad=($4), identificacion=($5) WHERE cliente=($6);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(consulta, [data.nombres, data.apellidos, data.telefono, data.edad, data.identificacion, cliente])
            .then(result => respuesta.status(200).json({success: true, data: 'Tarjeta actualizada correctamente'}))
            .catch(e => {
                    console.error('Error al actualizar tarjeta ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo actualizar los datos de la tarjeta: ',e})
                })
            .then(() => conn.end());
};

ControlC.eliminarCliente = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const { cliente } = peticion.params
    const consulta = 'DELETE FROM tbcliente WHERE cliente=($1);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
            .query(consulta, [cliente])
            .then(result => respuesta.status(200).json({ success: true, data: 'El cliente fue eliminado correctamente' }))
            .catch(e => {
                    console.error('Error al generar consulta: ',e.stack)
                    respuesta.status(500).json({success: false, data: 'No se pudo elminar:',e})
                })
            .then(() => conn.end());
};

module.exports = ControlC;