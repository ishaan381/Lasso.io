'use strict';
var router = require('express').Router();
module.exports = router;
let db = require('../../../db'),
check = require('../check-handler');

const Company = db.model('company'),
Job = db.model('job'),
User = db.model('user'),
JobDescription = db.model('job_description');

router.param('id', function(req, res, next, id){
	Company.findOne({
		where:{
			id: id
		}, //we'll figure this out later
		include: [
		{ model: Job, as: 'job',
			include: [ { model: JobDescription, as: 'jobDescription'}]
		},
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
router.get('/:id', function(req, res) {
	res.send(req.requestedCompany);
});

//this route is for the company admin to get all users
router.get('/:id/users', function(req, res){
	res.send(req.requestedCompany);
});

router.post('/', function(req, res, next) {
	Company.create(req.body)
	.then(function(company){
		res.status(201);
		res.send(company)
	})
	.catch(next);
});

router.put('/:id', function(req, res, next) {
	req.requestedCompany.update(req.body)
	.then(function (user) {
		res.status(204)
		res.send(user);
	})
	.catch(next);
})

router.delete('/:id', (check.admin || check.pageAdmin), function(req, res, next) {
	req.requestedCompany.destroy()
	.then(function(){
		res.status(204).end()
	})
	.catch(next);
});
