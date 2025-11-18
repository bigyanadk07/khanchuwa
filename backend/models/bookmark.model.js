const mongoose = require('mongoose');
const BookmarkSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  place_id: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref:'Place'}],
});
module.exports = mongoose.model('Bookmark', BookmarkSchema)