//const express = require('express');
const db = require('./db');
const workRouter = require('express').Router({ mergeParams: true });
//const workRouter = express.Router().Router({mergeParams: true});
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

workRouter.param('workId', (req, res, next, id) => {
    const workObj = db.getFromDatabaseById('work', id);
    if (workObj) {
        req.workObj = workObj;
        next();
    } else {
        res.status(404).send();
    }
})

workRouter.get('/', (req, res, next) => {
    const minionWork = db.getAllFromDatabase('work').filter(
        workElm => workElm.minionId === req.minionObj.id);
    res.send(minionWork);
});

workRouter.put('/:workId', (req, res, next) => {
    if (req.body.minionId === req.minionObj.id) {
        const workObj = db.updateInstanceInDatabase('work', req.body);
        res.send(workObj);
    } else {
        res.status(400).send();
    }
});

workRouter.delete('/:workId', (req, res, next) => {
    db.deleteFromDatabasebyId('work', req.workObj.id);
    res.status(204).send();
});

workRouter.post('/', (req, res, next) => {
    const workObj = db.addToDatabase('work', req.workObj);
    res.status(201).send(workObj);
});

module.exports = workRouter;