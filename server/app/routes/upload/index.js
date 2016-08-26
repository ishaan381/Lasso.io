'use strict';
var router = require('express').Router();
module.exports = router;

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
