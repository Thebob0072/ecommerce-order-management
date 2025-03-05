import express, { json } from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(json());

const users = []; // จำลองฐานข้อมูล

app.post("/auth/signup", (req, res) => {
  const { email, password, full_name, phone, address, country } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "กรุณากรอกอีเมลและรหัสผ่าน" });
  }

  // ตรวจสอบว่ามีบัญชีอยู่แล้วหรือไม่
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
  }

  // เพิ่มบัญชีใหม่
  users.push({ email, password, full_name, phone, address, country });
  res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
