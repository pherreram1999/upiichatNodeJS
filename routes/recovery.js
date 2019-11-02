const router = require('express').Router();
const sha1 = require('sha1');
const user = require('../models/user');

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
    await user.updatePass(req.body.password,req.body.nickname);
    res.send(user.updatePass(req.body.password,req.body.nickname));
});

module.exports = router;