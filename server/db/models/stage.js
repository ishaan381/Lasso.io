let Sequelize = require('sequelize'),
    db = require('../_db');

module.exports = db.define('stage', {
    index: {
        type: Sequelize.INTEGER
      },
    info: Sequelize.JSON
});
