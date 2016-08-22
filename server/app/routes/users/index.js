'use strict';
var router = require('express').Router();
module.exports = router;
let db = require('../../../db'),
check = require('../check-handler');

const User = db.model('user');

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

router.get('/:id',(check.admin || check.pageAdmin || check.access), function(req, res) {
	res.send(req.requestedUser);
});


router.delete('/:id', check.pageAdmin, function(req, res, next) {
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
