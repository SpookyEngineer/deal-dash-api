const express = require("express");
const connectDB = require("./config/db");

const app = express();
const dotenv = require("dotenv");

const dealRoutes = require("./routes/dealRoutes");
const houseValuesRoutes = require("./routes/houseValuesRoues");

dotenv.config();

// Connect to database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/deals", dealRoutes);
app.use("/houseValues", houseValuesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
