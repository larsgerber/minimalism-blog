"use strict";

const express = require('express');
const browserController = require('../controllers/browserController');

const router = express.Router();

router.use(browserController.index);

module.exports = router;
