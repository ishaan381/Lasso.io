'use strict';
var router = require('express').Router();
module.exports = router;

let Pipette = require('../../../db/models/pipe'),
User = require('../../../db/models/user'),
Comment = require('../../../db/models/comment');

//Pipe is a funciton so pipe and Pipette refer to the same thing

router.param('id', function(req, res, next, id){
	Pipette.findOne({
		where: {
			id: id
		},
		include: [{ 
			all: true, //found these two methods on Sequelize API, this either helps with a problem, or is redundant
			nested: true,
			model: Comment, 
			as: 'comment', 
			include: [{ 
				model: User, 
				as: 'user' 
			}]
		}]
	})
	.then(function(pipe){
		req.requestedPipe = pipe;
		next();
	})
	.catch(next);
});

// router.get('/:id', function(req, res, next){
// 	req.requestedPipe.reload()
// 	.then(function(pipe){
// 		res.send(pipe);
// 	})
// 	.catch(next);
// });

// router.post('/', function(req, res, next){
// 	Pipette.create(req.body)
// 	.then(function(pipe){
// 		res.status(201);
// 		res.send(pipe);
// 	})
// 	.catch(next)
// });



router.put()










