'use strict';
var db = require('./_db');
module.exports = db;

let User = require('./models/user'),
 Job = require('./models/job'),
 JobDescription = require('./models/job.description'),
 JobApplication = require('./models/job.application'),
 Company = require('./models/company'),
 Application = require('./models/application'),
 Comment = require('./models/comment');


//places descriptionId and applicationId on the Job table
JobDescription.hasOne(Job, {foreignKey: 'descriptionId'});
JobApplication.hasOne(Job, {foreignKey: 'applicationId'});

Job.belongsTo(JobDescription, {as: 'description'});
Job.belongsTo(JobApplication, {as: 'application'});

Company.hasMany(User);
User.belongsTo(Company);
Job.hasMany(Application);
User.hasMany(Comment);

Application.hasMany(Comment, {as: 'comments'})//not sure if this works -Jonathan




