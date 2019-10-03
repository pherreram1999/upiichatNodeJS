const express = require('express');
const router = express.Router();
const db = require('../db');
const user = require('../models/user');

router.post('/login',async (request,response)=>{
    let respuesta = await user.validar(request.body);
    if(respuesta.validado){
        request.session.id = respuesta.id;
        request.session.nickname = respuesta.nickname;
        response.send({validado: true});
    }
    else{
        response.send({validado: false});
    }
});

module.exports = router;