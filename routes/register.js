const express = require('express');
const router = express.Router();
const user = require('../models/user');
const mail = require('../models/mail');
const fs = require('fs');
const sha1 = require('sha1')

router.post('/registrar',async (request,response)=>{
    // comprobamos
    let obj = {
        nicknameExist: await user.existNickname(request.body.nickname.trim()),
        emailExist: await user.existEmail(request.body.txtEmail.trim()),
        estatus: false
    }; 

    if(!obj.nicknameExist && !obj.emailExist){
        await user.registrar(request.body);
        let sender = mail.createTransport('noreply@upiichat.com.mx');
        let url = 'http://upiichat.herokuapp.com' + user.urlRegistro(request.body.txtEmail.trim(),request.body.nickname.trim());
        let mensajeRegistro = `<p>Para finalizar tu registro, favor dar <a href="${url}">click aqui</a></p>`;
        //html = html + mensajeRegistro;
        await sender.sendMail({
            from: 'UPIICHAT <noreply@upiichat.com.mx',
            to: request.body.txtEmail.trim(),
            subject: 'Complementar el registro UPIICHAT',
            html: mensajeRegistro
        });
    }
    response.send(obj);
});

router.get('/:nickname/:usuario/:clave',async(req,res)=>{
    let clave = req.params.usuario + req.params.nickname;
    clave = sha1(clave);
    if(clave === req.params.clave){
        await user.activar(req.params.nickname);
        res.render('validar',{nickname: req.params.nickname});
    } 
    else{
        res.redirect('/');
        return false;
    }
});


module.exports = router;