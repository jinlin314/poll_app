const express = require('express')
const models = require('../models')
const router = express.Router()
const polls = models.Polls
const pollOptions = models.PollOptions
const poll_option_detail = models.Poll_option_detail
const users = models.Users
const { mustBeLoggedIn } = require('./utils')

// since we define a many-to-many relationship for polls and pollOptions, and one to one relationship
// for polls and users, we can include the pollOptions and users models with a poll. By including the
// pollOption and users modesl, we not only getting the poll record back, we also get all the poll options associate
// with the poll back, as well as its owner.
router.get('/', (req, res) => {
  polls.findAll({
    include: [ { model: pollOptions }, {model: users} ]
  })
  .then(polls => res.json(polls))
  .catch(console.error)
})

// if poll #1 has four options, by get('/polls/:1'), we get poll #1's info,
// as well as all its four options' info.
router.get('/:pollId', (req, res) => {
  polls.findOne({
    where: {id: req.params.pollId},
    include: [ { model: pollOptions } ]
  })
  .then(poll => {
    res.json(poll)
  })
  .catch(console.error)
})

router.post('/', (req, res, next) => {
  // if an user is loggedIn, user object will be stored in req.user, we can check if an user is logged in
  // by checking req.user === null, if no user is logged in, we then throw an error, 'must be loggedIn'
  mustBeLoggedIn(req, res, next)

  let question = req.body.question
  let options = req.body.options // req.body.option is a array of options id, e.g. [1,2,3]
  // to create a poll, we first create the poll's own record, which is its question
  polls.create({question: question})
  // then we got the tempPoll created, and we want to associate this poll with options
  // in the options table by calling the built-in sequelize method "addPollOptions",
  // the associations will be store in 'poll_option_detail' table
  .then(tempPoll => {
    tempPoll.addPollOptions(options)
    // poll belongs to one owner(user), we use built-in setUser method to set the association
    // the UserId will then be stored in Polls table as an extra column
    return tempPoll.setUser(1)
  })
  .then(createdPoll => {
    res.status(201).json({createdPoll});
  })
  .catch(console.error);
})

// this route is used to update the votes if someone make a vote for a poll
// and we assuming user can only select one option for each poll
router.put('/:id', (req, res, next) => {
  mustBeLoggedIn(req, res, next)

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
    return foundRecord.update({ votes: foundRecord.votes + 1 })
  })
  .then(updatedRecord => {
    // use and poll_option_detail is many-to-many relationship, so we use built-in method addUser method
    // to record who voted this option for this poll. this record is store in the join table, 'user-choice'
    return updatedRecord.addUser([req.user])
  })
  .then(result => res.status(201).json(result))
  .catch(console.error);
})

// to delete a poll, we will also like to delete all its associated record
// in the join table, 'poll_option_detail', but this is already taken care
// in the poll's model's beforeDestroy hook (check the poll model out ).
// Thus, we only need to delete the poll, and sequelize will take care of
// the rest for us
router.delete('/:id', (req, res, next) => {
  mustBeLoggedIn(req, res, next)

  polls.findOne({
    where: { id: req.params.id },
    include: [ {model: users} ]
  })
    .then(foundPoll => {
      // you can only delete the polls you created, thus, we compare the foundPoll's UserId with
      // loggedIn user's id, if you are the owner, you can't delete the poll
      if(foundPoll.UserId !== req.user.id) {
        const err = new Error(`You do not have authorization to delete this poll.`)
        err.status = 403
        throw err
      } else {
        return polls.destroy({
          where: { id: req.params.id }
        })
      }
    })
  .then(deletedPoll => {
    res.status(204).json(deletedPoll);
  })
  .catch(console.error);
})

module.exports = router
