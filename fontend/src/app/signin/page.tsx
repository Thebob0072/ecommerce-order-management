"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "เข้าสู่ระบบไม่สำเร็จ");
      }

      // ✅ เก็บ session ไว้ใน LocalStorage
      localStorage.setItem("user", JSON.stringify(result.user));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm text-center">
        {/* โลโก้ */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>

        <h2 className="text-3xl font-semibold text-gray-700">เข้าสู่ระบบ</h2>
        <p className="text-gray-500 text-sm mb-6">จัดการร้านค้าออนไลน์ของคุณ</p>

        <form onSubmit={handleSignIn} className="space-y-5">
          <InputField icon={<FaUser />} type="email" name="email" placeholder="อีเมลของคุณ" value={formData.email} onChange={handleChange} />
          <InputField icon={<FaLock />} type="password" name="password" placeholder="รหัสผ่านของคุณ" value={formData.password} onChange={handleChange} />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-[#007bff] text-white hover:bg-[#0056b3] rounded-lg p-3 transition text-lg">
            เข้าสู่ระบบ
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          ยังไม่มีบัญชี? <a href="/signup" className="text-[#007bff] hover:underline">สมัครสมาชิก</a>
        </p>
      </div>
    </div>
  );
}

// ✅ Component ช่อง Input พร้อมไอคอน
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
