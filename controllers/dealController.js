const Deal = require("../models/Deal");

// List all deals with pagination
const listDeals = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const deals = await Deal.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching deals", error });
  }
};

// Create a new deal
const createDeal = async (req, res) => {
  try {
    const deal = new Deal(req.body);
    await deal.save();

    res.status(201).json(deal);
  } catch (error) {
    res.status(500).json({ message: "Error creating deal", error });
  }
};

// Update an existing deal
const updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json(deal);
  } catch (error) {
    res.status(500).json({ message: "Error updating deal", error });
  }
};

// Delete a deal
const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json({ message: "Deal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting deal", error });
  }
};

// Search deals by name
const searchDeals = async (req, res) => {
  try {
    const deals = await Deal.find({ house: new RegExp(req.query.name, "i") });

    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: "Error searching deals", error });
  }
};

module.exports = {
  listDeals,
  createDeal,
  updateDeal,
  deleteDeal,
  searchDeals,
};
