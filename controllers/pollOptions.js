const express = require('express');
const models = require('../models');
const router = express.Router();
const pollOptions = models.PollOptions;
const polls = models.Polls;

router.get('/', (req, res) => {
  pollOptions.findAll()
  .then(pollOptions => res.json(pollOptions))
  .catch(console.error);
});

router.get('/:pollOptionId', (req, res) => {
  pollOptions.findById(req.params.pollOptionId)
  .then(pollOption => {
    res.json(pollOption);
  })
  .catch(console.error);
});

router.post('/', (req, res) => {
  let text = req.body.text;
  pollOptions.create({text: text})
  .then(createdPollOption => {
    res.json(createdPollOption);
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
