"use client";

import { Key, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input, Button } from "@heroui/react";
import { useCookies } from "react-cookie"; // ใช้ฝั่ง client
import FacebookIcon from "@/assets/icons/facebook-white.svg";
import GoogleIcon from "@/assets/icons/google-logo.svg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

import { createCookie, createSession } from "@/actions/cookie.action";

// Redux
import { useAppDispatch } from "@/store/store";
// import { signIn, fetchLogin } from "@/store/slices/authSlice";
import Swal from "sweetalert2";
import { setGUID } from "@/store/slices/authSlice";

export default function LoginPage() {
  const env = process.env.NODE_ENV;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["isLogin"]);
  const [pwVisible, setpwVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(env === "development" ? "12345678" : "");

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") onLogin();
  };

  const onLogin = async () => {
   
  };

  return (
    <div className="green-bg text-black">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
        <div className="w-full bg-white rounded-md shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 xl:w-[800px]">
          <form>
            <div className="p-10 space-y-4 md:space-y-6">
              <p className="text-center text-2xl pb-8 text-primary-green font-bold">
                ล็อกอินเข้าสู่ระบบ
              </p>
              <Input
                onValueChange={setUsername}
                onKeyUp={handleKeyPress}
                value={username}
                defaultValue=""
                type="text"
                label="ชื่อผู้ใช้"
                placeholder="USERNAME"
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                classNames={{ mainWrapper: ["mb-5"], inputWrapper: ["border"] }}
              />
              <Input
                onValueChange={setPassword}
                onKeyUp={handleKeyPress}
                value={password}
                defaultValue=""
                type={pwVisible ? "text" : "password"}
                label="รหัสผ่าน"
                placeholder=" "
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                classNames={{ mainWrapper: ["mb-5"], inputWrapper: ["border"] }}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setpwVisible(!pwVisible)}
                  >
                    {pwVisible ? (
                      <IoEyeOff className="text-2xl text-default-400" />
                    ) : (
                      <IoEye className="text-2xl text-default-400" />
                    )}
                  </button>
                }
              />
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="text-sm">ยังไม่มีบัญชีกับเรา?</p>
                  <Link
                    href="/auth/register"
                    className="text-primary-green hover:underline decoration-1 text-md"
                  >
                    สมัครใช้งาน
                  </Link>
                </div>
                <Button
                  color="success"
                  className="text-white text-base px-6 rounded bg-[#21b899]"
                  onPress={() => onLogin()}
                >
                  เข้าสู่ระบบ
                </Button>
              </div>
              <div className="border-t pt-5">
                <p className="text-center mb-3">หรือเข้าสู่ระบบด้วย</p>
                <div className="bg-[#1877F2] p-3 rounded-lg pl-4 flex flex-row items-center md:mx-8 mb-3">
                  <Image
                    src={FacebookIcon}
                    alt="เข้าสู่ระบบด้วย Facebook"
                    width={30}
                    height={30}
                  />
                  <span className="text-white ml-3">
                    เข้าสู่ระบบด้วย Facebook
                  </span>
                </div>
                <div className="border p-3 rounded-lg pl-4 flex flex-row items-center md:mx-8 ">
                  <Image
                    src={GoogleIcon}
                    alt="เข้าสู่ระบบด้วย Google"
                    width={30}
                    height={30}
                  />
                  <span className="ml-3">เข้าสู่ระบบด้วย Google</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
