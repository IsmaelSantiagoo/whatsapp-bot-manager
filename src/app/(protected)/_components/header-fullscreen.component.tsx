"use client";

import { useEffect, useState } from "react";

import { Expand, Shrink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HeaderFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (typeof window === "undefined") return;

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => {
            toggleFullscreen();
            setIsFullscreen((prev) => !prev);
          }}
        >
          {isFullscreen ? <Shrink /> : <Expand />}

          <span className="sr-only">Tela Cheia</span>
        </Button>
      </TooltipTrigger>

      <TooltipContent side="bottom">
        <p>Tela Cheia</p>
      </TooltipContent>
    </Tooltip>
  );
};
