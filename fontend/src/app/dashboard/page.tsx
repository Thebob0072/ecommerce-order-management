"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaShoppingCart, FaWarehouse, FaRegChartBar, FaBox, FaDollarSign } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [user, setUser] = useState<any>(null);

  // ✅ เช็คว่าผู้ใช้ล็อกอินอยู่หรือไม่ (ใช้ localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/signin"); // ถ้าไม่มี session ให้กลับไปที่หน้า Login
    } else {
      console.log("✅ ดึงข้อมูลจาก LocalStorage:", storedUser);
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  // ✅ ตั้งค่าทักทายตามช่วงเวลา
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("สวัสดีตอนเช้า ☀️");
    } else if (hour < 18) {
      setGreeting("สวัสดีตอนบ่าย 🌤");
    } else {
      setGreeting("สวัสดีตอนเย็น 🌙");
    }
  }, []);

  // ✅ ฟังก์ชันออกจากระบบ
  const handleSignOut = () => {
    localStorage.removeItem("user"); // ❌ ลบ session ออกจาก localStorage
    setUser(null);
    router.push("/signin"); // กลับไปหน้า Login
  };

  return (
    <div className="min-h-screen bg-[#f0f8ff] p-6">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-[#007bff]">
            {greeting}, {user ? user.full_name : "กำลังโหลด..."}
          </h1>
          <p className="text-lg mt-2 text-gray-600">จัดการร้านค้าออนไลน์ของคุณได้ง่าย ๆ</p>
          <button 
            onClick={handleSignOut} 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            ออกจากระบบ
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <SummaryCard title="ยอดขายวันนี้" value="฿25,840" icon={<FaDollarSign size={30} />} />
          <SummaryCard title="คำสั่งซื้อใหม่" value="134" icon={<FaShoppingCart size={30} />} />
          <SummaryCard title="สินค้าคงเหลือ" value="980 รายการ" icon={<FaBox size={30} />} />
          <SummaryCard title="ลูกค้าใหม่" value="23 ราย" icon={<IoPeople size={30} />} />
        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-semibold text-[#007bff] mt-10">จัดการร้านค้า</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <QuickActionCard 
            title="จัดการคำสั่งซื้อ" 
            desc="ตรวจสอบและอัพเดตคำสั่งซื้อ" 
            link="/orders" 
            icon={<FaShoppingCart size={40} color="#007bff" />}
          />
          <QuickActionCard 
            title="จัดการสินค้า" 
            desc="อัพเดตสต็อกและราคาสินค้า" 
            link="/products" 
            icon={<FaWarehouse size={40} color="#007bff" />}
          />
          <QuickActionCard 
            title="รายงานยอดขาย" 
            desc="ดูสถิติและรายงานการขาย" 
            link="/reports" 
            icon={<FaRegChartBar size={40} color="#007bff" />}
          />
        </div>

        {/* Graph Section */}
        <h2 className="text-2xl font-semibold text-[#007bff] mt-10">วิเคราะห์ยอดขาย</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <Image src="/sales-chart.png" width={900} height={500} alt="Sales Chart" priority />
        </div>
      </div>
    </div>
  );
}

// ✅ Component: Summary Card
function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition">
      <div>
        <h4 className="text-lg font-semibold text-gray-600">{title}</h4>
        <p className="text-2xl font-bold text-[#007bff] mt-2">{value}</p>
      </div>
      {icon}
    </div>
  );
}

// ✅ Component: Quick Action Card
function QuickActionCard({ title, desc, link, icon }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {icon}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
      <Link href={link}>
        <Button className="mt-4 bg-[#007bff] text-white hover:bg-[#0056b3]" size="lg">
          เข้าใช้งาน
        </Button>
      </Link>
    </div>
  );
}
