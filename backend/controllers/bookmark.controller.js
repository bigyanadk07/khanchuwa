const Bookmark = require('../models/bookmark.model');

const addUserBookmark = async (req, res) => {
  const { user_id, place_id } = req.body;
  try {
    const bookmark = await Bookmark.create({ user_id, place_id });
    res.status(201).json({
      user_id: bookmark.user_id,
      place_id: bookmark.place_id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserBookmark = async (req, res) => {
  const { user_id, place_id} = req.body;
  try {
    const bookmark = await Bookmark.findOne({ user_id });
    if (!bookmark) throw new Error('User bookmark does not exists.');
    bookmark.location.push(place_id)
    await bookmark.save();
    res.status(201).json({
        message: 'Bookmark updated successfully.', 
        user_id: bookmark.user_id,
        place_id: bookmark.place_id
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserBookmark = async (req, res) => {
    const {user_id} = req.params.id;
    try{
        const bookmark = await Bookmark.find({user_id});
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
    updateUserBookmark,
    addUserBookmark
}
