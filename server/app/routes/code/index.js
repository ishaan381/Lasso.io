'use strict';
var router = require('express').Router();
module.exports = router;
let Code = require('../../../db/models/code');

var randomCode = require('password-generator');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'llasso1606@gmail.com',
        pass: 'fullstack1606'
    }
});

router.post('/', function(req, res, next) {
    console.log(req.body)
    Code.create({ code: randomCode(9, false), companyId: req.body.companyId })
        .then(function(_code) {
            var mailOptions = {
                from: '"Lasso.io" <llasso1606@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Invitation Code to Join Lasso!', // Subject line
                text: _code.code, // plaintext body
                //html: '<b>Hello world</b>' // html body
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) next(error)
                else res.send(info);
            })
        })


});
