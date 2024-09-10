const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', postController.post_index);
router.get('/sitemap.xml', postController.sitemap);
router.get('/:id', postController.post_details);

module.exports = router;
