const express = require('express');
const router = express.Router();
router.get('/',(request,response)=>{
    response.render('home');
});

router.get('/login',(request,response)=>{
    response.render('login');
});

router.get('/registro',(request,response)=>{
    response.render('register');
});

router.get('/chat',(request,response)=>{
    if(request.session.nickname === undefined ||
        request.session.nickname === null){
        response.redirect('/login');
        return false; // lo detenemos con esto y asi no trate de enviar lode abajo y nos lanze error de envio doble
        // esto se debe a que nodejs es asincrono;
    }
    response.render('chat',{
        nickname: request.session.nickname,
        id_usuario: request.session.id_usuario
    });
});

router.get('/recovery',(request, response)=>{
    response.render('recovery');
});

router.get('/terminos',(request,response)=>{
    response.render('terms');
});

router.get('/cerrar',(request,response)=>{
   request.session.nickname = null;
   response.render('cerrar');
});

router.get('/acerca',(req,res)=>{
    res.render('aboutUs');
});

router.get('/contacto',(req,res)=>{
   res.render('contact');
});

router.get('/responsables',(req,res)=>{
   res.render('responsables');
});

router.get('/test',(req,res)=>{
    let fs = require('fs');
    res.send('testeando...');
});

module.exports = router;
