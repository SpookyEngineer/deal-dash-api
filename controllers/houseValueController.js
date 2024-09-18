const HouseValues = require("../models/HouseValues");

const getHouseValues = async (req, res) => {
  try {
    const houseValuesData = await HouseValues.findOne();

    if (!houseValuesData) {
      return res.status(404).json({ message: "No house values found" });
    }

    res.status(200).json({ houseValues: houseValuesData.houseValues });
  } catch (err) {
    console.error("Error fetching house values:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getHouseValues };
