let Sequelize = require('sequelize'),
db = require('../_db');

module.exports = db.define('pipe_array', {
    stages: {
    	type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: []
    }
});