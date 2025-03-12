"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import Image from "next/image";
import supabase from "@/utils/supabaseClient"; // ✅ ใช้ Supabase
import InputField from "@/components/InputField";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      console.log("📤 ส่งข้อมูลไป Supabase:", formData);

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name,
            phone: formData.phone,
            address: formData.address,
            country: formData.country,
          },
        },
      });

      if (error) throw error;

      console.log("✅ สมัครสมาชิกสำเร็จ:", data);
      router.push("/signin");
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

        <form onSubmit={handleSignUp} className="space-y-5">
          <InputField icon={<FaEnvelope />} type="email" name="email" placeholder="อีเมล" value={formData.email} onChange={handleChange} />
          <InputField icon={<FaUser />} type="text" name="full_name" placeholder="ชื่อ-สกุล" value={formData.full_name} onChange={handleChange} />
          <InputField icon={<FaPhone />} type="tel" name="phone" placeholder="เบอร์โทรศัพท์" value={formData.phone} onChange={handleChange} />
          <InputField icon={<FaMapMarkerAlt />} type="text" name="address" placeholder="ที่อยู่" value={formData.address} onChange={handleChange} />
          <InputField icon={<FaGlobe />} type="text" name="country" placeholder="ประเทศ" value={formData.country} onChange={handleChange} />
          <InputField icon={<FaLock />} type="password" name="password" placeholder="รหัสผ่าน" value={formData.password} onChange={handleChange} />

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

