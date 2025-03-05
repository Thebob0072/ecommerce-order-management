import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // กำหนดค่าต่างๆ ที่ต้องการใน Next.js
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // สามารถเพิ่มการตั้งค่าอื่นๆ ได้ เช่น การตั้งค่า rewrites, redirects, etc.
};

export default nextConfig;
