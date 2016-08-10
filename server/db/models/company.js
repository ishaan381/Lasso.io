'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');
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
});