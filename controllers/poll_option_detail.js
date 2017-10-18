const express = require('express');
const models = require('../models');
const router = express.Router();
const polls = models.Polls;
const pollOptions = models.PollOptions;
const poll_option_detail = models.poll_option_detail;

router.get('/', (req, res) => {
  console.log("req.query", req.query)
  poll_option_detail.findAll({
    where: req.query
  })
  .then(poll_detail => res.json(poll_detail))
  .catch(console.error);
});

module.exports = router;
