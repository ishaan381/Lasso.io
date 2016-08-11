var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('code', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },

  expired: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  companyName: {
    type: Sequelize.STRING
  }
})
