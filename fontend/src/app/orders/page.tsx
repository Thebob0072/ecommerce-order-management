"use client";
import { useEffect, useState } from "react";
import { getOrders, deleteOrder, updateOrderStatus } from "@/utils/api";
import { Button } from "@heroui/react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("ยืนยันการลบคำสั่งซื้อนี้?")) {
      await deleteOrder(id);
      fetchOrders();
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">คำสั่งซื้อ</h1>
      {loading ? (
        <p>กำลังโหลด...</p>
      ) : (
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ชื่อลูกค้า</th>
              <th className="p-2">อีเมล</th>
              <th className="p-2">สถานะ</th>
              <th className="p-2">ราคารวม</th>
              <th className="p-2">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.customer_name}</td>
                <td className="p-2">{order.customer_email}</td>
                <td className="p-2">
                  <select value={order.status} onChange={(e) => handleUpdateStatus(order.id, e.target.value)}>
                    <option value="pending">รอดำเนินการ</option>
                    <option value="processing">กำลังดำเนินการ</option>
                    <option value="shipped">จัดส่งแล้ว</option>
                    <option value="delivered">ส่งสำเร็จ</option>
                    <option value="canceled">ยกเลิก</option>
                  </select>
                </td>
                <td className="p-2">฿{order.total_amount}</td>
                <td className="p-2">
                  <Button className="bg-red-500 text-white" onClick={() => handleDelete(order.id)}>
                    ลบ
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
