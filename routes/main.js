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
        nickname: request.session.nickname
    });
});

router.get('/terminos',(request,response)=>{
    response.render('terms');
});
module.exports = router;