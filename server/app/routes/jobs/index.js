'use strict';
var router = require('express').Router();
module.exports = router;

let Job = require('../../../db/models/job'),
Apps = require('../../../db/models/application'),
JobDescription = require('../../../db/models/job.description'),
JobApplication = require('../../../db/models/job.application'),
check = require('../check-handler');


router.param('id', function(req, res, next, id){
	Job.findOne({
		where:{
			id: id
		},
		include: [
		{ model: JobApplication, as: 'application'},
		{ model: JobDescription, as: 'description'}
		]
	})
	.then(function(job){
		req.requestedJob = job;
		next();
	})
	.catch(next);
});

router.get('/:id/apps', function(req, res, next) {
    Job.findOne({
		where:{
			id: req.params.id
		},
		include: [
		{ model: Apps, as: 'apps'}
		]
	})
    .then(function(desc) {
        res.send(desc)
    })
    .catch(next);
});

//get one job
router.get('/:id', function(req, res, next) {
    req.requestedJob.reload()
    .then(function(desc) {
        res.send(desc)
    })
    .catch(next);
});

router.get('/', function (req, res, next) {
	Job.findAll({
		include: [
			{ model: JobApplication, as: 'application'},
			{ model: JobDescription, as: 'description'}
		]
	})
		.then(function (desc) {
			res.send(desc)
		})
		.catch(next);
})


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

//this will delete everything associated with this job
//hooks take care of deleting all associated content
router.delete('/:id', check.company, function(req, res, next) {
    req.requestedJob.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});

