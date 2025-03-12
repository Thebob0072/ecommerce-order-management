const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/orders";

// ✅ ฟังก์ชันดึงคำสั่งซื้อทั้งหมด
export const getOrders = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// ✅ ฟังก์ชันดึงคำสั่งซื้อเฉพาะ ID
export const getOrderById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

// ✅ ฟังก์ชันสร้างคำสั่งซื้อใหม่
export const createOrder = async (order: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};

// ✅ ฟังก์ชันอัปเดตสถานะคำสั่งซื้อ
export const updateOrderStatus = async (id: string, status: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// ✅ ฟังก์ชันลบคำสั่งซื้อ
export const deleteOrder = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
