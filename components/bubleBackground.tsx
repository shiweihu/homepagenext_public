'use client'

import React, { useRef, useEffect } from 'react';

export function  BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const bubbles: { x: number; y: number; radius: number; speedX: number,speedY: number,color:string }[] = [];
    const colors = [
        'rgba(255, 69, 0, 0.6)',    // Orange Red, 60% opacity
        'rgba(255, 105, 180, 0.5)', // Hot Pink, 50% opacity
        'rgba(75, 0, 130, 0.4)',    // Indigo, 40% opacity
        'rgba(0, 255, 127, 0.3)',   // Spring Green, 30% opacity
        'rgba(255, 215, 0, 0.6)',   // Gold, 60% opacity
        'rgba(138, 43, 226, 0.5)',  // Blue Violet, 50% opacity
        'rgba(60, 179, 113, 0.4)',  // Medium Sea Green, 40% opacity
        'rgba(30, 144, 255, 0.3)',  // Dodger Blue, 30% opacity
        'rgba(255, 165, 0, 0.6)',   // Orange, 60% opacity
        'rgba(221, 160, 221, 0.5)'  // Plum, 50% opacity
      ];
      
    const createBubble = () => {
      const radius = Math.max(Math.random() * 300,10);
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const speedX = Math.max(Math.random() * 3,1) ;
      const speedY = Math.max(Math.random() * 3,1) ;
      const color = colors[Math.floor(Math.random() * colors.length)];
      bubbles.push({ x, y, radius, speedX,speedY, color });
    };

    const drawBubble = (bubble: { x: number; y: number; radius: number; color: string }) => {
      context.beginPath();
      context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      context.fillStyle = bubble.color;
      context.fill();
      context.closePath();
    };

    const updateBubbles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        bubble.y += bubble.speedY ;
        bubble.x += bubble.speedX ;
        // 碰撞检测
        if (bubble.x + bubble.radius >= canvas.width || bubble.x - bubble.radius <= 0) {
            bubble.speedX = -bubble.speedX;
        }
        if (bubble.y + bubble.radius >= canvas.height || bubble.y - bubble.radius <= 0) {
            bubble.speedY = -bubble.speedY;
        }
        drawBubble(bubble);
        // if (bubble.y + bubble.radius < 0) {
        //   bubbles.splice(i, 1);
        //   i--;
        // }
      }
      if (bubbles.length < 10) {
        createBubble();
      }
      requestAnimationFrame(updateBubbles);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    updateBubbles();
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};