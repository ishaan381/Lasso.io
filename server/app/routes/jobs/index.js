'use strict';
var router = require('express').Router();
module.exports = router;

let Job = require('../../../db/models/job'),
JobDescription = require('../../../db/models/job.description'),
JobApplication = require('../../../db/models/job.application'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	Job.findOne({
		where:{
			id: id
		},
		include: [
		{ model: JobApplication, as: 'appForm'},
		{ model: JobDescription, as: 'jobDesc'}
		]
	})
	.then(function(job){
		req.requestedJob = job;
		next();
	})
	.catch(next);
});

router.get('/:id', function(req, res, next) {
    req.requestedJob.reload()
    .then(function(desc) {
        res.send(desc)
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
	Job.create(req.body)
	.then(function(desc){
		res.status(201);
		res.send(desc);
	})
	.catch(next);
});

router.put('/:id', check.access, function(req, res, next) {
    req.requestedJob.update(req.body)
    .then(function (desc) {
        res.send(desc);
    })
    .catch(next);
});

router.delete('/:id', check.company, function(req, res, next) {
    req.requestedJob.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

