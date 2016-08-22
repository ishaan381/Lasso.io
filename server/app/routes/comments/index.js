'use strict';
var router = require('express').Router();
module.exports = router;
let db = require('../../../db'),
check = require('../check-handler');

const Comment = db.model('comment');

router.param('id', function(req, res, next, id){
	Comment.findById(id)
	.then(function(comment){
		req.requestedComment = comment;
		next();
	})
	.catch(next);
});

router.get('/:id', function(req, res, next) {
	res.send(req.requestedComment)
})


router.put('/:id', check.user, function(req, res, next) {
	req.requestedComment.update(req.body)
	.then(function(comment){
		res.status(204);
		res.send(comment);
	}).catch(next);
})

router.post('/', check.user, function(req, res, next) {
	Comment.create(req.body)
	.then(function(comment) {
		res.status(201)
		res.send(comment)
	})
	.catch(next)
})

router.delete('/:id', function(req, res, next) {
	req.requestedComment.destroy()
	.then(function(){
		res.status(204).end()
	})
	.catch(next);
})
