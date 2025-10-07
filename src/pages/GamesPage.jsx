import React, { useEffect, useRef, useState } from 'react';

const GamesPage = ({ onBack, onHome }) => {
  const canvasRef = useRef(null);
  const [selectedGame, setSelectedGame] = useState(null); // 'pacman'
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (selectedGame !== 'pacman' || !isRunning) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Responsive canvas sizing
    const resize = () => {
      const dpr = Math.max(window.devicePixelRatio || 1, 1);
      const maxWidth = Math.min(window.innerWidth - 32, 720);
      const aspect = 12 / 7; // approximate (720x420)
      const cssWidth = Math.max(240, maxWidth);
      const cssHeight = Math.round(cssWidth / aspect);
      canvas.style.width = cssWidth + 'px';
      canvas.style.height = cssHeight + 'px';
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const width = () => canvas.width / (Math.max(window.devicePixelRatio || 1, 1));
    const height = () => canvas.height / (Math.max(window.devicePixelRatio || 1, 1));

    // Simple grid of dots
    const cellSize = 24;
    const cols = () => Math.floor(width() / cellSize);
    const rows = () => Math.floor(height() / cellSize);
    const dots = new Set();
    const generateDots = () => {
      dots.clear();
      for (let r = 1; r < rows() - 1; r++) {
        for (let c = 1; c < cols() - 1; c++) {
          dots.add(`${c},${r}`);
        }
      }
    };
    generateDots();

    // Pacman state
    let pacX = Math.floor(cols() / 2) * cellSize + cellSize / 2;
    let pacY = Math.floor(rows() / 2) * cellSize + cellSize / 2;
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

    // On-screen controls
    const setDirection = (dir) => {
      if (dir === 'left') { vx = -speed; vy = 0; }
      if (dir === 'right') { vx = speed; vy = 0; }
      if (dir === 'up') { vy = -speed; vx = 0; }
      if (dir === 'down') { vy = speed; vx = 0; }
    };
    // expose for buttons
    canvas.__setDirection = setDirection;

    let rafId;
    const draw = () => {
      // Update
      pacX += vx; pacY += vy;
      // wrap around
      if (pacX < 0) pacX = width(); if (pacX > width()) pacX = 0;
      if (pacY < 0) pacY = height(); if (pacY > height()) pacY = 0;

      mouthAngle += mouthDelta;
      if (mouthAngle > 0.6 || mouthAngle < 0.05) mouthDelta *= -1;

      // Eat dots near Pacman center
      const c = Math.floor(pacX / cellSize);
      const r = Math.floor(pacY / cellSize);
      const key = `${c},${r}`;
      if (dots.has(key)) dots.delete(key);

      // Render
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width(), height());

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
      window.removeEventListener('resize', resize);
    };
  }, [selectedGame, isRunning]);

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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Games</h1>

        {/* Game select menu */}
        {!selectedGame && (
          <div className="max-w-3xl grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button
              onClick={() => { setSelectedGame('pacman'); setIsRunning(false); }}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gray-900 border border-gray-700 hover:border-netflixRed transition-colors skill-card-hover"
            >
              <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=800&fit=crop" alt="Pacman" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 h-full w-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Pacman</span>
              </div>
            </button>
            {/* Placeholder for future games */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500">
              Coming Soon
            </div>
          </div>
        )}

        {/* Game stage */}
        {selectedGame === 'pacman' && (
          <div className="mt-6">
            {!isRunning && (
              <button onClick={() => setIsRunning(true)} className="mb-4 bg-netflixRed text-white font-semibold px-5 py-2 rounded hover:bg-red-700 transition-colors">Start Game</button>
            )}
            {isRunning && (
              <div className="mb-4 flex gap-3">
                <button onClick={() => setIsRunning(false)} className="bg-gray-800 text-white font-semibold px-4 py-2 rounded hover:bg-gray-700 transition-colors">Pause</button>
                <button onClick={() => { setIsRunning(false); setSelectedGame(null); }} className="bg-black border border-gray-700 text-white font-semibold px-4 py-2 rounded hover:bg-gray-800 transition-colors">Exit</button>
              </div>
            )}
            <div className="bg-gray-900 rounded-lg p-4 inline-block border border-gray-700">
              <canvas ref={canvasRef} width={720} height={420} className="block w-full h-auto" />
              <div className="text-gray-400 text-sm mt-2">Use arrow keys or on-screen controls</div>
              {/* On-screen controls for mobile */}
              <div className="mt-4 grid grid-cols-3 gap-3 w-full max-w-xs mx-auto select-none">
                <div></div>
                <button onClick={() => canvasRef.current.__setDirection('up')} className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded">▲</button>
                <div></div>
                <button onClick={() => canvasRef.current.__setDirection('left')} className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded">◀</button>
                <button onClick={() => canvasRef.current.__setDirection('down')} className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded">▼</button>
                <button onClick={() => canvasRef.current.__setDirection('right')} className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded">▶</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;


