'use strict';
var router = require('express').Router();
var Promise = require('bluebird');
module.exports = router;
let db = require('../../../db'),
check = require('../check-handler');

const Stage = db.model('stage');

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

router.post('/', check.pageAdmin, function(req, res, next){
  var stages = req.body.map(stage => Stage.create(stage));

  Promise.all(stages)
  .then(function(){//took stages out of here b/c the scope already had a stages variable
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
