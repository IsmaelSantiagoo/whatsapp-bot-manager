"use server";

import { cookies } from "next/headers";

export const getServerCookie = async (key: string) => {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(key);

  return cookie?.value ?? null;
};
