const router = require('express').Router();

router.post('/contacto',(req,res)=>{
    console.log(req.body);
    res.send({respuesta: true});
});

module.exports = router;