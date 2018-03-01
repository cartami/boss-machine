const express = require('express');
const db = require('./db');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const ideaObj = db.getFromDatabaseById('ideas', id);
  if (ideaObj) {
    req.ideaObj = ideaObj;
    next();
  } else {
    res.status(404).send();
  }
})

ideasRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.ideaObj);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
  const ideaObj = db.updateInstanceInDatabase('ideas', req.body);
  res.send(ideaObj);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  db.deleteFromDatabasebyId('ideas', req.ideaObj.id);
  res.status(204).send();
});

ideasRouter.post('/', checkMillionDollarIdea,(req, res, next) => {
  const newMinion = db.addToDatabase('ideas', req.body);
  res.status(201).send(newMinion);
});

module.exports = ideasRouter;