const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));
router.use('/polls', require('./polls'));
router.use('/pollOptions', require('./pollOptions'));
router.use('/poll_option_detail', require('./poll_option_detail'));


module.exports = router;
