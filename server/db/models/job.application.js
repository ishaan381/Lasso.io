var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('job_application', {
  fields: {
    type: Sequelize.JSON,
    allowNull: false
  }
})
