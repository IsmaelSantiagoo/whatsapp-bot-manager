"use client";
import { Logo } from "@/components/ui/logo";
import { useHeader } from "@/context/header/context";
import { useEffect } from "react";

const Page = () => {

  const { setPageTitle } = useHeader();

  useEffect(() => {
    setPageTitle([
      {
        title: "Página Inicial"
      },
    ])
  }, []);

  return (
    <div className="h-full flex gap-20 items-center justify-center">
      <Logo
        logoName="chatbot"
        className="w-1/4 h-1/4"
        width={300}
        height={300}
      />
    </div>
  );
};

export default Page;
