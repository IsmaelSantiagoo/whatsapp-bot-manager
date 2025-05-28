"use client";
import { createContext, useContext } from "react";
import { Menu } from "@/interfaces/Menu";
import { Socket } from "socket.io-client";
import WASocket from "@/interfaces/WASocket";

type ApplicationContextValues = {
  socket: Socket | null;
  status: WASocket["status"];
  menus: Menu[];
  loadingMenus: boolean;
};

export const ApplicationContext = createContext<ApplicationContextValues>(
  {} as ApplicationContextValues,
);

export const useApplication = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error("useApplication deve ser chamado dentro de um ApplicationProvider");
  }

  return context;
};
