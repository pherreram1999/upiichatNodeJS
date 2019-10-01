const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login',(request,response)=>{
    let r = db.query('SELECT * FROM usuarios');
    console.log(r);
});

module.exports = router;