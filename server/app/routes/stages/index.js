'use strict';
var router = require('express').Router();
module.exports = router;

let Stage = require('../../../db/models/stage'),
User = require('../../../db/models/user'),
Comment = require('../../../db/models/comment'),
check = require('../check-handler');

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

router.get('/:id', function(req, res, next){
  req.requestedStage.reload()
  .then(function(stage){
    res.send(stage);
  })
  .catch(next);
});

router.post('/', check.pageAdmin, function(req, res, next){
  Stage.create(req.body)
  .then(function(stage){
    res.status(201);
    res.send(stage);
  })
  .catch(next)
});

router.put('/:id', function(req, res, next){
  req.resquestedStage.update(req.body)
  .then(function(stage){
    res.status(204);
    res.send(stage)
  }).catch(next);
})

router.delete('/:id', function(req, res, next){
  req.resquestedStage.destroy()
  .then(function(){
    res.status(204).end()
  }).catch(next);
})
