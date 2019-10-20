const db = require('../db');
const mysql = require('mysql');
const sha1 = require('sha1');

//objeto usuario
module.exports = {
    validar: async (obj)=>{
        let query = 'SELECT * FROM usuarios WHERE nickname = ? AND contrasena = ?';
        let parametros = [
            obj.nickname,            
            sha1(obj.txtPassword)
        ];
        let consulta = mysql.format(query,parametros);
        let usuarios = await db.query(consulta);        
        if(usuarios.length === 1){
            return { validado: true, 
                id: usuarios[0].id_usuario,
                nickname: usuarios[0].nickname}                
        }
        else{
            return {validado: false}
        }
    },

    registrar: async (obj)=>{
        let query = 'INSERT INTO usuarios (nickname,nombre,paterno,materno,contrasena) VALUES(?,UC_Words(?),UC_Words(?),UC_Words(?),?)';
        let parametros = [
            obj.nickname,
            obj.txtNombre,
            obj.txtPaterno,
            obj.txtMaterno,
            sha1(obj.txtPassword)
        ];
        let consulta = mysql.format(query,parametros);
        await db.query(consulta,(err,result,fields)=>{
            if(err){
                console.log(err);
            }
            else{
                //console.log(result);
            }
        });
    },
    
    existNickname: async (nickname)=>{
        let query = 'SELECT * FROM usuarios WHERE nickname = ?';
        let parametros = [nickname];
        let consulta = mysql.format(query,parametros);
        let result = await db.query(consulta);
        return (result.length > 0) ? true : false;
    }
    

};