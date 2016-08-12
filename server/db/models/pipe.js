let Sequelize = require('sequelize'),
PipeArray = require('./pipe.array'),
db = require('../_db');

module.exports = db.define('pipe', {
    title: {
        type: Sequelize.STRING
    },
    index: {
    	type: Sequelize.INTEGER,
    	isUnique: true
    }

}, {
	hooks: {
		afterCreate: function(pipe){ //janky as shit would like to review -Jonthan
			PipeArray.findOne({
				where: {
					id: pipe.pipeArrayId
				}
			}).then(function(array){
				array.stages.push(pipe);
				pipe.index = array.stages.indexOf(pipe);
			})
		}
	}
});