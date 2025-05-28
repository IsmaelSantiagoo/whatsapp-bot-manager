"use client";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

interface AnimationRendererProps {
  src: string;
  infiniteLoop?: boolean;
  pauseFrame?: number;
}

export default function AnimationRenderer({ src, infiniteLoop = true, pauseFrame = 120 }: AnimationRendererProps) {

  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    if (dotLottie && !infiniteLoop) {
      const onLoad = () => {
        
        dotLottie.play();

        const interval = setInterval(() => {
          const currentFrame = dotLottie.currentFrame;
          if (currentFrame >= pauseFrame) {
            dotLottie.pause();
            clearInterval(interval);
          }
        }, 50);
      };

      dotLottie.addEventListener('load', onLoad);

      return () => {
        dotLottie.removeEventListener('load', onLoad);
      };
    }
  }, [dotLottie]);

  return (
    <DotLottieReact
      src={src}
      autoplay={infiniteLoop}
      loop={infiniteLoop}
      dotLottieRefCallback={setDotLottie}
      className="w-full h-full"
    />
  )
}