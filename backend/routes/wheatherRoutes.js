const express = require("express");
const {
  wheatherFromDb,
  wheatherFromApi,
} = require("../controllers/wheatherController");

const router = express.Router();

router.route("/").get(wheatherFromDb);
router.route("/").post(wheatherFromApi);

module.exports = router;
