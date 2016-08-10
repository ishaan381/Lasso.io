'use strict';
var router = require('express').Router();
module.exports = router;
let Company = require('../../../db/models/company'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	Company.findOne({
		where:{
			id: id
		},
		//include: [] for later
	})
	.then(function(user){
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