'use strict';
var router = require('express').Router();
module.exports = router;

var fs = require('fs');
var S3FS = require('s3fs');

var s3fsImpl = new S3FS('lasso-uploads', {
  accessKeyId: "AKIAIAVODYJBLIDQ4WAQ",
  secretAccessKey: "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"
})

s3fsImpl.create();

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

router.use(multipartyMiddleware);


// var multer = require('multer'),
//   s3 = require('multer-s3');

// var upload = multer({
//   storage: s3({
//     dirname: '/',
//     bucket: process.env.S3_BUCKET,
//     secretAccessKey: process.env.AWS_SECRET_KEY_ID,
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     region: 'us-standard',
//     filename: function(req, file, cb) {
//       cb(null, file.originalname);
//     }
//   })
// })

router.post('/', function(req, res, next) {
  var file = req.files.file;

  var readStream = fs.createReadStream(file.path);

  return s3fsImpl.writeFile(file.originalFilename, readStream)
  .then(function(data) {
    console.log(data)
    fs.unlink(file.path, function(err) {
      if (err) console.error(err)
    })
    res.send('OK!')
  })

})

