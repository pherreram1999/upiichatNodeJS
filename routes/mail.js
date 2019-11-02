const router = require('express').Router();
const mail = require('../models/mail');
const user = require('../models/user');
router.post('/recovery', async (req,res)=>{
     let correoExistente = await user.existEmail(req.body.txtEmail.trim());
     if(correoExistente){
          await mail.recovery(req.body.txtEmail.trim());
          res.send(correoExistente);
          return true;
     }
     else {
          res.send(correoExistente);
          return false;
     }
});

module.exports = router;