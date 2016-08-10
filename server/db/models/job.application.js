var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('JobApplication', {
  fields: {
    type: Sequelize.JSON,
    allowNull: false
  }
})
