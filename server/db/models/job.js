// var Sequelize = require('sequelize');
let db = require('../_db'),
 JobDescription = require('./job.description'),
 App = require('./application'),
 JobApplication = require('./job.application');

module.exports = db.define('job', {
}, {
	hooks: {
		beforeDestroy: function(job){
			JobApplication.delete({
				where: {
					id: job.applicationId
				}
			})
			.then(function(){
				JobDescription.delete({
					where: {
						id: job.descriptionId
					}
				})
			})
			.then(function(){
				App.delete({
					where: {
						jobId: job.id
					}
				})
			})
		}
	}
});
