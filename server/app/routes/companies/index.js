'use strict';
var router = require('express').Router();
module.exports = router;
let Company = require('../../../db/models/company'),
Job_applications = require('../../../db/models/job.application'),
Job_descriptions = require('../../../db/models/job.description'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	Company.findOne({
		where:{
			id: id
		}, //we'll figure this out later
		include: [
		{ model: Job, as: 'jobs'},
		{ model: User, as: 'employee'},
		{ model: Job_applications, as: 'appForm'},
		{ model: Job_descriptions, as: 'jobDesc'}
		]
	})
	.then(function(company){
		req.requestedCompany = company;
		next();
	})
	.catch(next);
});

//what would the admin route look like
router.get('/:id', check.company, function(req, res, next) {
	req.requestedCompany.reload()
	.then(function(company){
		res.send(company)
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	Company.create(req.body)
	.then(function(company){
		res.send(company)
	})
	.catch(next);
});

router.put('/:id', function(req, res, next) {
	req.requestedCompany.update(req.body)
	.then(function (user) {
		res.send(user);
	})
	.catch(next);
})