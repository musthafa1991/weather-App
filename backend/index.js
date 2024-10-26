const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const weatherRoutes = require("./routes/weatherRoutes");

dotenv.config();

const PORT = process.env.PORT || 4001;

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("Weather App: Data fetching service is running.");
});

app.use("/api/weatherdata", weatherRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
