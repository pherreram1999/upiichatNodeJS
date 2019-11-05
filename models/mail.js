const mailer = require('nodemailer');
const user = require('../models/user');

module.exports = {
    createTransport:(user)=>{
        return mailer.createTransport({
            host: 'mail.upiichat.com.mx',
            port: 587,
            secure: false,
            auth: {
                user,
                pass: '$1st3wasH'
            },
            tls:{
                rejectUnauthorized: false
            }
        })
    }
}


