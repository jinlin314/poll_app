const express = require('express');
const models = require('../models');
const router = express.Router();
const polls = models.Polls;
const pollOptions = models.PollOptions;
const poll_option_detail = models.Poll_option_detail;

// if you want to get the votes count for each option of a poll (eg: poll #3 who has two options)
// you can call get('/poll_option_detail/?PollId=3'), information after '?' are the queries, which are stored in req.query
// The 'poll_detail' will look something like below:
// [
// {
//   "id": 9,
//   "votes": 0,
//   "createdAt": "2017-10-18T16:04:57.170Z",
//   "updatedAt": "2017-10-18T16:04:57.170Z",
//   "PollOptionId": 1,
//   "PollId": 3
// },
// {
//   "id": 10,
//   "votes": 0,
//   "createdAt": "2017-10-18T16:04:57.170Z",
//   "updatedAt": "2017-10-18T16:04:57.170Z",
//   "PollOptionId": 2,
//   "PollId": 3
// }
// ]
// if you only want to get the votes for a specific pollOption of a poll, eg: poll #3, option #1
// you can call get('/poll_option_detail/?PollId=3&PollOptionId=1')
// the 'poll_detail' will look something like this:
// [
//   {
//     "id": 9,
//     "votes": 0,
//     "createdAt": "2017-10-18T16:04:57.170Z",
//     "updatedAt": "2017-10-18T16:04:57.170Z",
//     "PollOptionId": 1,
//     "PollId": 3
//   }
// ]
router.get('/', (req, res) => {
  poll_option_detail.findAll({
    where: req.query
  })
  .then(poll_detail => res.json(poll_detail))
  .catch(console.error);
});

module.exports = router;
