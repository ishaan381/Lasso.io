var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('application', {
  application: {
    type: Sequelize.JSON,
    allowNull: false
  },
  rejected: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: false
  }
})
