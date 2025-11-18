const express = require("express");
const router = express.Router();

const {
  addPlace,
  updatePlace,
  getPlaceByUser,
  getPlace,
  getAllPlace
} = require("../controllers/place.controller");

router.post("/add", addPlace);
router.put("/update/:place_id", updatePlace);
router.get("/user/:user_id", getPlaceByUser);
router.get("/:place_id", getPlace);
router.get("/", getAllPlace);

module.exports = router;
