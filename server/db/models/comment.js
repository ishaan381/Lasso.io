var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('comment', {
  title: {
  	type: Sequelize.STRING,
  	allowNull: false
  },

  content: {
  	type: Sequelize.TEXT,
  	allowNull: false
  },

  date: {
  	type: Sequelize.DATE
  }
})