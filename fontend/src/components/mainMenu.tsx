"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { clearCookie } from "@/actions/cookie.action";
import UserIcon from "@/assets/icons/user-menu.svg";
import { FaHome, FaSignOutAlt, FaWarehouse, FaBars, FaTimes } from "react-icons/fa";
import { GiCardboardBoxClosed, GiMoneyStack } from "react-icons/gi";
import { IoDocumentSharp, IoSettings, IoBusiness } from "react-icons/io5";
import { DiGoogleAnalytics } from "react-icons/di";
import { FaShoppingCart } from "react-icons/fa";
import { PiBagSimpleFill } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";

export default function MainMenu() {
  const router = useRouter();
  const [cookies] = useCookies(["GUID"]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const onSignOut = async () => {
    await clearCookie();
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    if (!cookies.GUID) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <>
      {/* Toggle Button (Hidden when menu is open) */}
      {!isMenuVisible && (
        <button 
          className="fixed top-4 left-4 z-50 text-white bg-[#007bff] p-3 rounded-full shadow-lg hover:bg-[#0056b3]"
          onClick={toggleMenu}
        >
          <FaBars size={24} />
        </button>
      )}

      {/* Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-[#0056b3] to-[#003d80] w-64 shadow-lg transition-transform transform ${isMenuVisible ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          onClick={toggleMenu}
        >
          <FaTimes size={24} />
        </button>

        <div className="flex flex-col justify-between h-full p-5">
          {/* Main Menu */}
          <ul className="space-y-4 mt-8">
            <MenuItem href="/" icon={<FaHome size={22} />} label="หน้าหลัก" />
            <MenuItem href="/order" icon={<IoDocumentSharp size={22} />} label="เอกสารขาย" />
            <MenuItem href="/purchase/order-request" icon={<FaShoppingCart size={22} />} label="เอกสารซื้อ" />
            <MenuItem href="/warehouse/requisition" icon={<FaWarehouse size={22} />} label="งานคลัง" />
            <MenuItem href="/master/ar" icon={<FaUserGroup size={22} />} label="ลูกหนี้/เจ้าหนี้" />
            <MenuItem href="/master/product" icon={<GiCardboardBoxClosed size={22} />} label="สินค้า" />
            <MenuItem href="/expenses/expense" icon={<GiMoneyStack size={22} />} label="ค่าใช้จ่าย" />
            <MenuItem href="/report/order-request" icon={<DiGoogleAnalytics size={22} />} label="รายงาน" />
            <MenuItem href="/executive/dailyaccountbook" icon={<PiBagSimpleFill size={22} />} label="บัญชี" />
            <MenuItem href="/finance-settings/verify-bank-account-balance" icon={<GiMoneyStack size={22} />} label="ตั้งค่าการเงิน" />
          </ul>

          {/* Profile & Settings */}
          <div className="mt-auto">
            <MenuItem href="/setting/general" icon={<IoSettings size={22} />} label="ตั้งค่า" />
            <div className="flex items-center justify-between p-3 bg-[#1a3653] rounded-lg mt-4 text-white">
              <Image src={UserIcon} alt="User icon" width={40} height={40} className="rounded-full" />
              <button onClick={onSignOut} className="text-red-400 hover:text-red-300 flex items-center space-x-2">
                <FaSignOutAlt size={20} />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Menu Item Component
function MenuItem({ href, icon, label }) {
  return (
    <li>
      <Link 
        href={href}
        className="flex items-center space-x-3 text-white hover:bg-[#003366] p-3 rounded-lg transition duration-300 ease-in-out"
      >
        {icon}
        <span className="text-sm">{label}</span>
      </Link>
    </li>
  );
}
