const express = require('express')
const models = require('../models')
const router = express.Router()
var Sequelize = require('sequelize')
const Op = Sequelize.Op
const pollOptions = models.PollOptions
const { mustBeLoggedIn } = require('./utils')

router.get('/', (req, res) => {
  pollOptions.findAll()
  .then(pollOptions => res.json(pollOptions))
  .catch(console.error)
})

// returns 8 most common options, so users do not need to created more same/similar options
router.get('/most_common', (req, res) => {
  pollOptions.findAll({
    where: {id: {[Op.lte]: 8}} // sequelize comparator: id <= 8
  })
    .then(pollOptions => res.json(pollOptions))
    .catch(console.error)
})

router.get('/:pollOptionId', (req, res) => {
  pollOptions.findById(req.params.pollOptionId)
  .then(pollOption => {
    res.json(pollOption)
  })
  .catch(console.error)
})

// only logged user can created poll option
// user can add customized options
router.post('/', (req, res, next) => {
  mustBeLoggedIn(req, res, next)

  let text = req.body.text;
  pollOptions.create({text: text})
  .then(createdPollOption => {
    res.json(createdPollOption);
  })
  .catch(console.error);
});

// === below methods not yet defined === //

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
