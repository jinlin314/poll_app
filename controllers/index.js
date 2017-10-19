const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/polls', require('./polls'));
router.use('/pollOptions', require('./pollOptions'));
router.use('/users', require('./users'));


module.exports = router;
