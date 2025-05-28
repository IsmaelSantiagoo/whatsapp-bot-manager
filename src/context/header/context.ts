"use client";
import { createContext, useContext } from "react";

export type TitleProps =
  | string
  | {
      title: string;
      href?: string;
    };

export type PageTitleProps = TitleProps[] | TitleProps | null;

type HeaderContextProps = {
  pageTitle: PageTitleProps;
  setPageTitle: React.Dispatch<React.SetStateAction<PageTitleProps>>;
  clearPageTitle: () => void;
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  clearMessage: () => void;
};

export const HeaderContext = createContext<HeaderContextProps>(
  {} as HeaderContextProps,
);

export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeader deve ser chamado dentro de um SessionProvider");
  }

  return context;
};
