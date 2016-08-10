'use strict';
var router = require('express').Router();
module.exports = router;

let Comment = require('../../../db/models/comment'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	Comment.findById(id)
	.then(function(user){
		req.requestedComment = user;
		next();
	})
	.catch(next);
});
