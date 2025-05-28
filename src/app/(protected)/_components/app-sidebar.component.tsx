"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavStatus } from "./nav-status.component";
import { MenuComponent } from "./menu.component";
import { UserProfile } from "./user-profile.component";
import { MenuSecondary } from "./menu-secondary.component";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavStatus/>
      </SidebarHeader>

      <SidebarContent>
        <MenuComponent/>
        <MenuSecondary/>
      </SidebarContent>

      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
};
