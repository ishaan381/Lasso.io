'use strict';
let Sequelize = require('sequelize'),
User = require('./user'),
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
    }//possibly make an employee association
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
	}
});