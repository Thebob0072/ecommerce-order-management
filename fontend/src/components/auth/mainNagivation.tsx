"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import MainMenu from '@/components/mainMenu';
import { RootState, useAppSelector } from "@/store/store";
import "@/app/globals.css";

export default function MainNavigation({ children }: Readonly<{ children: ReactNode; }>) {
  const router = useRouter()
  const pathname = usePathname()
  // const { GUID } = useAppSelector((state: RootState) => state.auth);
  const [cookies] = useCookies(['GUID']);
  const [isLoading, setisLoading] = useState(true)
  const checkHideMenu = hideMainMenu.find(item => item === pathname);
  const checkHidefromDocFrom = pathname.endsWith("/print") // ซ่อนเมนูหลักเมื่ออยู่ในหน้า form เอกสาร

  const checkPath = async () => {
    if (pathname === "../../app/login") { router.push('/') }
    setisLoading(false)
  }

  useEffect(() => {
    checkPath()
  }, [pathname])


  return (
    <main className="light flex flex-row">
      {cookies.GUID && !checkHideMenu && !checkHidefromDocFrom ? <MainMenu /> : null}
      <div className="flex-auto min-h-screen">
        {children}
      </div>
    </main>
  )
}

// route ที่ต้องการซ่อนเมนูหลัก
const hideMainMenu = [
  "/select-company",
  "/select-company/create-company"
]