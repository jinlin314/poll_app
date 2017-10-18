const express = require('express');
const models = require('../models');
const router = express.Router();
const polls = models.Polls;
const pollOptions = models.PollOptions;
const poll_option_detail = models.poll_option_detail;

// if you want to get the votes count for a poll #3 options #1
// you can call get('/poll_option_detail/?PollId=3&PollOptionId=1')
// information after '?' are the queries, which are stored in req.query
router.get('/', (req, res) => {
  poll_option_detail.findAll({
    where: req.query
  })
  .then(poll_detail => res.json(poll_detail))
  // the 'poll_detail' will look something like this: 
  // {
  //     "votes": 2,
  //     "createdAt": "2017-10-17T20:08:14.650Z",
  //     "updatedAt": "2017-10-18T03:40:26.797Z",
  //     "PollOptionId": 1,
  //     "PollId": 3
  // }
    // the
  .catch(console.error);
});

module.exports = router;
