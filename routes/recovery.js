const express = require('express');
const router = express.Router();
const mailData = require('../models/mail');
const mailer = require('nodemailer');

router.post('/mail',async(request,response)=>{
    let trasnporter = mailer.createTransport(mailData);
    await trasnporter.sendMail({
       from: 'UPIICHAT',
       to: 'alonso.pahm@gmail.com',
       subjet: 'UPIICHAT',
       text: 'El mensaje de upiichat ha funcionado'
    }).catch(error => console.log(error));
    response.send(r);
});

module.exports = router;