const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const wheatherRoutes = require("./routes/wheatherRoutes");

const PORT = process.env.PORT || 4001;

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send(" yes wheather app data fetching");
});

app.use("/api/wheatherdata", wheatherRoutes);
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
