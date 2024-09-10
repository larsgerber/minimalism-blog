const express = require('express');
const browserController = require('../controllers/browserController');

const router = express.Router();

router.get('*', browserController.index);

module.exports = router;
