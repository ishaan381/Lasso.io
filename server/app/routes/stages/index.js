'use strict';
var router = require('express').Router();
var Promise = require('bluebird');
module.exports = router;
let db = require('../../../db'),
check = require('../check-handler');

const Stage = db.model('stage'),
App = db.model('application');

router.param('id', function(req, res, next, id){
  Stage.findOne({
    where: {
      id: id
    }
  })
  .then(function(stage){
    req.requestedStage = stage;
    next();
  })
  .catch(next);
});

router.get('/:id', function(req, res){
  res.send(req.requestedStage);
});

router.get('/:id/numCandidates', function(req, res, next){
  App.count({
    where: {
      stageId: req.params.id
    }
  })
  .then(function(count){
    res.json(count);
  })
  .catch(next);
})

router.get('/:id/candidates', function(req, res, next){
  req.requestedStage.getApplication()
  .then(applications => {
    res.send(applications.map(app => {
      app.application = JSON.parse(app.application);
      return app;
    })
    )})
  .catch(next);
});

router.get('/:jobId/first', function(req, res, next) {
  Stage.findOne({
    where: {
      jobId: +req.params.jobId,
      index: 0
    }
  })
  .then(function(stage) {
    res.send({stageId: stage.id})
  })
  .catch(next)
})

router.post('/', function(req, res, next){

  Promise.each(req.body, function(stage) {
    Stage.create(stage)
  })
  .then(function(stages){//took stages out of here b/c the scope already had a stages variable
    res.status(201);
    res.send(stages);
  })
  .catch(next)
});

router.put('/:id', function(req, res, next){
  req.requestedStage.update(req.body)
  .then(function(stage){
    res.status(204);
    res.send(stage)
  }).catch(next);
})

router.delete('/:id', function(req, res, next){
  req.requestedStage.destroy()
  .then(function(){
    res.status(204).end()
  }).catch(next);
})
