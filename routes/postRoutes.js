const express = require('express');
const postController = require('../controllers/postController');
const fetch = require("node-fetch");

const router = express.Router();

router.get('/', postController.post_index);
router.get('/:id', postController.post_details);

module.exports = router;