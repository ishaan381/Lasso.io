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
			{ model: JobDescription, as: 'description'},
			{ model: Pipeline, as: 'pipeline',
				include: [{ model: Pipette, as: 'pipe'}]
			}
		]
	})
	.then(function(job){
		req.requestedJob = job;
		next();
	})
	.catch(next);
});

//Im having a massive brain fart on what data from where should be send to the front
router.get('/:id/apps', function(req, res, next) {
    Job.findOne({
		where:{
			id: req.params.id
		},
		include: [
		{ model: Apps, as: 'apps'},
		{ model: Pipeline, as: 'pipeline'}
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
        res.send(desc);
    })
    .catch(next);
});

router.get('/', function (req, res, next) {
	Job.findAll({
		include: [
			{ model: JobApplication, as: 'application'},
			{ model: JobDescription, as: 'description'},
			// { model: Pipeline, as: 'pipeline'}
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

router.put('/:id', check.company, function(req, res, next) {
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


//=====================pipeline job routes=========================

//the names are subject to change

//get a pipeline for a job
router.get('/:id/pipeline', check.company, function(req, res, next) {
	Pipeline.findOne({
		where: {
			jodId: req.params.id
		}
	}).then(function(desc){
		res.send(desc);
	})
	.catch(next);
});

router.post('/:id/createpipeline', check.company, function(req, res, next) {
	Pipeline.create(req.body)
	.then(function(desc) {
		res.status(201);
		res.send(desc);
	})
	.catch(next)
});

router.put('/:id/editpipeline', check.company, function(req, res, next) {
	Pipeline.findOne({
		where: {
			jobId: req.params.id
		}
	}).update(req.body)
	.then(function(desc){
		res.staus(204);
		res.send(desc);
	})
	.catch(next);
});

router.delete('/:id/deletepipeline', check.company, function(req, res, next) {
	Pipeline.findOne({
		where: {
			jobId: req.params.id
		}
	}).destroy()
	.then(function(){
		res.status(204).end();
	})
	.catch(next)
})
