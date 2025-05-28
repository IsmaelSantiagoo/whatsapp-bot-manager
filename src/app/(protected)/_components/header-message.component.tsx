"use client";
import { Separator } from "@/components/ui/separator";
import { useHeader } from "@/context/header/context";

export const HeaderMessage = () => {
  const { message } = useHeader();

  if (!message) return null;

  return (
    <>
      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-4"
      />

      <div className="flex items-center text-sm text-muted-foreground">
        {message}
      </div>
    </>
  );
};
