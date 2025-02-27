"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import LoginPage from '@/app/auth/login/page';

export default function AuthNavigation({ children }: Readonly<{ children: ReactNode; }>) {
  const pathname = usePathname()
  const checkAllow = noAuthAllow.find(item => item === pathname)
  return pathname !== "/" && checkAllow ? children : <LoginPage />
} 

// route ที่อนุญาตให้เข้าใช้ตอนที่ยังไม่ได้ Login
const noAuthAllow = [
  "../../app/signup"
]