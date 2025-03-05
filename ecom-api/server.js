require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ เชื่อมต่อ MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// ✅ สร้างตารางผู้ใช้ (ถ้ายังไม่มี)
db.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    country VARCHAR(50),
    password VARCHAR(255) NOT NULL
  )`,
  (err) => {
    if (err) console.error("❌ Error creating table:", err);
  }
);

// ✅ API สมัครสมาชิก
app.post("/auth/signup", (req, res) => {
  const { full_name, email, phone, address, country, password } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  // ตรวจสอบว่าอีเมลถูกใช้ไปแล้วหรือไม่
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });

    if (result.length > 0) {
      return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
    }

    // เพิ่มผู้ใช้ใหม่
    db.query(
      "INSERT INTO users (full_name, email, phone, address, country, password) VALUES (?, ?, ?, ?, ?, ?)",
      [full_name, email, phone, address, country, password],
      (err, result) => {
        if (err) return res.status(500).json({ message: "สมัครสมาชิกไม่สำเร็จ" });

        res.status(201).json({ message: "สมัครสมาชิกสำเร็จ!" });
      }
    );
  });
});

// ✅ API ดึงรายชื่อผู้ใช้
app.get("/users", (req, res) => {
  db.query("SELECT id, full_name, email, phone, address, country FROM users", (err, result) => {
    if (err) return res.status(500).json({ message: "เกิดข้อผิดพลาด" });

    res.json(result);
  });
});

// ✅ API ล็อกอิน
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "เกิดข้อผิดพลาด" });

    if (result.length === 0) {
      return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    res.json({ message: "เข้าสู่ระบบสำเร็จ", user: result[0] });
  });
});

// ✅ เปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
