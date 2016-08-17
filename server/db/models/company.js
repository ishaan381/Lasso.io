'use strict';
let Sequelize = require('sequelize'),
User = require('./user'),
Stage = require('./stage'),
db = require('../_db');

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
});
