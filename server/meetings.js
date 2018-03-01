const express = require('express');
const db = require('./db');
const meetingsRouter = express.Router();


meetingsRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('meetings'));
});

meetingsRouter.delete('/', (req, res, next) => {
  db.deleteAllFromDatabase('meetings');
  res.status(204).send();
});

meetingsRouter.post('/',(req, res, next) => {
  const newMeeting = db.addToDatabase('meetings', db.createMeeting());
  res.status(201).send(newMeeting);
});

module.exports = meetingsRouter;