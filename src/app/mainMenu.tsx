"use client";
import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { clearCookie } from "@/actions/cookie.action";
import UserIcon from "@/assets/icons/user-menu.svg";
import { FaHome, FaSignOutAlt, FaWarehouse, FaTimes } from "react-icons/fa";
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
    <nav className="relative">
      {/* Main Menu */}
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          isMenuVisible ? "translate-x-0" : "-translate-x-full"
        } fixed bg-gradient-to-b from-[#0099ff] to-[#007bff] w-64 h-screen shadow-lg`}
      >
        {/* Close Button */}
        {isMenuVisible && (
          <button
            className="absolute top-4 right-4 z-50 text-white"
            onClick={toggleMenu}
          >
            <FaTimes size={28} />
          </button>
        )}

        <div className="flex flex-col justify-between p-5 overflow-y-auto">
          {/* Main Menu */}
          <ul className="space-y-6">
            <li>
              <Link
                href="/"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaHome size={28} />
                <span className="text-sm">หน้าหลัก</span>
              </Link>
            </li>
            <li>
              <Link
                href="/sale/booking"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <IoDocumentSharp size={28} />
                <span className="text-sm">เอกสารขาย</span>
              </Link>
            </li>
            <li>
              <Link
                href="/purchase/order-request"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaShoppingCart size={28} />
                <span className="text-sm">เอกสารซื้อ</span>
              </Link>
            </li>
            <li>
              <Link
                href="/warehouse/requisition"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaWarehouse size={28} />
                <span className="text-sm">งานคลัง</span>
              </Link>
            </li>
            <li>
              <Link
                href="/master/ar"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaUserGroup size={28} />
                <span className="text-sm">ลูกหนี้/เจ้าหนี้</span>
              </Link>
            </li>
            <li>
              <Link
                href="/master/product"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <GiCardboardBoxClosed size={28} />
                <span className="text-sm">สินค้า</span>
              </Link>
            </li>
            <li>
              <Link
                href="/expenses/expense"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <GiMoneyStack size={28} />
                <span className="text-sm">ค่าใช้จ่าย</span>
              </Link>
            </li>
            <li>
              <Link
                href="/report/order-request"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <DiGoogleAnalytics size={30} />
                <span className="text-sm">รายงาน</span>
              </Link>
            </li>
            <li>
              <Link
                href="/executive/dailyaccountbook"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <PiBagSimpleFill size={28} />
                <span className="text-sm">บัญชี</span>
              </Link>
            </li>
            <li>
              <Link
                href="/finance-settings/verify-bank-account-balance"
                className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <GiMoneyStack size={28} />
                <span className="text-sm">ตั้งค่าการเงิน</span>
              </Link>
            </li>
          </ul>

          {/* Bottom Menu */}
          <div className="text-center mt-auto">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/setting/general"
                  className="flex items-center space-x-3 text-white hover:bg-[#0056b3] hover:shadow-xl p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <IoSettings size={28} />
                  <span className="text-sm">ตั้งค่า</span>
                </Link>
              </li>
              <li>
                <div className="relative">
                  <Dropdown>
                    <DropdownTrigger>
                      <Image
                        src={UserIcon}
                        alt="User icon"
                        width={45}
                        height={45}
                        className="rounded-full hover:shadow-xl transition duration-300"
                      />
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="flat"
                      aria-label="User Profile Actions"
                      className="bg-[#1a3653] rounded-lg" // เพิ่มพื้นหลังสีฟ้า
                    >
                      <DropdownItem key="profile" className="opacity-100">
                        User Profile
                      </DropdownItem>
                      <DropdownItem
                        key="select-company"
                        href="/select-company"
                        startContent={<IoBusiness className="mt-[3px]" />}
                      >
                        เลือกธุรกิจ
                      </DropdownItem>
                      <DropdownItem
                        key="signOut"
                        onPress={onSignOut}
                        startContent={<FaSignOutAlt className="mt-[3px]" />}
                        color="danger"
                      >
                        ออกจากระบบ
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Menu Toggle Button */}
      <button
        className="absolute top-4 left-4 z-50 text-white"
        onClick={toggleMenu}
      >
        {!isMenuVisible && <FaHome size={28} />}
      </button>
    </nav>
  );
}
