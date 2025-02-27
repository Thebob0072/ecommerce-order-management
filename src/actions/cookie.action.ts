"use server";

import { cookies } from "next/headers";

export async function createCookie(data: {
  name: string;
  value: any;
  httpOnly: boolean;
  path: string;
}) {
  const setExpireDate = new Date().setDate(new Date().getDate() + 7); // ตั้งค่าจำนวนวัน expire ของ Cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: data.name,
    value: data.value,
    httpOnly: data.httpOnly,
    path: data.path,
    expires: setExpireDate,
  });
}

export async function getCookie(name: string) {
  const cookieStore = await cookies();
  const cookieData = cookieStore.get(name);
  return cookieData?.value;
}

export async function clearCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("GUID");
}

export async function createSession(data: { sessionName: string; sessionValue: string; }) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: data.sessionName,
    value: data.sessionValue,
    httpOnly: false,
    path: "/",
  });
}