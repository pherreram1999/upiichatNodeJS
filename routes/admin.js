const router = require('express').Router();
const admin = require('../models/admin');

router.post('/loginAdmin',async (req,res)=>{
    let result = await admin.validar(req.body.nickname.trim(),req.body.txtPassword.trim());
    console.log(result);
    if(result.validado){
        req.session.admin = result.admin;
        res.send(true);
    }
    else {
        res.send(false);
    }
});

router.delete('/usuarios',async (req,res)=>{
    res.send(await admin.borrarUsuarios());
});

router.delete('/chat', async (req, res)=>{
    res.send(await admin.vaciarChat());
});

router.post('/palabras',async (req,res)=>{
    res.send(await admin.traerDicc());
});

router.put('/palabra',async (req,res)=>{
    res.send(await admin.addDicc(req.body.txtPalabra.trim()));
});

router.delete('/palabra',async (req,res)=>{
    res.send(await admin.delDicc(req.body.palabra.trim()));
});

module.exports = router;