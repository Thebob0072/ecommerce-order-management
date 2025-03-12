const express = require("express");
const bcrypt = require("bcrypt");
const supabase = require("./supabaseClient");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { full_name, email, phone, address, country, password } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    // 🔹 เช็คว่ามี Email นี้แล้วหรือยัง
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
    }

    // 🔹 เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 บันทึกข้อมูลลง Supabase
    const { data, error } = await supabase.from("users").insert([
      { full_name, email, phone, address, country, password: hashedPassword },
    ]);

    if (error) throw error;

    res.status(201).json({ message: "สมัครสมาชิกสำเร็จ!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "สมัครสมาชิกไม่สำเร็จ" });
  }
});

module.exports = router;
