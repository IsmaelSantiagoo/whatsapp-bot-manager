"use client";
import { useState } from "react";
import { LayoutProps } from "@/interfaces/LayoutProps";
import { HeaderContext, PageTitleProps } from "./context";

const HeaderProvider = ({ children }: LayoutProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState<PageTitleProps>(null);

  return (
    <HeaderContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        clearPageTitle: () => setPageTitle(null),
        message,
        setMessage,
        clearMessage: () => setMessage(null),
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
