const Place = require('../models/place.model')

const addPlace = async (req, res) => {
  const { user_id, latitude, longitude, name, phone, description } = req.body;
   try {
      const place = await Place.create({ user_id, location: { latitude, longitude }, name, phone, description });
      res.status(201).json({
        user_id: place.user_id,
        location: place.location,
        name: place.name, 
        phone: place.phone, 
        description: place.description
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const updatePlace = async (req, res) => {
  const { place_id } = req.params;  
  const { latitude, longitude, name, phone, description } = req.body;

  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      place_id,
      {
        ...(latitude && longitude && { location: { latitude, longitude } }),
        ...(name && { name }),
        ...(phone && { phone }),
        ...(description && { description })
      },
      { new: true } // return updated document
    );

    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found." });
    }

    res.status(200).json({
      user_id: updatedPlace.user_id,
      location: updatedPlace.location,
      name: updatedPlace.name,
      phone: updatedPlace.phone,
      description: updatedPlace.description
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//this api can be used to reward those user with high engagement
const getPlaceByUser = async (req, res) => {
  const { user_id } = req.params; 

  try {
    const places = await Place.find({ user_id });

    if (!places || places.length === 0) {
      return res.status(404).json({ message: "No places found for this user." });
    }

    res.status(200).json(places);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlace = async (req, res) => {
  const { place_id } = req.params;

  try {
    const place = await Place.findById(place_id);

    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }

    res.status(200).json(place);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPlace = async (req, res) => {
  try {
    const places = await Place.find();

    if (!places || places.length === 0) {
      return res.status(404).json({ message: "No places found." });
    }

    res.status(200).json(places);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    addPlace, updatePlace, getPlaceByUser, getPlace, getAllPlace
}




