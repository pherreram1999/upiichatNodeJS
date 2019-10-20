const db = require('../db');
const mysql = require('mysql');

module.exports = {
    saveMessage: (objMensaje)=>{
        let query = 'INSERT INTO chat(mensaje,id_usuario) VALUES(?, ?)';
        let parametros = [
            objMensaje.mensaje,
            objMensaje.id_usuario
        ];
        let consulta = mysql.format(query,parametros);
    }
};