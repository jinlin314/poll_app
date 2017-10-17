const express = require('express');
const models = require('../models');
const router = express.Router();
const polls = models.Polls;
const pollOptions = models.PollOptions;

router.get('/', (req, res) => {
  polls.findAll({
    include: [ { model: pollOptions } ]
  })
  .then(polls => res.json(polls))
  .catch(console.error);
});

router.get('/:pollId', (req, res) => {
  polls.findOne({
    where: {id: req.params.pollId},
    include: [ { model: pollOptions } ]
  })
  .then(poll => {
    res.json(poll);
  })
  .catch(console.error);
});

router.post('/', (req, res) => {
  let question = req.body.question;
  let options = req.body.o
  ptions; // array [1,2,3]
  polls.create({question: question})
  .then(poll => poll.setPollOptions(options))
  .then(createdPoll => {
    res.json({
      msg: "Successful POST to '/polls' route"
    });
  })
  .catch(console.error);
});

router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/' route",
    id: req.params.id
  });
});


module.exports = router;
