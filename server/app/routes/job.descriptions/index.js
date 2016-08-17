'use strict';
var router = require('express').Router();
module.exports = router;
let db = require('../../../db'),
check = require('../check-handler');

//REQUIRE DB AND ACCESS IT TO GET MODELS!!!

const JobDescription = db.model('job_description')

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

router.get('/:id', function(req, res) {
    res.send(req.requestedDesc)
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

router.delete('/:id', function(req, res, next) {
    req.requestedDesc.destroy()
    .then(function () {
        res.status(204).end();
    })
    .catch(next);
});
