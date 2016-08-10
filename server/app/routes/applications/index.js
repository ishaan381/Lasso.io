'use strict';
var router = require('express').Router();
module.exports = router;

let App = require('../../../db/models/application'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	App.findOne({
		where:{
			id: id
		},
		include: [
		{ model: User, as: 'user'}, //so we can attach the comments that are attached to the users to the applicant
		{ model: Comment, as: 'comments'}
		]
	})
	.then(function(app){
		req.requestedApplication = app;
		next();
	})
	.catch(next);
});

router.get('/:id', function(req, res, next) {
    Comment.findAll({
    	where: {
    		applicationId: req.param.id
    	},
    	include: [
    		{model: User, as: 'user'}
    		]
    }).then(function(comments){
    	res.status(201);
    	res.send(review);
    }).catch(next);
});
