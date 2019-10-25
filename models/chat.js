const db = require('../db');
const mysql = require('mysql');

module.exports = {
    saveMessage: async (objMensaje)=>{
        let query = 'INSERT INTO chat(mensaje,id_usuario) VALUES(?, ?)';
        let parametros = [
            objMensaje[0].mensaje,
            objMensaje[0].id_usuario
        ];
        let consulta = mysql.format(query,parametros);
        let r =  await db.query(consulta);
    },

    getMessages: async ()=>{
        let query = 'SELECT c.mensaje, u.nickname,c.enviado FROM chat c INNER JOIN usuarios u ON c.id_usuario = u.id_usuario ORDER BY c.enviado DESC  LIMIT 35;';
        let mensajes = await db.query(query);
        mensajes.reverse(); // volteamos lo mensajes, puesto que estan en modo DESCENDENT
        return mensajes;
    }
};