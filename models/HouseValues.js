const mongoose = require("mongoose");

const houseValuesSchema = new mongoose.Schema(
  {
    houseValues: {
      type: [Number],
      required: true,
    },
  },
  { collection: "house_values" }
);

module.exports = mongoose.model("HouseValues", houseValuesSchema);
