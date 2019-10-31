const mysql = require('mysql');
const { promisify} =require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: '12345678',
    database: 'upiichat'
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
        console.log('DATABASE CONNECTED'.bgGreen);
});
pool.query = promisify(pool.query);

module.exports = pool;
