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
                id_usuario: usuarios[0].id_usuario,
                nickname: usuarios[0].nickname}                
        }
        else{
            return {validado: false}
        }
    },

    registrar: async (obj)=>{
        let query = 'INSERT INTO usuarios (nickname,email,nombre,paterno,materno,contrasena) VALUES(?,?,UC_Words(?),UC_Words(?),UC_Words(?),?)';
        let parametros = [
            obj.nickname.trim(),
            obj.txtEmail.trim(),
            obj.txtNombre.trim(),
            obj.txtPaterno.trim(),
            obj.txtMaterno.trim(),
            await sha1(obj.txtPassword)
        ];
        let consulta = mysql.format(query,parametros);
        db.query(consulta,(err,result,fields)=>{
            if(err){
                console.log(err);
            }
        });
    },
    
    existNickname: async (nickname)=>{
        let query = 'SELECT * FROM usuarios WHERE nickname = ?';
        let parametros = [nickname];
        let consulta = mysql.format(query,parametros);
        let result = await db.query(consulta);
        return (result.length > 0) ? true : false;
    },

    existEmail: async (email)=>{
        let query = 'SELECT * FROM usuarios WHERE email = ?';
        let parametros = [email];
        let consulta = mysql.format(query,parametros);
        let result = await db.query(consulta);
        return (result.length > 0)  ? true : false;
    }

    
    

};
