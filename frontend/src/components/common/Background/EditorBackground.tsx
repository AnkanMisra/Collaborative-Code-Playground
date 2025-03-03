import React, { useEffect, useRef } from 'react';

const EditorBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };


    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    const gridSize = 30;
    const gridOpacity = 0.07;
    

    let animationFrameId: number;
    let time = 0;


    const render = () => {
      time += 0.2;
      

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0A0F1E');
      gradient.addColorStop(1, '#111827');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      

      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 0.3;
      

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        

        const opacity = gridOpacity * (0.5 + 0.5 * Math.sin(x * 0.01 + time * 0.05));
        ctx.globalAlpha = opacity;
        
        ctx.stroke();
      }
      

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        

        const opacity = gridOpacity * (0.5 + 0.5 * Math.sin(y * 0.01 + time * 0.05));
        ctx.globalAlpha = opacity;
        
        ctx.stroke();
      }
      

      for (let x = 0; x < canvas.width; x += gridSize * 3) {
        for (let y = 0; y < canvas.height; y += gridSize * 3) {
          const pulseSize = 2 + Math.sin(time * 0.1 + x * 0.01 + y * 0.01) * 1;
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize * 5);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, pulseSize * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default EditorBackground;