const express = require('express');
const router = express.Router();
const db = require('../db');
const user = require('../models/user');

router.post('/login',async (request,response)=>{
    let respuesta = await user.validar(request.body);
    if(respuesta.validado){
        request.session.id_usuario = respuesta.id_usuario;
        request.session.nickname = respuesta.nickname;
        response.send({validado: true, estatus: respuesta.estatus});
    }
    else{
        response.send({validado: false});
    }
});

module.exports = router;