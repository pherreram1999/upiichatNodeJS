const express = require('express');
const router = express.Router();
const user = require('../models/user');
const mail = require('../models/mail');

router.post('/registrar',async (request,response)=>{
    // comprobamos
    let obj = {
        nicknameExist: await user.existNickname(request.body.nickname.trim()),
        emailExist: await user.existEmail(request.body.txtEmail.trim()),
        estatus: false
    }; // el error esta aqui

    if(!obj.nicknameExist && !obj.emailExist){
        await user.registrar(request.body);

    }
    response.send(obj);
    response.end();
});


module.exports = router;