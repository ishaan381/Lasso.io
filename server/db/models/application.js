var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('application', {
  fields: {
    type: Sequelize.JSON,
    allowNull: false
  },
  rejected: {
  	type: Sequelize.BOOL,
  	defaultValue: false
  }
})