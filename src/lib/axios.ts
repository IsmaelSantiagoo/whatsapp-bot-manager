/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosMain, { AxiosRequestConfig, AxiosResponse } from "axios";

import { getServerCookie } from "./server-utils";
import { getCookie, getStoredItem } from "./utils";

export const axiosBuilder = () => {
  const instance = axiosMain.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: () => true,
  });

  instance.interceptors.request.use((config) => {
    let sessionToken;

    if (typeof window === "undefined") {
      sessionToken = getServerCookie("session_token");
    } else {
      sessionToken = getCookie("session_token");
    }

    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }

    return config;
  });

  return instance;
};

export const axios = {
  get: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> => axiosBuilder().get<T, R, D>(url, config),

  post: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> => axiosBuilder().post<T, R, D>(url, data, config),

  put: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> => axiosBuilder().put<T, R, D>(url, data, config),

  delete: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> => axiosBuilder().delete<T, R, D>(url, config),

  patch: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> => axiosBuilder().patch<T, R, D>(url, data, config),
};
