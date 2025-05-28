import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { TokenJWT } from "@/interfaces/TokenJWT";
import WASocket from "@/interfaces/WASocket";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const decodeJWT = (token?: string): TokenJWT | null => {
  if (!token) return null;

  const payload = token.split(".")[1];
  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
  const parsedPayload = JSON.parse(decodedPayload);

  return parsedPayload;
};

export const getCookie = (key: string) => {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");
  const token = cookies.find((cookie) => cookie.trim().startsWith(key + "="));

  return token ? decodeURIComponent(token.split("=")[1]) : null;
};

export const setCookie = (key: string, value: string, days?: number) => {
  if (typeof window === "undefined") return;

  let expires: string | null = null;

  if (days) {
    expires = new Date(Date.now() + days * 864e5).toUTCString();
  }

  let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;

  if (expires) {
    cookie += `; expires=${expires}`;
  }

  document.cookie = cookie;
}

export const deleteCookie = (key: string) => {
  if (typeof window === "undefined") return;

  document.cookie = `${encodeURIComponent(key)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const getStoredItem = (key: string) => {
  if (typeof window === "undefined") return;

  return sessionStorage.getItem(key) || localStorage.getItem(key);
}

export const setStoredItem = (key: string, value: string) => {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(key, value);
  localStorage.setItem(key, value);
};

export const removeStoredItem = (key: string) => {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
};

export const getSessionData = () => {
  const token = getCookie("session_token");

  if (!token) return null;

  return decodeJWT(token);
};

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const value = bytes / Math.pow(k, i);
  const rounded = parseFloat(value.toFixed(decimals));

  return `${rounded} ${units[i]}`;
};

export const getStatusName = (status: WASocket["status"]) => {

  let name: string | null = null;

  switch(status) {

    case "wa-connected":
      name = "Conectado";
    break
    case "wa-disconnected":
      name = "Desconectado";
    break
    case "wa-reconnecting":
      name = "Reconectando";
    break
    case "wa-waiting-connection":
      name = "Escaneie o qrcode";
    break
    case "not-found":
      name = "Erro ao conectar";
    break
  }

  return name;
}

export const renderStatusColor = (status: WASocket["status"]) => {
  switch (status) {
    case "wa-disconnected":
      return "red-500";
    break
    case "wa-connected":
      return "green-500";
    break
    case "wa-reconnecting":
    case "not-found":
      return "yellow-500";
    break
    default:
      return "gray-500";
    break
  }
}