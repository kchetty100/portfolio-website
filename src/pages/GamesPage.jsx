import React, { useEffect, useRef } from 'react';

const GamesPage = ({ onBack, onHome }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Simple grid of dots
    const cellSize = 24;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);
    const dots = new Set();
    for (let r = 1; r < rows - 1; r++) {
      for (let c = 1; c < cols - 1; c++) {
        dots.add(`${c},${r}`);
      }
    }

    // Pacman state
    let pacX = Math.floor(cols / 2) * cellSize + cellSize / 2;
    let pacY = Math.floor(rows / 2) * cellSize + cellSize / 2;
    let vx = 0;
    let vy = 0;
    const speed = 3;
    let mouthAngle = 0;
    let mouthDelta = 0.12;

    const keyHandler = (e) => {
      if (e.key === 'ArrowLeft') { vx = -speed; vy = 0; }
      if (e.key === 'ArrowRight') { vx = speed; vy = 0; }
      if (e.key === 'ArrowUp') { vy = -speed; vx = 0; }
      if (e.key === 'ArrowDown') { vy = speed; vx = 0; }
    };
    window.addEventListener('keydown', keyHandler);

    let rafId;
    const draw = () => {
      // Update
      pacX += vx; pacY += vy;
      // wrap around
      if (pacX < 0) pacX = width; if (pacX > width) pacX = 0;
      if (pacY < 0) pacY = height; if (pacY > height) pacY = 0;

      mouthAngle += mouthDelta;
      if (mouthAngle > 0.6 || mouthAngle < 0.05) mouthDelta *= -1;

      // Eat dots near Pacman center
      const c = Math.floor(pacX / cellSize);
      const r = Math.floor(pacY / cellSize);
      const key = `${c},${r}`;
      if (dots.has(key)) dots.delete(key);

      // Render
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      // Dots
      ctx.fillStyle = '#bbb';
      dots.forEach((k) => {
        const [dc, dr] = k.split(',').map(Number);
        const x = dc * cellSize + cellSize / 2;
        const y = dr * cellSize + cellSize / 2;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Pacman
      const angleStart = Math.atan2(vy, vx) || 0; // direction angle
      ctx.fillStyle = '#FFE000';
      ctx.beginPath();
      ctx.moveTo(pacX, pacY);
      ctx.arc(
        pacX,
        pacY,
        12,
        angleStart + mouthAngle,
        angleStart - mouthAngle + Math.PI * 2,
        false
      );
      ctx.closePath();
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('keydown', keyHandler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onHome}
                className="text-xl sm:text-3xl font-bold text-netflixRed tracking-tight font-netflix text-arc-effect hover:text-red-400 transition-colors cursor-pointer"
              >
                KEEGAN CHETTY
              </button>
            </div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <button onClick={onBack} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Back</button>
              <button onClick={onHome} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4 sm:px-6 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Games - Pacman</h1>
        <div className="bg-gray-900 rounded-lg p-4 inline-block border border-gray-700">
          <canvas ref={canvasRef} width={720} height={420} className="block" />
          <div className="text-gray-400 text-sm mt-2">Use arrow keys to move</div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;


