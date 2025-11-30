const express = require('express');
const router = express.Router();
const { getUserBookmark, deleteUserBookmark, addUserBookmark } = require('../controllers/bookmark.controller')
router.post('/add', addUserBookmark);
router.delete('/delete', deleteUserBookmark);
router.get('/:id', getUserBookmark)
module.exports = router
