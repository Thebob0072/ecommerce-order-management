"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";
import supabase from "@/utils/supabaseClient";
import InputField from "@/components/InputField";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      console.log("✅ Logged in:", data);
      localStorage.setItem("supabase_session", JSON.stringify(data.session));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm text-center">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>

        <h2 className="text-3xl font-semibold text-gray-700">เข้าสู่ระบบ</h2>

        <form onSubmit={handleSignIn} className="space-y-5">
          <InputField icon={<FaUser />} type="email" name="email" placeholder="อีเมล" value={formData.email} onChange={handleChange} />
          <InputField icon={<FaLock />} type="password" name="password" placeholder="รหัสผ่าน" value={formData.password} onChange={handleChange} />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-[#007bff] text-white hover:bg-[#0056b3] rounded-lg p-3 transition text-lg">
            เข้าสู่ระบบ
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          ยังไม่มีบัญชี?{" "}
          <a href="/signup" className="text-[#007bff] hover:underline">
            สมัครสมาชิก
          </a>
        </p>
      </div>
    </div>
  );
}
