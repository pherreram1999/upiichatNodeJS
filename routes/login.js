const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login',async (request,response)=>{
    response.send({ok:true});
});

module.exports = router;