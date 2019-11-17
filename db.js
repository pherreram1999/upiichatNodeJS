const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
    host: '65.99.252.199',
    user: 'upiichat_admin',
    password: '$1st3wasH',
    database: 'upiichat_node'
});

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST')
            console.error('Conexion perdida');
        if(err.code === 'ER_CON_COUNT_ERROR')
            console.error('DB HAS TO MANY CONNECTION');
        if(err.code === 'ECONNREFUSED')
            console.error('CONEXION RECHAZADA')
    }
    if(connection)
        console.log('DATABASE CONNECTED'.bgGreen.white);
});
pool.query = promisify(pool.query);

module.exports = pool;
