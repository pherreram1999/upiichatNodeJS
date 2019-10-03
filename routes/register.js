const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.post('/registrar',async (request,response)=>{
    let data = request.body;
    for(let i in data){
        if(i === 'txtPassword'){
            break;
        }
        String.prototype.trim(data[i]);
    }
    if(await user.existNickname(data.nickname))
    {
        response.send({nicknameExist: true});
    }
    else{
        // sino existe, lo registra
        response.send({nicknameExist: false});
        await user.registrar(data);
        location.href = '/login';
    }
});

module.exports = router;