const mongoose = require('mongoose');
const PlaceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  location: { latitude: { type: Number, required: true }, longitude: { type: Number, required: true } },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  ratings: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      rating: { type: Number, required: true }
    },
  ],
  rating: { type: Number, default: 0 }, 
  totalRating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  comment: [
    {
      user_id: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: { type: String, required: true },
    },
  ],
});
module.exports = mongoose.model('Place', PlaceSchema);
