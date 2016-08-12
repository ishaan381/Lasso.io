'use strict';
var router = require('express').Router();
module.exports = router;
//all routes are plural

router.use('/members', require('./members'));
router.use('/companies', require('./companies'));
router.use('/jobs/applications', require('./job.applications'));
router.use('/jobs/descriptions', require('./job.descriptions'));
router.use('/jobs', require('./jobs'));
router.use('/users', require('./users'));
router.use('/comments', require('./comments'));
router.use('/applications', require('./applications'));
router.use('/code', require('./code'));
router.use('/pipes', require('./pipes'));
router.use('/pipelines', require('./pipelines'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
