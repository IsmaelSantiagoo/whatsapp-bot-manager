"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Menu } from "@/interfaces/Menu";
import { axios } from "@/lib/axios";

import { ApplicationContext } from "./context";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import DisconnectedComponent from "@/app/(protected)/_components/disconnected.component";
import WASocket from "@/interfaces/WASocket";

type MenusResponse = ApiResponse<Menu[]>;

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [status, setStatus] = useState<WASocket["status"]>("wa-disconnected");

  const [loading, setLoading] = useState({
    menus: false
  });

  const updateLoading = (key: keyof typeof loading, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const fetchMenus = useCallback(async () => {
    updateLoading("menus", true);

    try {

      const res = await axios.get<MenusResponse>("/menus");
      if (res.status === 200 && res.data.success) {
        setMenus(res.data.data);
      }
    } catch {
      setMenus([]);
    } finally {
      updateLoading("menus", false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();

    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL, { path: "/ws" });
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('🔌 Conectado ao servidor Socket.IO');
      setErrorDialogOpen(false);
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Desconectado do servidor Socket.IO');
      setErrorDialogOpen(true);
      setSocket(null);
      setStatus("not-found");
    });

    socketInstance.on('bot-event', (e) => {

      if (e?.status) {
        setStatus(e.status);
        console.log(e)
      }

      if (e?.messages) {
        console.log(e.messages);
        const data = e.messages[0];
        const sender = data?.pushName;
        const message = data?.message?.extendedTextMessage?.text || data?.message?.conversation;
        const component = (
          <div>
            <h1 className='font-bold'>Mensagem de {sender}</h1>
            <p>{message}</p>
          </div>
        );
        toast(component, {
          type: "default",
          theme: "dark",
          autoClose: 5000
        });
      }
    });

    // Pergunta o status só após conectar
    socketInstance.on('connect', () => {
      socketInstance.emit('get-whatsapp-status');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        socket,
        status,
        menus,
        loadingMenus: loading.menus,
      }}
    >
      {children}
      <DisconnectedComponent open={errorDialogOpen} onOpenChange={setErrorDialogOpen}/>
    </ApplicationContext.Provider>
  );
};
