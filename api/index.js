const express = require("express");
const connectDB = require("../config/db");

const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const dealRoutes = require("../routes/dealRoutes");
const houseValuesRoutes = require("../routes/houseValuesRoues");

dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(express.json()); // Parse JSON requests

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: false,
  })
); // CORS enabled without authentication since not meant for production

// Routes
app.get("/", (req, res) =>
  res.send("Betpass assessment backend online and running")
);
app.use("/deals", dealRoutes);
app.use("/houseValues", houseValuesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
