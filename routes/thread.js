const express = require('express');
const router = express.Router();

const threadController = require('../controllers/thread');

router.get('/', threadController.getAll);

router.get('/:id', threadController.getSingle);

router.post('/', threadController.createThread);

router.get('/author/:authorName', threadController.getAuthorThreads);

router.put('/:id', threadController.updateThread);

router.delete('/:id', threadController.deleteThread);

module.exports = router;