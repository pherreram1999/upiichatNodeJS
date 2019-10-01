const db = require('../db');
const mysql = require('mysql');
const sha1 = require('sha1');

//objeto usuario
module.exports = {
    validar: async ()=>{
        let usuarios = await db.query('SELECT * FROM usuarios');        
        return (usuarios.length === 1) ? true : false;
    },
    
    registrar: async (obj)=>{
        let query = 'INSERT INTO usuarios (email,nombre,paterno,materno,contrasena) VALUES(?,?,?,?,?)';
        let parametros = [
            obj.txtEmail,
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
                console.log(result);
            }
        });
    },
    
    existEmail: async (email)=>{
        let query = 'SELECT * FROM usuarios WHERE email = ?';
        let parametros = [email];
        let consulta = mysql.format(query,parametros)
        let result = await db.query(consulta);
        return (result.length > 0) ? true : false;
    }
    

}