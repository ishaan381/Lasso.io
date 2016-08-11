'use strict';
var router = require('express').Router();
module.exports = router;
let Code = require('../../../db/models/code'),
    check = require('../check-handler');

var randomCode = require('password-generator');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'llasso1606@gmail.com',
        pass: 'fullstack1606'
    }
});





router.get('/', function(req, res, next) {
    Code.create({ code: randomCode(9, false) })
        .then(function(_code) {
            var mailOptions = {
                from: '"Fred Foo" <llasso1606@gmail.com>', // sender address
                to: 'ishaan7@gmail.com', // list of receivers
                subject: 'Hello', // Subject line
                text: _code.code, // plaintext body
                //html: '<b>Hello world</b>' // html body
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) next(error)
                else res.send(info);
            })
        })


});
