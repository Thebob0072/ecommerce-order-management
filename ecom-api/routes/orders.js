const express = require("express");
const router = express.Router();
const supabase = require("../utils/supabaseClient");

// ✅ ดึงรายการคำสั่งซื้อทั้งหมด
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ ดึงข้อมูลคำสั่งซื้อโดย ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ สร้างคำสั่งซื้อใหม่
router.post("/", async (req, res) => {
  const { customer_name, customer_email, total_amount } = req.body;
  const { data, error } = await supabase.from("orders").insert([{ customer_name, customer_email, total_amount }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ อัปเดตสถานะคำสั่งซื้อ
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { data, error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ ลบคำสั่งซื้อ
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("orders").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "คำสั่งซื้อลบเรียบร้อย" });
});

module.exports = router;
