const express = require("express");

const router = express.Router();

const { getHouseValues } = require("../controllers/houseValueController");

router.get("/", getHouseValues);

module.exports = router;
