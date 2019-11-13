const router = require('express').Router();

router.get('/test',(req,res)=>{
    res.render('test');
});
router.post('/upload',(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    res.send();
});

module.exports = router;