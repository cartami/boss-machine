const express = require('express');
const db = require('./db');
const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, id) => {
  const minionObj = db.getFromDatabaseById('minions', id);
  if (minionObj) {
    req.minionObj = minionObj;
    next();
  } else {
    res.sendStatus(404).send();
  }
})

minionsRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minionObj);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  const minionObj = db.updateInstanceInDatabase('minions', req.body);
  res.send(minionObj);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  db.deleteFromDatabasebyId('minions', req.minionObj.id);
  res.status(204).send();
});

minionsRouter.post('/', (req, res, next) => {
  const newMinion = db.addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

const workRouter = require('./work');
minionsRouter.use('/:minionId/work', workRouter);

module.exports = minionsRouter;