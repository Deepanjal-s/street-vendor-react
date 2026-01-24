const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/vendors", require("./routes/vendorRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/menus", require("./routes/menuRoutes"));
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);
