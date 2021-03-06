let Sequelize = require('sequelize'),
db = require('../_db');

module.exports = db.define('stage', {
    index: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    panels: {
        type: Sequelize.JSON
    },
    type: {
      type: Sequelize.STRING
    }
});
