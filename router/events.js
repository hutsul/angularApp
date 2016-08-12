var express = require('express');
var router = express.Router();

module.exports = function(app){
  var handler = require('../handlers/event')(app);

  router.post('/addEvent', app.isAdmin, handler.create);
  router.get('/:id', handler.getEvent);
  router.get('/', handler.getAll);
  router.put('/', app.isAdmin, handler.updateEventById);

  return router;
};

