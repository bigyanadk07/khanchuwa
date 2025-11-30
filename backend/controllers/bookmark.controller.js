const Bookmark = require('../models/bookmark.model');

const addUserBookmark = async (req, res) => {
  const { user_id, place_id } = req.body;

  try {
    const existingBookmark = await Bookmark.findOne({ user_id });

    if (existingBookmark) {
      if (existingBookmark.place_id.includes(place_id)) {
        return res.status(400).json({ message: "Place already bookmarked." });
      }

      existingBookmark.place_id.push(place_id);
      await existingBookmark.save();

      return res.status(200).json({
        message: "Bookmark updated successfully.",
        user_id: existingBookmark.user_id,
        place_id: existingBookmark.place_id,
      });
    }

    const newBookmark = await Bookmark.create({
      user_id,
      place_id: [place_id],
    });

    return res.status(201).json({
      message: "Bookmark added successfully.",
      user_id: newBookmark.user_id,
      place_id: newBookmark.place_id,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteUserBookmark = async (req, res) => {
  const { user_id, place_id } = req.body;

  try {
    // Remove place_id from the array using $pull
    const updated = await Bookmark.findOneAndUpdate(
      { user_id },
      { $pull: { place_id: place_id } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Bookmark not found for this user." });
    }

    res.status(200).json({
      message: "Bookmark removed successfully.",
      user_id,
      place_id_removed: place_id,
      updated_bookmarks: updated.place_id,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserBookmark = async (req, res) => {
    const user_id = req.params.id;
    try{
        const bookmark = await Bookmark.find({user_id: user_id});
        if(!bookmark) throw new Error('User bookmark does not exists.');
        res.status(200).json({
            bookmark
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
};

module.exports = {
    getUserBookmark,
    deleteUserBookmark,
    addUserBookmark
}
