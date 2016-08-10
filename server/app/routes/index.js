'use strict';
var router = require('express').Router();
module.exports = router;
//all routes are plural
router.use('/members', require('./members'));
router.use('/companies', require('./companies'));
router.use('/job.applications', require('./job.applications'));
router.use('/job.descriptions', require('./job.descriptions'));
router.use('/jobs', require('./jobs'));
router.use('/users', require('./users'));
// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
