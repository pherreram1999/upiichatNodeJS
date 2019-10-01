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
    if(await user.existEmail(data.txtEmail))
    {
        response.send({emailExist: true});
    }
    else{
        response.send({emailExist: false});
        await user.registrar(data);
    }
});

module.exports = router;