const db = require('../db');
const mysql = require('mysql');

module.exports = {
    saveMessage: async (objMensaje)=>{
        let query = 'INSERT INTO chat(mensaje,id_usuario) VALUES(?, ?)';
        let parametros = [
            objMensaje.mensaje,
            objMensaje.id_usuario
        ];
        let consulta = mysql.format(query,parametros);
        let r =  await db.query(consulta);
        console.log(r);
    },

    getMessages: async ()=>{
        let query = 'SELECT c.mensaje, u.nickname, c.enviado FROM chat c INNER JOIN usuarios u ON c.id_usuario = u.id_usuario;';
        let mensajes = await db.query(query);
        return mensajes;
    }
};