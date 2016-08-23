'use strict';
var router = require('express').Router();
module.exports = router;
let db = require('../../../db'),
check = require('../check-handler');

const Feedback = db.model('feedback');

router.param('id', function(req, res, next, id){
  Feedback.findById(id)
  .then(function(feedback){
    req.requestedFeedback = feedback;
    next();
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  res.send(req.requestedFeedback)
})

router.get('/application/:appId', function (req, res, next) {
  Feedback.findAll({
    where: {
      applicationId: req.params.appId
    }
  })
  .then(function (feedbacks) {
    res.send(feedbacks);
  })
})


router.put('/:id', check.user, function(req, res, next) {
  req.requestedFeedback.update(req.body)
  .then(function(feedback){
    res.status(204);
    res.send(feedback);
  }).catch(next);
})
// To add check user check.user,
router.post('/', check.user, function(req, res, next) {
  Feedback.create(req.body)
  .then(function(feedback) {
    res.status(201)
    res.send(feedback)
  })
  .catch(next)
})

router.delete('/:id', function(req, res, next) {
  req.requestedfeedback.destroy()
  .then(function(){
    res.status(204).end()
  })
  .catch(next);
})
