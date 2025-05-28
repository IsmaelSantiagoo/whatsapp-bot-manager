"use client";

import Link from "next/link";

import { ChevronRight, LoaderCircle, MoreHorizontal, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DynamicIcon from "@/components/ui/icon";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { Menu } from "@/interfaces/Menu";
import { dayjs } from "@/lib/dayjs";
import { useApplication } from "@/context/application/context";

export const MenuComponent = () => {
  const { loadingMenus, menus } = useApplication();

  const recursiveMenu = (menu: Menu) => {
    if (menu.submenus.length > 0) {
      return (
        <Collapsible key={menu.id} asChild className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton openOnClick tooltip={menu.titulo}>
                {menu.icone && <DynamicIcon iconName={menu.icone} />}

                <div className="flex items-center justify-between gap-1 flex-1 min-w-0">
                  <span
                    className="text-ellipsis whitespace-nowrap overflow-hidden min-w-0"
                    title={menu.titulo}
                  >
                    {menu.titulo}
                  </span>

                  {dayjs().diff(dayjs(menu.data_criacao), "day") < 14 && (
                    <Badge
                      variant="warning"
                      className="text-[0.55rem] px-[4px] shrink-0"
                    >
                      Novo
                    </Badge>
                  )}
                </div>

                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                {menu.submenus.map((submenu) => recursiveMenu(submenu))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuSubItem key={menu.id}>
        <SidebarMenuSubButton asChild>
          <Link href={menu.rota || "#"}>
            {menu.icone && <DynamicIcon iconName={menu.icone} />}

            <div className="flex items-center justify-between gap-1 flex-1 min-w-0 mr-6">
              <span
                className="text-ellipsis whitespace-nowrap overflow-hidden min-w-0"
                title={menu.titulo}
              >
                {menu.titulo}
              </span>

              {dayjs().diff(dayjs(menu.data_criacao), "day") < 14 && (
                <Badge
                  variant="warning"
                  className="text-[0.55rem] px-[4px] shrink-0"
                >
                  Novo
                </Badge>
              )}
            </div>
          </Link>
        </SidebarMenuSubButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction>
              <MoreHorizontal />

              <span className="sr-only">Mais</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-48 rounded-lg"
            side={"right"}
            align={"start"}
          >
            <DropdownMenuItem>
              <Star className="text-muted-foreground" />
              <span>Favoritar Menu</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuSubItem>
    );
  };

  if (loadingMenus) {
    // return a tailwind spinner
    return (
      <div className="flex flex-col gap-3 items-center justify-center w-full h-full">
        <LoaderCircle className="w-12 h-12 animate-spin text-muted-foreground" />
        Carregando Menus...
      </div>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menus</SidebarGroupLabel>

      <SidebarMenu>{menus.map((menu) => recursiveMenu(menu))}</SidebarMenu>
    </SidebarGroup>
  );
};
