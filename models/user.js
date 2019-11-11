const db = require('../db');
const mysql = require('mysql');
const sha1 = require('sha1');
const generateClv = require('password-generator');
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
            return {
                validado: true,
                nickname: usuarios[0].nickname,
                id_usuario: usuarios[0].id_usuario,
                estatus: usuarios[0].estatus
            }
       }
       else {
           return {
               validado: false,
           }
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
        return (result.length > 0);
    },

    existEmail: async (email)=>{
        let query = 'SELECT * FROM usuarios WHERE email = ?';
        let parametros = [email];
        let consulta = mysql.format(query,parametros);
        let result = await db.query(consulta);
        return (result.length > 0);
    },

    generaClave: async (email)=>{
        let query = 'SELECT id_usuario,nickname FROM usuarios WHERE email = ?';
        let parametros = [email];
        let consulta = mysql.format(query,parametros);
        let result = await db.query(consulta);
        let id = result[0].id_usuario;
        let nickname = result[0].nickname;
        let clave = id + nickname;
        clave = sha1(clave);
        return '/' + id + '/' + nickname + '/' + clave;
    },

    updatePass: async (password,nickname)=>{
        let query = 'UPDATE usuarios SET contrasena = ? WHERE nickname = ?';
        let parametros = [sha1(password),nickname];
        let consulta = mysql.format(query,parametros);
        return await db.query(consulta);
    },

    urlRegistro: (mail,nickname)=>{
        let partes = mail.split('@');
        let clave = partes[0] + nickname;
        clave = sha1(clave);
        let cadena = `/${nickname}/${partes[0]}/${clave}`;
        return cadena;
    },

    activar: async (nickname)=>{
            let query = 'UPDATE usuarios SET estatus = 1 WHERE nickname = ?'
            let parametros = [nickname];
            let consulta = mysql.format(query,parametros);
            return await db.query(consulta);
    }


};
