const express = require('express');
const router = express.Router();
const { getUserBookmark, updateUserBookmark, addUserBookmark } = require('../controllers/bookmark.controller')
router.post('/add', addUserBookmark);
router.put('/update', updateUserBookmark);
router.get('/:id', getUserBookmark)
module.exports = router
