import { redirect } from "next/navigation";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ApplicationProvider } from "@/context/application/provider";
import { LayoutProps } from "@/interfaces/LayoutProps";
import { getServerCookie } from "@/lib/server-utils";
import { AppHeader } from "./_components/header.component";
import { AppSidebar } from "./_components/app-sidebar.component";

const Layout = async ({ children }: LayoutProps) => {
  const token = await getServerCookie("session_token");

  if (!token) {
    redirect(process.env.NEXT_PUBLIC_DEFAULT_LOGOUT_REDIRECT);
  }

  return (
    <ApplicationProvider>
      <SidebarProvider className="h-full">
        <AppSidebar />

        <SidebarInset className="overflow-hidden">
          <AppHeader />

          <div className="flex-1 flex overflow-hidden p-2 pt-0">
            <div className="bg-muted/50 flex-1 p-2 overflow-hidden">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ApplicationProvider>
  );
};

export default Layout;
