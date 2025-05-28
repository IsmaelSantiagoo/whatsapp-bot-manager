'use client';
import { useRef, useEffect, useState, SetStateAction } from 'react';
import QRCode from 'qrcode';
import React from 'react';
import WASocket from '@/interfaces/WASocket';
import AnimationRenderer from './animation-renderer.component';
import { useApplication } from '@/context/application/context';

export default function QRCodeComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { status, socket } = useApplication();

  useEffect(() => {
    if (!socket) return;

    socket.on('bot-event', (e) => {

      if (e?.qr) {
        QRCode.toCanvas(canvasRef.current, e.qr, { width: 150 }).catch(console.error);
      }
    });

    return () => {
      socket.off('bot-event');
    };
  }, [socket]);

  const renderContent = (): React.ReactNode => {
    switch (status) {
      case "wa-waiting-connection":
        return <canvas key={status} ref={canvasRef}/>;
      break
      case "wa-reconnecting":
        return <AnimationRenderer key={status} src='/assets/animations/loading.lottie' />;
      break
      case "not-found":
        return <AnimationRenderer key={status} src='/assets/animations/404.lottie' />;
      break
      default:
        return <AnimationRenderer key={status} src={`/assets/animations/${status}.lottie`} infiniteLoop={false} pauseFrame={120}/>;
      break
    }
  };

  return (
    <div className='p-3'>
      {renderContent()}
    </div>
  );
}
