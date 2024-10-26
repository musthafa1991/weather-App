const express = require("express");
const {
  weatherFromDb,
  weatherFromApi,
} = require("../controllers/weatherController");

const router = express.Router();

router.route("/").get(weatherFromDb);
router.route("/").post(weatherFromApi);

module.exports = router;
