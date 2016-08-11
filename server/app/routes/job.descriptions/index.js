'use strict';
var router = require('express').Router();
module.exports = router;

let JobDescription = require('../../../db/models/job.description'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	JobDescription.findOne({
		where:{
			id: id
		}
	})
	.then(function(desc){
		req.requestedDesc = desc;
		next();
	})
	.catch(next);
});

router.get('/:id', function(req, res, next) {
    req.requestedDesc.reload()
    .then(function(desc) {
        res.send(desc)
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
	JobDescription.create(req.body)
	.then(function(desc){
		res.send(desc);
	})
	.catch(next);
});

router.put('/:id', check.access, function(req, res, next) {
    req.requestedDesc.update(req.body)
    .then(function (desc) {
        res.send(desc);
    })
    .catch(next);
});

router.delete('/:id', check.company, function(req, res, next) {
    req.requestedDesc.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});