const express = require("express");

const router = express.Router();

const {
  listDeals,
  createDeal,
  updateDeal,
  deleteDeal,
  searchDeals,
} = require("../controllers/dealController");

router.get("/", listDeals);
router.post("/", createDeal);
router.put("/:id", updateDeal);
router.delete("/:id", deleteDeal);
router.get("/search", searchDeals);

module.exports = router;
