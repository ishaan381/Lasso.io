// var helper = require('sendgrid').mail;
// var from_email = new helper.Email('llasso1606@gmail.com');
// var to_email = new helper.Email('ishaan7@gmail.com');
// var subject = 'Hello from the other side';
// var content = new helper.Content('text/plain', 'Hello, Email!');
// var mail = new helper.Mail(from_email, subject, to_email, content);


// var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
// var request = sg.emptyRequest({
//     method: 'POST',
//     path: '/v3/mail/send',
//     body: mail.toJSON()
// })

// sg.API(request, function(error, response) {
//   console.log(response.statusCode);
//   console.log(response.body);
//   console.log(response.headers);
// })

// var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
// var email = new sendgrid.Email();

// email.addTo('ishaan7@gmail.com');
// email.setFrom('llasso1606@gmail.com');
// email.setSubject('Sending email is fun');
// email.setHtml('and easy to do anywhere');

// send

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'llasso1606@gmail.com',
    pass: 'fullstack1606'
  }
});

var mailOptions = {
    from: '"Fred Foo" <llasso1606@gmail.com>', // sender address
    to: 'ishaan7@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) console.log(error);
  else console.log('Message sent: '+ info.response)
})
