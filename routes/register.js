const express = require('express');
const router = express.Router();

router.post('/registrar',(request,response)=>{
    console.log(request.body);
});

module.exports = router;