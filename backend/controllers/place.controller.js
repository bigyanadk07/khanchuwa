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


const updateRating = async (req, res) => {
  try {
    const { place_id, user_id, rating } = req.body;

    if (!place_id || !user_id || rating === undefined) {
      return res.status(400).json({ message: "place_id, user_id and rating are required." });
    }

    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: "Rating must be an integer between 1 and 5." });
    }

    const place = await Place.findById(place_id);
    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }


    const existingIndex = place.ratings.findIndex(r =>
      String(r.user_id) === String(user_id)
    );

    if (existingIndex > -1) {
      
      place.ratings[existingIndex].rating = numericRating;
    } else {
      
      place.ratings.push({ user_id, rating: numericRating });
    }

   
    const ratingCount = place.ratings.length;
    const totalRating = place.ratings.reduce((sum, r) => sum + Number(r.rating), 0);
    const avgRating = ratingCount === 0 ? 0 : totalRating / ratingCount;

    place.ratingCount = ratingCount;
    place.totalRating = totalRating;
    place.rating = avgRating;

    await place.save();

    res.status(200).json({
      message: "Rating updated successfully.",
      rating: place.rating,
      totalRating: place.totalRating,
      ratingCount: place.ratingCount,
      ratings: place.ratings 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addComment = async (req, res) => {
  try {
    const { place_id } = req.params;
    const { user_id, comment } = req.body;

    if (!user_id || !comment) {
      return res.status(400).json({ message: "user_id and comment are required." });
    }

    const place = await Place.findById(place_id);
    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }

    place.comment.push({ user_id, comment });
    await place.save();

    res.status(200).json({
      message: "Comment added successfully."
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateComment = async (req, res) => {
  try {
    const { place_id, comment_id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Updated comment text is required." });
    }

    const place = await Place.findById(place_id);
    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }

    const commentObj = place.comment.id(comment_id);
    if (!commentObj) {
      return res.status(404).json({ message: "Comment not found." });
    }

    commentObj.comment = comment;

    await place.save();

    res.status(200).json({
      message: "Comment updated successfully.",
      comments: place.comment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteComment = async (req, res) => {
  try {
    const { place_id, comment_id } = req.params;

    const place = await Place.findById(place_id);
    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }

    const commentObj = place.comment.id(comment_id);
    if (!commentObj) {
      return res.status(404).json({ message: "Comment not found." });
    }

    commentObj.deleteOne();

    await place.save();

    res.status(200).json({
      message: "Comment deleted successfully.",
      comments: place.comment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllComment = async (req, res) => {
  try {
    const { place_id } = req.params;

    const place = await Place.findById(place_id);
    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }

    res.status(200).json(place.comment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  addPlace,
  updatePlace,
  getPlaceByUser,
  getPlace,
  getAllPlace,
  updateRating,
  addComment,
  updateComment,
  deleteComment,
  getAllComment
};





