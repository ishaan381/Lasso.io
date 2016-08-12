'use strict';
let Sequelize = require('sequelize'),
User = require('./user'),
Stage = require('./stage'),
db = require('../_db');
//we still need associations between companies and
module.exports = db.define('company', {
    name: {
        type: Sequelize.STRING
    },
    website: {
        type: Sequelize.STRING,
        validate: {
        	isURL: true
        }
    }
}, {

	hooks: {
		beforeDestroy: function(company){
			return User.destroy({
				where: {
					companyId: company.id
				},
				individualHooks: true
			})
		}
	},

	// instanceMethods: {
	// 	pipeline: function(company){
	// 		var pipeline = [];
	// 		return Pipette.findAll({
	// 			where: {
	// 				companyId: company.id
	// 			}
	// 		}).then(function(pipes){
	// 			pipes.forEach(function(i){
	// 				pipeline.push(i);
	// 			})
	// 		}).then(function(){
	// 			return pipeline;
	// 		})
	// 	}
	// }
});
