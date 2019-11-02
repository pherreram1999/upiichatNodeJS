const mailer = require('nodemailer');
const user = require('../models/user');

module.exports = {
    registro:async (objUser)=>{
        let contenidoHTML = `<h1>Bienvendio a upiichat</h1>
        <p>UPIICHAT te da la mas cordial bienvenida a nuestra comunidad de chat</p>        
        <ul>
           <li><strong>Apodo:</strong>${objUser.nickname}</li> 
           <li><strong>Contraseña: </strong>${objUser.txtPassword}</li>            
        </ul>
        <a href="upiichat.com.mx">Ingresa el chat, da click aqui</a>`;


        let trasnporter = mailer.createTransport({
            host: 'mail.upiichat.com.mx',
            port: 587,
            secure: false,
            auth: {
                user: 'noreply@upiichat.com.mx',
                pass: '$1st3wasH'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        return await trasnporter.sendMail({
            from: 'UPIICHAT <support@upiichat.com.mx>',
            to: 'alonso.pahm@gmail.com',
            subject: 'Bienvenido a upiichat',
            html: contenidoHTML
        }).catch(error => console.log(error));
    },

    recovery: async (email)=>{
        
        let ruta = await user.generaClave(email);
        let styles = 'style="text-decoration: none; background: #0D47A1; border: none; padding: 15px; color:white; font-weight: bold"';
        ruta = 'localhost' + ruta;
        let contenidoHTML = `<h1>UPIICHAT: recuperar contraseña</h1>
        <p>Favor de ingresar da click en el siguiente enlace para poder cambiar tu contraseña</p>        
         <a href="${ruta}" ${styles} >Cambiar contraseña</a>`;


        let trasnporter = mailer.createTransport({
            host: 'mail.upiichat.com.mx',
            port: 587,
            secure: false,
            auth: {
                user: 'support@upiichat.com.mx',
                pass: '$1st3wasH'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        return await trasnporter.sendMail({
            from: 'UPIICHAT <support@upiichat.com.mx>',
            to: email,
            subject: 'UPIICHAT: recuperacion de contraseña',
            html: contenidoHTML
        }).catch(error => console.log(error));
    }


};

