const express = require('express');
const models = require('../models');
const router = express.Router();
const polls = models.Polls;
const pollOptions = models.PollOptions;
const poll_option_detail = models.poll_option_detail;

// since we define a many-to-many relationship for polls and pollOptions, we can
// include the pollOptions model with poll. By including the pollOption model,
// we not only getting the poll record back, we also get all the poll options associate
// with the poll back.
router.get('/', (req, res) => {
  polls.findAll({
    include: [ { model: pollOptions } ]
  })
  .then(polls => res.json(polls))
  .catch(console.error);
});

// if poll #1 has four options, by get('/polls/:1'), we get poll #1's info,
// as well as all its four options' info.
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
  let options = req.body.options; // req.body.option is a array of options id, e.g. [1,2,3]
  // to create a poll, we first create the poll's own record, which is its question
  polls.create({question: question})
  // then we got the tempPoll created, and we want to associate this poll with options
  // in the options table by calling the built-in sequelize method "addPollOptions",
  // the associations will be store in 'poll_option_detail' table
  // p.s.  if it is one-to-one(polls.belongsTo(pollOption)) OR
  // one-to-many(polls.belongsToMany(options)) associations,
  // you can set the relationship by "tempPoll.setPollOption(optionId)"
  // "addPollOptions" is for many-to-many relationship
  .then(tempPoll => tempPoll.addPollOptions(options))
  .then(createdPoll => {
    res.status(201).json({createdPoll});
  })
  .catch(console.error);
});

// this route is used to update the votes if someone make a vote for a poll
// and we assuming user can only select one option for each poll
router.put('/:id', (req, res) => {
  // if someone vote for poll (eg: PollId=1) with an option (eg: PollOptionId=3)
  // since the votes count is store in 'poll_option_detail' table, we need to fine the
  // poll_option_detail record whose PollID = 1 (req.params.id) & PollOptionId = 3 (req.body.optionId)
  poll_option_detail.findOne({
    where: {
      PollOptionId: req.body.optionId,
    }
  })
  // after we found the record, we want to increase the votes count for this record by 1
  // we achieve this by calling update() method
  .then(foundRecord => {
      foundRecord.update({
        votes: foundRecord.votes + 1
      });
  })
  .then(result => res.json(result))
  .catch(console.error);
});

// to delete a poll, we will also like to delete all its associated record
// in the join table, 'poll_option_detail', but this is already taken care
// in the poll's model's beforeDestroy hook (check the poll model out ).
// Thus, we only need to delete the poll, and sequelize will take care of
// the rest for us
router.delete('/:id', (req, res) => {
  polls.destroy({
    where: { id: req.params.id }
  })
  .then(deletedPoll => {
    res.status(204).json(deletedPoll);
  })
  .catch(console.error);
});


module.exports = router;
