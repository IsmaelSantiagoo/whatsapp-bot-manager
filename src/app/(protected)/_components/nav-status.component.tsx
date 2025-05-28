"use client";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Image from "next/image";
import PulseStatusDot from "./pulse-status-dot.component";

export const NavStatus = () => {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          tooltip={"Chatbot"}
        >
          <div className="flex aspect-square size-8 p-1 items-center justify-center rounded-lg border">
            <Image
              src={"/assets/logo/logo_chatbot_default.svg"}
              alt={"chatbot"}
              width={40}
              height={40}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">ChatBot</span>
            <span className="truncate text-xs">Chatbot para whatsapp</span>
          </div>
          <PulseStatusDot/>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
