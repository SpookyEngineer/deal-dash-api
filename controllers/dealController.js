const Deal = require("../models/Deal");

// List all deals with pagination
const listDeals = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 6; // Number of deals per page
    const searchInput = req.query.searchInput || "";

    // Ensure page and limit are positive numbers
    if (page < 1) {
      return res
        .status(400)
        .json({ message: "Page must be a positive number" });
    }

    console.log(
      `Trying to get deals on page: ${page} with limit: ${limit} and searchInput: ${searchInput}`
    );

    // Get the total number of deals for pagination metadata
    const totalDeals = await Deal.countDocuments({
      house: { $regex: searchInput, $options: "i" }, // Case-insensitive search
    });
    const totalPages = Math.ceil(totalDeals / limit);

    // Fetch the deals with pagination, sorting, and filtering by house name
    const deals = await Deal.find({
      house: { $regex: searchInput, $options: "i" }, // Case-insensitive search
    })
      .sort({ createdDate: -1 }) // Sort by createdDate, -1 for descending order
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalDeals,
      deals,
    });

    console.log(`Got deals on page: ${page}`);
  } catch (error) {
    res.status(500).json({ message: "Error fetching deals", error });
  }
};

// Create a new deal
const createDeal = async (req, res) => {
  try {
    console.log("Trying to create new deal");

    const deal = new Deal(req.body);
    await deal.save();

    res.status(201).json(deal);

    console.log(`Deal created with id: ${deal.id}`);
  } catch (error) {
    res.status(500).json({ message: "Error creating deal", error });
  }
};

// Update an existing deal
const updateDeal = async (req, res) => {
  try {
    const dealId = req.params.id;

    console.log(`Trying to update existing deal with id: ${dealId}`);

    const deal = await Deal.findByIdAndUpdate(dealId, req.body, {
      new: true,
    });

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json(deal);

    console.log("Deal updated");
  } catch (error) {
    res.status(500).json({ message: "Error updating deal", error });
  }
};

// Delete a deal
const deleteDeal = async (req, res) => {
  try {
    const dealId = req.params.id;

    console.log(`Trying to delete deal with id: ${dealId}`);

    const deal = await Deal.findByIdAndDelete(dealId);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    const message = `Deal deleted: ${dealId}`;

    res.status(200).json({ message: message });

    console.log(message);
  } catch (error) {
    res.status(500).json({ message: "Error deleting deal", error });
  }
};

// Search deals by name
const searchDeals = async (req, res) => {
  try {
    const deals = await Deal.find({ house: new RegExp(req.query.name, "i") });

    res.status(200).json(deals);

    console.log(`Deal found: ${deals}`);
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
