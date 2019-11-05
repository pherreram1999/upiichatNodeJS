const router = require('express').Router();
const mail = require('../models/mail');

router.post('/contacto',async (req,res)=>{
    let sender = mail.createTransport('contacto@upiichat.com.mx');
    await sender.sendMail({
        from:`${req.body.txtNombre} <${req.body.txtEmail}>`,
        to: 'contacto@upiichat.com.mx',
        subject: 'contacto usuario',
        text: req.body.txtMensaje
    })
    res.send({respuesta: true});
});

module.exports = router;