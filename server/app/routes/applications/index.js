'use strict';
var router = require('express').Router();
module.exports = router;

let App = require('../../../db/models/application'),
Comment = require('../../../db/models/comment'),
Stage = require('../../../db/models/stage'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	App.findOne({
		where:{
			id: id
		},
		include: [ //we attach comments, and comments have a user attached to them
		{ model: Comment, as: 'comments'},
		]
	})
	.then(function(app){
		req.requestedApplication = app;
		next();
	})
	.catch(next);
});


router.get('/:id', function(req, res, next) {
    req.requestedApplication.reload()
    .then(app => res.send(app))
   	.catch(next);
});

//these seem to the the same
router.get('/:id/allcomments', function(req, res, next) {
	req.requestedApplication.reload()
	.then(app => res.send(app.comments))
	.catch(next);
});

router.post('/', function(req, res, next){
	App.create(req.body)
	.then(function(app) {
		res.status(201);
		res.send(app);
	})
	.catch(next);
});

router.put('/:id', check.access, function(req, res, next) {
	req.requestedApplication.update(req.body)
	.then(function(app){
		res.status(204);
		res.send(app);
	})
	.catch(next);
})

//lets employee post a comment on an application
router.post('/comment', function(req, res, next) {
	Comment.create(req.body)
	.then(function(comment) {
		res.status(201);
		res.send(comment);
	})
	.catch(next);
})

router.delete('/:id', check.access, function(req, res, next) {
	req.requestedApplication.destroy()
	.then(function(){
		res.status(204).end();
	})
	.catch(next);
});
