"use client";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { HeaderBreadcrumb } from "./header-breadcrumb.component";
import { HeaderFullscreen } from "./header-fullscreen.component";
import { HeaderMessage } from "./header-message.component";

export const AppHeader = () => {
  return (
    <header className="flex justify-between h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <Tooltip delayDuration={2}>
          <TooltipTrigger asChild>
            <SidebarTrigger className="-ml-1" />
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <p>Abrir/Fechar Menu</p>
          </TooltipContent>
        </Tooltip>

        <HeaderFullscreen />

        <Tooltip delayDuration={2}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <Bell />

              <span className="sr-only">Notificações</span>
            </Button>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <p>Notificações</p>
          </TooltipContent>
        </Tooltip>

        <HeaderBreadcrumb />

        <HeaderMessage />
      </div>

      <div className="flex items-center justify-center px-4 gap-16">
        <Link href="/home">
          <Logo logoName="chatbot" width={40} height={40} />
        </Link>
      </div>
    </header>
  );
};
