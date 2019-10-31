const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.post('/registrar',async (request,response)=>{
    // comprobamos
    let obj = {
        nicknameExist: await user.existNickname(request.body.nickname.trim()),
        emailExist: await user.existEmail(request.body.txtEmail.trim())
    };
    if(!obj.nicknameExist && !obj.emailExist){
        await user.registrar(request.body);
    }
    response.send(obj);
});

module.exports = router;