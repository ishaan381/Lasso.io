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
 Stage = require('./models/stage'),
 Code = require('./models/code');

Job.belongsTo(Company, {as: 'company'});
Company.hasMany(Job, {as: 'job', onDelete : 'cascade', hooks: true});

User.belongsTo(Company, {as: 'company'});
Company.hasMany(User, {as: 'user', onDelete : 'cascade', hooks: true});

JobDescription.belongsTo(Job, {as: 'job', onDelete: 'cascade', hooks: true});
Job.hasOne(JobDescription, {as: 'description'})

JobApplication.belongsTo(Job, {as: 'job', onDelete: 'cascade', hooks: true});
Job.hasOne(JobApplication, {as: 'application'})

Stage.belongsTo(Job, {as: 'job', onDelete: 'cascade', hooks: true});
Job.hasMany(Stage, {as: 'stage', onDelete: 'cascade', hooks: true});

Application.belongsTo(Job, {as: 'job', onDelete: 'cascade', hooks: true});
Job.hasMany(Application, {as: 'application', onDelete: 'cascade', hooks: true});

Application.belongsTo(Stage, {as: 'stage', onDelete: 'cascade', hooks: true});
Stage.hasMany(Application, {as: 'application', onDelete: 'cascade', hooks: true});

Comment.belongsTo(Application, {as: 'application', onDelete: 'cascade', hooks: true});
Application.hasMany(Comment, {as: 'comment', onDelete : 'cascade', hooks: true});

Comment.belongsTo(User, {as: 'user', onDelete: 'cascade', hooks: true});
User.hasMany(Comment, {as: 'comment', onDelete : 'cascade', hooks: true});

//WILL NEED TO COME BACK TO APPLICATION AND USER ASSOCIATIONS







