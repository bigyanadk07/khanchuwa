const mongoose = require('mongoose');
const PlaceSchema = new mongoose.Schema({
      user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
      location: { latitude: { type: Number, required: true }, longitude: { type: Number, required: true } },
      name: {type: String, required: true},
      phone: {type: String, required: true},
      description: {type: String, required: true}
})
module.exports = mongoose.model('Place', PlaceSchema)