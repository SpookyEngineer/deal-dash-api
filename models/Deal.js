const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    house: { type: String, required: true },
    grade: { type: Number, default: 0 },
    description: String,
    soldOut: { type: Boolean, required: true },
    createdDate: { type: String, required: true },
  },
  { collection: "deals" }
);

module.exports = mongoose.model("Deal", dealSchema);
