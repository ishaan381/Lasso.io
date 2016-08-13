'use strict';
var router = require('express').Router();
module.exports = router;
let Company = require('../../../db/models/company'),
Job = require('../../../db/models/job'),
User = require('../../../db/models/user'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	Company.findOne({
		where:{
			id: id
		}, //we'll figure this out later
		include: [
		{ model: Job, as: 'job'},
		{ model: User, as: 'user'},
		]
	})
	.then(function(company){
		req.requestedCompany = company;
		next();
	})
	.catch(next);
});

//what would the admin route look like
router.get('/:id', function(req, res, next) {
	req.requestedCompany.reload()
	.then(function(company){
		res.send(company)
	})
	.catch(next);
});

//this route is for the company admin to get all users
router.get('/:id/users', function(req, res, next){
	req.requestedCompany.reload()
	.then(function(company){
		res.send(company.users);
	})
	.catch(next)
});

router.post('/', function(req, res, next) {
	Company.create(req.body)
	.then(function(company){
		res.status(201);
		res.send(company)
	})
	.catch(next);
});

router.put('/:id', check.company, function(req, res, next) {
	req.requestedCompany.update(req.body)
	.then(function (user) {
		res.status(204)
		res.send(user);
	})
	.catch(next);
})

router.delete('/:id', function(req, res, next) {
	req.requestedCompany.destroy()
	.then(function(){
		res.status(204).end()
	})
	.catch(next);
});
