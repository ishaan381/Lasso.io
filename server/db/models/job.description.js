var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('job_description', {
  fields: {
    type: Sequelize.JSON,
    allowNull: false
  }
});


