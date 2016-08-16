'use strict';
var router = require('express').Router();
module.exports = router;

let Comment = require('../../../db/models/comment'),
User = require('../../../db/models/user'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	Comment.findById(id)
	.then(function(comment){
		req.requestedComment = comment;
		next();
	})
	.catch(next);
});


router.put('/:id', check.user, function(req, res, next) {
	req.requestedComment.update(req.body)
	.then(function(comment){
		res.status(204);
		res.send(comment);
	}).catch(next);
})

router.delete('/:id', function(req, res, next) {
	req.requestedComment.destroy()
	.then(function(){
		res.status(204).end()
	})
	.catch(next);
})
