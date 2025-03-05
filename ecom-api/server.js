require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // ✅ ต้องมีแค่บรรทัดนี้เท่านั้น!

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ ฟังก์ชันเชื่อมต่อ MySQL
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ecommerce_db",
};

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL Database");

    // ✅ สร้างตารางผู้ใช้
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        country VARCHAR(50),
        password VARCHAR(255) NOT NULL
      )
    `);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}
connectDB();

// ✅ API สมัครสมาชิก
app.post("/auth/signup", async (req, res) => {
  console.log("📥 ข้อมูลที่ได้รับจาก Frontend:", req.body);

  const { full_name, email, phone, address, country, password } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (full_name, email, phone, address, country, password) VALUES (?, ?, ?, ?, ?, ?)",
      [full_name, email, phone, address, country, hashedPassword]
    );

    res.status(201).json({ message: "สมัครสมาชิกสำเร็จ!" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "สมัครสมาชิกไม่สำเร็จ" });
  }
});

// ✅ API ล็อกอิน
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    res.json({ message: "เข้าสู่ระบบสำเร็จ", user: { id: user.id, full_name: user.full_name, email: user.email } });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
});

// ✅ เปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
