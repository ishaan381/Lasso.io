var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('code', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
