'use strict';
var router = require('express').Router();
module.exports = router;

let Company = require('../../../db/models/company'),
User = require('../../../db/models/user'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	User.findOne({
		where:{
			id: id
		}
	})
	.then(function(user){
		req.requestedUser = user;
		next();
	})
	.catch(next);
});

router.get('/:id', function(req, res, next) {
	req.requestedUser.reload()
	.then(function(user){
		res.send(user)
	})
	.catch(next);
});

// router.post('/', function(req, res, next) {
// 	User.create(req.body)
// 	.then(function(user){
// 		res.send(user)
// 	})
// 	.catch(next);
// });

router.delete('/:id', check.admin, function(req, res, next) {
	req.requestedUser.destroy()
	.then(function(){
		res.status(204).end();
	})
	.catch(next);
});

router.put('/:id', check.access, function(req, res, next) {
	req.requestedUser.update(req.body)
	.then(function(user){
		res.status(204);
		res.send(user);
	})
	.catch(next);
})