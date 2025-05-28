"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import packageJson from "../../../../package.json";
import {
  ChevronsUpDown,
  CircleUser,
  FolderInput,
  LogOut,
  Moon,
  Siren,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTips } from "@/hooks/use-tips";
import { TokenJWT } from "@/interfaces/TokenJWT";
import { deleteCookie, getSessionData } from "@/lib/utils";
import { axios } from "@/lib/axios";

export const UserProfile = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [session, setSession] = useState<TokenJWT | null>(null);

  useEffect(() => {
    const sessionData = getSessionData();

    if (sessionData) {
      setSession(sessionData);
    }
  }, []);

  if (!session) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session.avatar} alt={session.usuario} />
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session.nome || session.usuario}
                </span>

                {session.email && (
                  <span className="truncate text-xs">{session.email}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                Versão atual: {packageJson.version}
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <CircleUser />
                Meu Perfil
              </DropdownMenuItem>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DropdownMenuItem>
                    <Moon />
                    Tema
                  </DropdownMenuItem>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    Escolha o tema de sua preferência!
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="light">
                      Claro
                    </DropdownMenuRadioItem>

                    <DropdownMenuRadioItem value="dark">
                      Escuro
                    </DropdownMenuRadioItem>

                    <DropdownMenuRadioItem value="system">
                      Automático
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  deleteCookie("session_token");

                  sessionStorage.clear();
                  localStorage.removeItem("obra_ativa");

                  axios.get('auth/logout');

                  router.push("/login");
                }}
                variant="destructive"
              >
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
