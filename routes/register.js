const express = require('express');
const router = express.Router();
const user = require('../models/user');
const mail = require('../models/mail');
const fs = require('fs');

router.post('/registrar',async (request,response)=>{
    // comprobamos
    let obj = {
        nicknameExist: await user.existNickname(request.body.nickname.trim()),
        emailExist: await user.existEmail(request.body.txtEmail.trim()),
        estatus: false
    }; // el error esta aqui

    if(!obj.nicknameExist && !obj.emailExist){
        await user.registrar(request.body);
        let html = fs.readFileSync(__dirname +'/../html/registro.html','utf-8');
        let sender = mail.createTransport('noreply@upiichat.com.mx',html);
        await sender.sendMail({
            from: 'UPIICHAT <noreply@upiichat.com.mx',
            to: request.body.txtEmail.trim(),
            subject: 'Registro UPIICHAT',
            html
        })
    }
    response.send(obj);
});


module.exports = router;