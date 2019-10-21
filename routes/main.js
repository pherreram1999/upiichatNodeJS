const express = require('express');
const router = express.Router();
router.get('/',(request,response)=>{
    response.render('index');
});

router.get('/login',(request,response)=>{
    response.render('login');
});

router.get('/registro',(request,response)=>{
    response.render('register');
});

router.get('/chat',(request,response)=>{ 
    response.render('chat',{
        nickname: request.session.nickname,
        id_usuario: request.session.id_usuario
    });
});

router.get('/terminos',(request,response)=>{
    response.render('terms');
});

router.get('/cerrar',(request,response)=>{
   request.session.nickname = null;
   response.render('cerrar');
});
module.exports = router;