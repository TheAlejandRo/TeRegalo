const ControlTra = {};
const cadenaConn = process.env.DATABASE_URL || 'postgres://postgres:DevSystem@127.0.0.1:5433/TeRegalo';
const { Client } = require('pg');

ControlTra.obtenerTransacciones = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const consulta = 'SELECT * FROM tbtransacciones;';

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

ControlTra.crearTransaccion = async (peticion, respuesta) => {
    const conn = new Client(cadenaConn);
    const data = {
        idcajero: peticion.body.idcajero,
        ntarjeta: peticion.body.ntarjeta,
        gasto: peticion.body.idT,
        fechaT: peticion.body.fechaT,
        horaT: peticion.body.horaT,
        fraKey: peticion.body.fraKey
    }
    const insert = 'INSERT INTO tbtransacciones(idcajero, ntarjeta, gasto, fechaT, horaT) VALUES($1, $2, $3, $4, $5);';

    await conn.connect()
            .then(connect => console.log('Conectado exitosamente a la base de datos'))
            .catch(err => {
                console.error('Ocurrio un error en la conexion: ', err.stack)
                respuesta.status(500).json({success: false, data: err})
            });

    await conn
        .query('SELECT "fraKey" FROM tbtarjetas WHERE ntarjeta=($1);', [data.ntarjeta])
        .then(res => {
            const clave = res.rows
            if (clave == data.fraKey) {
                conn
                    .query(insert, [data.idcajero, ntarjeta, gasto, fechaT, horaT])
                    .then(result => respuesta.json(respuesta.status(200).json({success: true, data: 'Transacción exitosa'})))
                    .catch(e => {
                            console.error('Error al insertar un nuevo socio: ',e.stack)
                            respuesta.status(500).json({success: false, data: 'No se pudo realizar la transacción: ',e})
                        })
                    .then(() => conn.end());
            } else {
                console.log('Las frases no son iguales');
                respuesta.json(respuesta.status(200).json({success: true, data: 'Transacción exitosa'}));
            }
        })
        .catch(e => {
            console.error('Error al insertar verificar la frase clave: ',e.stack)
            respuesta.status(500).json({success: false, data: 'No se pudo obtener fraKey: ',e})
        })
        .then(() => conn.end());
};

ControlTra.obtenerTransaccion = async (peticion, respuesta) => {
        const conn = new Client(cadenaConn);
        const { id } = peticion.params
        const consulta = 'SELECT * FROM tbsucursales WHERE idTransaccion=($1);';

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
                        console.error('Ocurrio un error al buscar la transacción: ',e.stack)
                        respuesta.status(500).json({success: false, data: 'No se encontraron transacciones con esos datos: ',e})
                    })
                .then(() => conn.end());
};

module.exports = ControlTra;