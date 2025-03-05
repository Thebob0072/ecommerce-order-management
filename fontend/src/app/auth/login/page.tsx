"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaUser, FaLock } from "react-icons/fa";
import supabase from "@/lib/supabase";
import Image from "next/image";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm text-center">
        {/* โลโก้แบรนด์ */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>

        <h2 className="text-2xl font-semibold text-gray-700">เข้าสู่ระบบ</h2>
        <p className="text-gray-500 text-sm mb-6">จัดการร้านค้าออนไลน์ของคุณ</p>

        <form onSubmit={handleSignIn} className="space-y-5">
          {/* ช่องกรอก Email */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-12 py-3 border border-gray-300 rounded-lg text-gray-500 focus:text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition shadow-sm"
            />
          </div>

          {/* ช่องกรอก Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="รหัสผ่านของคุณ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-12 py-3 border border-gray-300 rounded-lg text-gray-500 focus:text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition shadow-sm"
            />
          </div>

          {/* ข้อความแจ้งเตือนเมื่อเข้าสู่ระบบผิดพลาด */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* ปุ่มเข้าสู่ระบบ */}
          <Button
            type="submit"
            className="w-full bg-[#007bff] text-white hover:bg-[#0056b3] rounded-lg p-3 transition"
          >
            เข้าสู่ระบบ
          </Button>
        </form>

        {/* ลิงก์ไปยังสมัครสมาชิก */}
        <p className="mt-4 text-sm text-gray-500">
          ยังไม่มีบัญชี? <a href="/signup" className="text-[#007bff] hover:underline">สมัครสมาชิก</a>
        </p>
      </div>
    </div>
  );
}
