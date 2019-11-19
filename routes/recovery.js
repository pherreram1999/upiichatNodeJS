const router = require('express').Router();
const sha1 = require('sha1');
const user = require('../models/user');
const mail = require('../models/mail');
router.get('/:id/:nickname/:clave',(req,res)=>{
    let clave = req.params.id + req.params.nickname;
    clave = sha1(clave);
    if(clave === req.params.clave){
        res.render('newpass',{nickname: req.params.nickname});
    }
    else {
        res.redirect('/');
        return false;
    }
});



router.post('/newpass',async (req,res)=>{
    res.send(await user.updatePass(req.body.password,req.body.nickname));
});


router.post('/recovery',async (req,res)=>{
    let emailExist = await user.existEmail(req.body.txtEmail.trim())
    if(emailExist){
        let clave = 'https://upiichat.herokuapp.com' + await user.generaClave(req.body.txtEmail.trim());
        let url = `Para continuar con la recuperacion de contraseña, da click en el sigueinte enlace <br>`;
        url = url + `<a href="${clave}">${clave}</a>`;
        debugger;
        let sender = mail.createTransport('support@upiichat.com.mx');
        await sender.sendMail({
            from:'SOPORTE UPIICHAT <support@upiichat.com.mx>',
            to: req.body.txtEmail.trim(),
            subject: 'UPIICHAT: recuperación de contraseña',
            html: url
        })
    }
    res.send({emailExist});
});

module.exports = router;