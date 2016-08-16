'use strict';
var router = require('express').Router();
module.exports = router;

let Comment = require('../../../db/models/comment'),
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


//hooks on associations and on models take care of deleting all relavant info, if they dont, check the models and associations
router.delete('/:id', (check.admin || check.pageAdmin), function(req, res, next) {
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
