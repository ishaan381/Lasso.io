'use strict';
var db = require('./_db');
module.exports = db;

let User = require('./models/user'),
 Job = require('./models/job'),
 JobDescription = require('./models/job.description'),
 JobApplication = require('./models/job.application'),
 Company = require('./models/company'),
 Application = require('./models/application'),
 Comment = require('./models/comment'),
 Pipette = require('./models/pipe'),
 PipeArray = require('./models/pipe.array'),//Pipe is a function
 Code = require('./models/code');

//places descriptionId and applicationId on the Job table
JobDescription.hasOne(Job, {foreignKey: 'descriptionId', onDelete: 'cascade', hooks: true});
JobApplication.hasOne(Job, {foreignKey: 'applicationId', onDelete: 'cascade', hooks: true});

Job.belongsTo(JobDescription, {as: 'description'})
Job.belongsTo(JobApplication, {as: 'application'})


Company.hasMany(JobDescription, {foreignKey: 'companyId'});
Company.hasMany(JobApplication, {foreignKey: 'companyId'});

// do we need belongs to???
JobDescription.belongsTo(Company, {as: 'company'});
JobApplication.belongsTo(Company, {as: 'company'});


Company.hasMany(User);
Application.hasMany(Comment, {as: 'application', onDelete : 'cascade', hooks: true});
Company.hasMany(Job, {foreignKey: 'companyId', onDelete : 'cascade', hooks: true});
Job.hasMany(Application, {as: 'job', onDelete : 'cascade', hooks: true});
User.hasMany(Comment, {as: 'user', onDelete : 'cascade', hooks: true});
Job.hasOne(PipeArray, {as: 'job', onDelete: 'cascade', hooks: true});
Pipette.hasMany(Comment, {as: 'stage', onDelete: 'cascade', hooks: true});
Application.hasOne(Pipette, {as: 'stage'})//if we delete a pipe section we have to make sure that the applications on that pipe section either move or get deleted themselves, or we can prevent editing of the pipeline until the settings page and when the pipeline is edited with applications on it all apps move to the first stage.
PipeArray.hasMany(Pipette, {as: 'pipeArrayId', onDelete: 'cascade', hooks: true});






