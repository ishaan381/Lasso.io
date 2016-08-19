'use strict';
var router = require('express').Router();
module.exports = router;

// var fs = require('fs');
// var S3FS = require('s3fs');

// var s3fsImpl = new S3FS('lasso-uploads', {
//   accessKeyId: "AKIAIAVODYJBLIDQ4WAQ",
//   secretAccessKey: "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"
// })

// s3fsImpl.create();

// var multiparty = require('connect-multiparty');
// var multipartyMiddleware = multiparty();

// router.use(multipartyMiddleware);


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

var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

router.use(multer({storage : storage}).single('file'));


router.post('/', function(req, res, next) {
  res.send(req.file.filename)
})




// var file = req.files.file;

//   var readStream = fs.createReadStream(file.path);

//   return s3fsImpl.writeFile(file.originalFilename, readStream)
//   .then(function(data) {
//     console.log(data)
//     fs.unlink(file.path, function(err) {
//       if (err) console.error(err)
//     })
//     res.send('OK!')
//   })
