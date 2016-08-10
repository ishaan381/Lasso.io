'use strict';
var router = require('express').Router();
module.exports = router;

let JobApplication = require('../../../db/models/job.application'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	JobApplication.findOne({
		where:{
			id: id
		}
	})
	.then(function(app){
		req.requestedApp = app;
		next();
	})
	.catch(next);
});

router.get('/:id', function(req, res, next) {
    req.requestedApp.reload()
    .then(function(app) {
        res.send(app)
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
	JobApplication.create(req.body)
	.then(function(app){
		res.send(app);
	})
	.catch(next);
});

router.put('/:id', check.access, function(req, res, next) {
    req.requestedApp.update(req.body)
    .then(function (app) {
        res.send(app);
    })
    .catch(next);
});

router.delete('/:id', check.company, function(req, res, next) {
    req.requestedApp.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});