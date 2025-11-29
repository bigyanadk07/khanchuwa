const express = require('express');
const router = express.Router();

const {
  upload,
  addPlace,
  updatePlace,
  getPlaceByUser,
  getPlace,
  getAllPlace,
  updateRating,
  addComment,
  updateComment,
  deleteComment,
  getAllComment,
} = require('../controllers/place.controller');

router.post('/add', upload, addPlace);
router.put('/update/:place_id', upload, updatePlace);
router.get('/user', getPlaceByUser);
router.get('/:place_id', getPlace);
router.get('/', getAllPlace);

router.post('/update/rating', updateRating);

router.post('/comment/:place_id', addComment);
router.put('/comment/:place_id/:comment_id', updateComment);
router.delete('/comment/:place_id/:comment_id', deleteComment);
router.get('/comment/:place_id', getAllComment);

module.exports = router;
