'use strict';
var db = require('./_db');
module.exports = db;

const User = require('./models/user'),
 Job = require('./models/job'),
 JobDescription = require('./models/job.description'),
 JobApplication = require('./models/job.application'),
 Company = require('./models/company'),
 Application = require('./models/application'),
 Comment = require('./models/comment'),
 Stage = require('./models/stage'),
 Code = require('./models/code'),
 Feedback = require('./models/feedback');


Job.belongsTo(Company, {as: 'company'});
Company.hasMany(Job, {as: 'job', onDelete : 'cascade', hooks: true});

User.belongsTo(Company, {as: 'company'});
Company.hasMany(User, {as: 'user', onDelete : 'cascade', hooks: true});

Code.belongsTo(Company, {as: 'company'});
Company.hasMany(Code, {as: 'code', onDelete : 'cascade', hooks: true});

JobDescription.belongsTo(Job, {as: 'job'});
Job.hasOne(JobDescription, {as: 'jobDescription', onDelete: 'cascade', hooks: true})

JobApplication.belongsTo(Job, {as: 'job'});
Job.hasOne(JobApplication, {as: 'jobApplication', onDelete: 'cascade', hooks: true})

Stage.belongsTo(Job, {as: 'job'});
Job.hasMany(Stage, {as: 'stage', onDelete: 'cascade', hooks: true});

Application.belongsTo(Job, {as: 'job'});
Job.hasMany(Application, {as: 'application', onDelete: 'cascade', hooks: true});

Application.belongsTo(Stage, {as: 'stage'});
Stage.hasMany(Application, {as: 'application', onDelete: 'cascade', hooks: true});

Application.belongsTo(JobApplication, {as: 'jobApplication'});
JobApplication.hasMany(Application, {as: 'application', onDelete: 'cascade', hooks: true});

Comment.belongsTo(Application, {as: 'application'});
Application.hasMany(Comment, {onDelete : 'cascade', hooks: true});

Comment.belongsTo(User, {as: 'user'});
User.hasMany(Comment, {as: 'comment', onDelete : 'cascade', hooks: true});

Feedback.belongsTo(Application, {as: 'application'});
Application.hasMany(Feedback, {as:'feedback', onDelete: 'cascade', hooks: true});

Feedback.belongsTo(Stage, {as: 'stage'});
Stage.hasMany(Feedback, {as: 'feedback', onDelete: 'cascade', hooks: true});







