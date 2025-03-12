require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const signupRoute = require("./signup");
const signinRoute = require("./signin");
const ordersRoutes = require("./routes/orders");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ เรียกใช้ API Routes
app.use("/auth", signupRoute);
app.use("/auth", signinRoute);


app.use("/orders", ordersRoutes);

// ✅ เปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
