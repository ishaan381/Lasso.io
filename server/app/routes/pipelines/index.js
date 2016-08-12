'use strict';
var router = require('express').Router();
module.exports = router;

let Pipette = require('../../../db/models/pipe'),
Pipeline = require('../../../db/models/pipe.array'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	Pipeline.findOne({
		where: {
			id: id
		},
		include: [{
			model: Pipette, as: 'pipe'
		}]
	})
	.then(function(pipeline){
		req.requestedPipeline = pipeline;
		next();
	})
	.catch(next);
});


//the get put, and delete methods will be in the job route