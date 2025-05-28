import { useState } from "react";

export const useTips = () => {
  const [tipsOn, setTipsOn] = useState<"on" | "off">(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("tips") as "on" | "off";

      return storedValue ? storedValue : "on";
    }

    return "on";
  });

  const toggleTips = (state?: "on" | "off") => {
    setTipsOn(() => {
      const newState = state || (tipsOn === "on" ? "off" : "on");

      localStorage.setItem("tips", newState);

      return newState;
    });
  };

  return { tipsOn, toggleTips };
};
