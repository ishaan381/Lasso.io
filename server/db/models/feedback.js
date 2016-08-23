var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('feedback', {
  answers: {
    type: Sequelize.JSON,
    // allowNull: false
  },

  questions: {
    type: Sequelize.JSON
  }
}, {
  hooks: {
    afterValidate: function (feedback) {
      var Stage = require('./stage');
      return Stage.findById(feedback.stageId)
      .then(function(stage) {
        feedback.questions = stage.panels.filter(_stage => _stage.panelQuestions).map(stage_ => stage_.panelQuestions)[0]
      })
    }
  }
})
