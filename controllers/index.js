const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));
router.use('/polls', require('./polls'));
router.use('/pollOptions', require('./pollOptions'));


module.exports = router;
