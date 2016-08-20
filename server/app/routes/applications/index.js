'use strict';
var router = require('express').Router();
module.exports = router;

let db = require('../../../db'),
check = require('../check-handler');

const App = db.model('application'),
Comment = db.model('comment');

router.param('id', function(req, res, next, id){
	App.findOne({
		where:{
			id: id
		},
		include: [Comment]
	})
	.then(function(app){
		req.requestedApplication = app;
		next();
	})
	.catch(next);
});


router.get('/:id', function(req, res) {
    res.send(req.requestedApplication);
});

//these seem to the the same

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
router.post('/:id/comment', function(req, res, next) {
  //NEEDS CHANGE 8/16
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
