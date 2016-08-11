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
 Code = require('./models/code')


//places descriptionId and applicationId on the Job table
JobDescription.hasOne(Job, {foreignKey: 'descriptionId'});
JobApplication.hasOne(Job, {foreignKey: 'applicationId'});

Job.belongsTo(JobDescription, {as: 'description'});
Job.belongsTo(JobApplication, {as: 'application'});

Company.hasMany(User);
Application.hasMany(Comment, {as: 'application'});//not sure if this works -Jonathan
User.belongsTo(Company);
Company.hasMany(Job, {foreignKey: 'company'});
Job.hasMany(Application, {as: 'job'});
User.hasMany(Comment, {as: 'user'});





