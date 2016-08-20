'use strict';
var router = require('express').Router();
module.exports = router;

let db = require('../../../db'),
check = require('../check-handler');

const JobApplication = db.model('job_application');

router.param('id', function(req, res, next, id){
  console.log(id);
	JobApplication.findOne({
		where:{
			jobId: id
		}
	})
	.then(app => {
		req.requestedApp = app;
		next();
	})
	.catch(next);
});

router.get('/:id', function(req, res) {
  res.send(req.requestedApp);
});

router.post('/', function(req, res, next) {
	JobApplication.create(req.body)
	.then(function(app){
		res.send(app);
	})
	.catch(next);
});

//Check access removed from both

router.put('/:id', function(req, res, next) {
    req.requestedApp.update(req.body)
    .then(function (app) {
        res.send(app);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
    req.requestedApp.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});
