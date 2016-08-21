var Sequelize = require('sequelize');
var db = require('../_db');
var user = require('./user');


module.exports = db.define('comment', {

  content: {
  	type: Sequelize.TEXT,
  	allowNull: false
  },

  date: {
  	type: Sequelize.DATE,
    defaultValue: (new Date())
  },

  stageId: {
    type: Sequelize.INTEGER
  },

  author: {
    type: Sequelize.STRING
  }
},
{
  hooks: {
    afterValidate: function (comment) {
      var user = require('./user');
      var id = comment.userId;
      return user.findById(id)
      .then(function(author) {
        comment.author = author.fullName
      })
    }
  }
}
)
