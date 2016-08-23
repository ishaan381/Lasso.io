var Sequelize = require('sequelize');
var db = require('../_db');


module.exports = db.define('feedback', {
  answers: {
    type: Sequelize.JSON,
    // allowNull: false
  },

  questions: {
    type: Sequelize.JSON
  },

  interviewer: {
    type: Sequelize.STRING
  }

}, {
  hooks: {
    afterValidate: function (feedback) {
      var Stage = require('./stage');
      var User = require('./user');
      return Stage.findById(feedback.stageId)
      .then(function(stage) {
        feedback.questions = stage.panels.filter(_stage => _stage.panelQuestions).map(stage_ => stage_.panelQuestions)[0];
        return User.findById(feedback.userId)
      })
      .then(function(user) {
        console.log("FINDING USER",user)
        feedback.interviewer = user.fullName;
      });
    }
  }
})
