const express = require("express");
const connectDB = require("./config/db");
const dealRoutes = require("./routes/dealRoutes");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

// Connect to database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/deals", dealRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
