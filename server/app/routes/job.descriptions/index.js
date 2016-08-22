'use strict';
var router = require('express').Router();
module.exports = router;
let db = require('../../../db'),
check = require('../check-handler');


const JobDescription = db.model('job_description');

router.param('id', function(req, res, next, id){
	JobDescription.findOne({
		where:{
			jobId: id
		}
	})
	.then(description => {
		req.requestedDesc = description;
		next();
	})
	.catch(next);
});

router.get('/:id', function(req, res) {
    console.log('In')
    res.send(req.requestedDesc)
});

router.post('/', function(req, res, next) {
	JobDescription.create(req.body)
	.then(function(desc){
		res.send(desc);
	})
	.catch(next);
});

router.put('/:id', function(req, res, next) {
    req.requestedDesc.update(req.body)
    .then(function (desc) {
        res.send(desc);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
    req.requestedDesc.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});
