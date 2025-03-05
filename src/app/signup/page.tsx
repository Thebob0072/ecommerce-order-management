"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import supabase from "@/lib/supabase";
import Image from "next/image";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    address: "",
    country: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    const { error } = await supabase.auth.signUp({ email: formData.email, password: formData.password });

    if (error) {
      setError(error.message);
    } else {
      // บันทึกข้อมูลเพิ่มเติมลง Database
      await supabase.from("users").insert([
        {
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          country: formData.country,
        },
      ]);
      router.push("/signin"); // ส่งไปหน้าเข้าสู่ระบบ
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        {/* โลโก้ */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>

        <h2 className="text-2xl font-semibold text-gray-700">สมัครสมาชิก</h2>
        <p className="text-gray-500 text-sm mb-6">สร้างบัญชีเพื่อจัดการร้านค้าออนไลน์ของคุณ</p>

        <form onSubmit={handleSignUp} className="space-y-5">
          {/* ช่องกรอก Email */}
          <InputField
            icon={<FaEnvelope className="text-gray-500" />}
            type="email"
            name="email"
            placeholder="อีเมลของคุณ"
            value={formData.email}
            onChange={handleChange}
          />

          {/* ช่องกรอกชื่อ-สกุล */}
          <InputField
            icon={<FaUser className="text-gray-500" />}
            type="text"
            name="fullName"
            placeholder="ชื่อ-สกุล"
            value={formData.fullName}
            onChange={handleChange}
          />

          {/* ช่องกรอกเบอร์โทร */}
          <InputField
            icon={<FaPhone className="text-gray-500" />}
            type="tel"
            name="phone"
            placeholder="เบอร์โทรศัพท์"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* ช่องกรอกที่อยู่ */}
          <InputField
            icon={<FaMapMarkerAlt className="text-gray-500" />}
            type="text"
            name="address"
            placeholder="ที่อยู่"
            value={formData.address}
            onChange={handleChange}
          />

          {/* ช่องกรอกประเทศ */}
          <InputField
            icon={<FaGlobe className="text-gray-500" />}
            type="text"
            name="country"
            placeholder="ประเทศ"
            value={formData.country}
            onChange={handleChange}
          />

          {/* ช่องกรอก Password */}
          <InputField
            icon={<FaLock className="text-gray-500" />}
            type="password"
            name="password"
            placeholder="รหัสผ่านของคุณ"
            value={formData.password}
            onChange={handleChange}
          />

          {/* ช่องกรอก Confirm Password */}
          <InputField
            icon={<FaLock className="text-gray-500" />}
            type="password"
            name="confirmPassword"
            placeholder="ยืนยันรหัสผ่าน"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* ข้อความแจ้งเตือนเมื่อสมัครผิดพลาด */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* ปุ่มสมัครสมาชิก */}
          <Button
            type="submit"
            className="w-full bg-[#007bff] text-white hover:bg-[#0056b3] rounded-lg p-3 transition"
          >
            สมัครสมาชิก
          </Button>
        </form>

        {/* ลิงก์ไปยังเข้าสู่ระบบ */}
        <p className="mt-4 text-sm text-gray-500">
          มีบัญชีอยู่แล้ว? <a href="/signin" className="text-[#007bff] hover:underline">เข้าสู่ระบบ</a>
        </p>
      </div>
    </div>
  );
}

// ✅ Component สำหรับสร้างช่อง Input ที่มีไอคอน
function InputField({ icon, type, name, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-3">{icon}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full px-12 py-3 border border-gray-300 rounded-lg text-gray-500 focus:text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition shadow-sm"
      />
    </div>
  );
}
