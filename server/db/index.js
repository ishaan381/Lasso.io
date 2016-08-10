'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Job = require('./models/job');
var JobDescription = require('./models/job.description');
var JobApplication = require('./models/job.application');
var Company = require('./models/company');

//places descriptionId and applicationId on the Job table
JobDescription.hasOne(Job, {foreignKey: 'descriptionId'});
JobApplication.hasOne(Job, {foreignKey: 'applicationId'});

Job.belongsTo(JobDescription, {as: 'description'});
Job.belongsTo(JobApplication, {as: 'application'});

Company.hasMany(User);
User.belongsTo(Company);




