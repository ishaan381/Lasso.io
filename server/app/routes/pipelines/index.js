'use strict';
var router = require('express').Router();
module.exports = router;

let Pipette = require('../../../db/models/pipe'),
Pipeline = require('../../../db/models/pipe.array'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	Pipeline.findById(id)
	.then(function(pipeline){
		req.requestedPipeline = pipeline;
		next();
	})
	.catch(next);
});

router.get('/:id')

