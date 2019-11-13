const db = require('../db');
const mysql = require('mysql');
const sha1 = require('sha1');

module.exports = {
    validar: async (nickname,password)=>{
        let query = 'SELECT * FROM usuarios WHERE nickname = ? AND contrasena = ?';
        let parametros = [nickname,sha1(password)];
        let consulta = mysql.format(query,parametros);
        let usuario = await db.query(consulta);
        if(usuario.length === 1){
            if(usuario[0].rol === 2){
                return {
                    validado: true,
                    admin: usuario[0].nickname
                }
            }
            else {
                return {
                    validado: false
                }
            }
        }
        else {
            return {
                validado: false
            }
        }
    },
    
    borrarUsuarios: async ()=>{
        let query = "DELETE FROM usuarios WHERE nickname != 'admin';";
        return await db.query(query);
    },
    vaciarChat: async ()=>{
        let query = 'TRUNCATE TABLE chat;';
        return await db.query(query);
    }
};