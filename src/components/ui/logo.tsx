"use client";
import { useEffect, useMemo, useState } from "react";
import Image, { ImageProps } from "next/image";
import { useTheme } from "next-themes";

type LogoProps = Omit<ImageProps, "src" | "alt"> & {
  logoName: "chatbot";
};

export const Logo = ({ logoName, ...props }: LogoProps) => {
  const { theme: selectedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useMemo(() => {
    if (!mounted) return "dark";

    return selectedTheme === "system" ? systemTheme : selectedTheme || "dark";
  }, [selectedTheme, systemTheme, mounted]);

  return (
    <Image
      src={`/assets/logo/logo_${logoName}_${theme}.svg`}
      alt={logoName}
      priority
      {...props}
    />
  );
};
