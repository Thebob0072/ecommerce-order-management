"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import Image from "next/image";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
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

    try {
      console.log("📤 ส่งข้อมูลไป Backend:", formData);

      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("📥 ตอบกลับจาก Backend:", result);

      if (!response.ok) {
        throw new Error(result.message || "สมัครสมาชิกไม่สำเร็จ");
      }

      router.push("/signin"); // 🔹 ส่งไปหน้าเข้าสู่ระบบ
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>

        <h2 className="text-3xl font-semibold text-gray-700">สมัครสมาชิก</h2>
        <p className="text-gray-500 text-sm mb-6">สร้างบัญชีเพื่อจัดการร้านค้าออนไลน์ของคุณ</p>

        <form onSubmit={handleSignUp} className="space-y-5">
          <InputField icon={<FaEnvelope />} type="email" name="email" placeholder="อีเมล" value={formData.email} onChange={handleChange} />
          <InputField icon={<FaUser />} type="text" name="full_name" placeholder="ชื่อ-สกุล" value={formData.full_name} onChange={handleChange} />
          <InputField icon={<FaPhone />} type="tel" name="phone" placeholder="เบอร์โทรศัพท์" value={formData.phone} onChange={handleChange} />
          <InputField icon={<FaMapMarkerAlt />} type="text" name="address" placeholder="ที่อยู่" value={formData.address} onChange={handleChange} />
          <InputField icon={<FaGlobe />} type="text" name="country" placeholder="ประเทศ" value={formData.country} onChange={handleChange} />
          <InputField icon={<FaLock />} type="password" name="password" placeholder="รหัสผ่าน" value={formData.password} onChange={handleChange} />
          <InputField icon={<FaLock />} type="password" name="confirmPassword" placeholder="ยืนยันรหัสผ่าน" value={formData.confirmPassword} onChange={handleChange} />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-[#007bff] text-white hover:bg-[#0056b3] rounded-lg p-3 transition text-lg">
            สมัครสมาชิก
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          มีบัญชีอยู่แล้ว? <a href="/signin" className="text-[#007bff] hover:underline">เข้าสู่ระบบ</a>
        </p>
      </div>
    </div>
  );
}

function InputField({ icon, type, name, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-3 text-gray-500">{icon}</div>
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
