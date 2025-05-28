import { redirect } from "next/navigation";
import { LayoutProps } from "@/interfaces/LayoutProps";
import { getServerCookie } from "@/lib/server-utils";

const Layout = async ({ children }: LayoutProps) => {
  const token = await getServerCookie("session_token");

  if (token) {
    redirect(process.env.NEXT_PUBLIC_DEFAULT_LOGIN_REDIRECT || "/login");
  }

  return children;
};

export default Layout;
