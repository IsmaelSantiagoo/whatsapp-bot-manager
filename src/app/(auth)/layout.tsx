import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getServerCookie } from "@/lib/server-utils";

export default async function Layout({ children }: { children: ReactNode }) {
  const token = await getServerCookie("session_token");

  if (token) {
    redirect(process.env.NEXT_PUBLIC_DEFAULT_LOGIN_REDIRECT || "/login");
  }

  return children;
}
