const mongoose = require('mongoose');
const BookmarkSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  location: [{ latitude: { type: Number, required: true }, longitude: { type: Number, required: true } }],
});
module.exports = mongoose.model('Bookmark', BookmarkSchema)