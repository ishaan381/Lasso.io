const Sequelize = require('sequelize')
const db = require('../_db')

module.exports = db.define('job', {
  published: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});



