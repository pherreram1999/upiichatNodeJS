const express = require('express');
const router = express.Router();
const chat = require('../models/chat');

router.post('/getMessages',async (request,response)=>{
    let mensajes = await chat.getMessages();
    response.send(mensajes);
});

module.exports = router;