import React, { useEffect, useRef, useState } from 'react';

const GamesPage = ({ onBack, onHome }) => {
  const canvasRef = useRef(null);
  const [selectedGame, setSelectedGame] = useState(null); // 'pacman' | 'snake'
  const [isRunning, setIsRunning] = useState(false);
  const [gameMessage, setGameMessage] = useState(null);

  useEffect(() => {
    if (!selectedGame || !isRunning) return;
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

    // Reset win/lose banner
    setGameMessage(null);

    // Direction helper for both games
    let setDirection = () => {};
    canvas.__setDirection = (d) => setDirection(d);

    // Pacman state
    let pacX = Math.floor(cols() / 2) * cellSize + cellSize / 2;
    let pacY = Math.floor(rows() / 2) * cellSize + cellSize / 2;
    let vx = 0;
    let vy = 0;
    const speed = 3;
    let mouthAngle = 0;
    let mouthDelta = 0.12;

    // Enemies (ghosts)
    const enemyCount = 3;
    const enemySpeed = 1.0; // slower ghosts
    const enemies = Array.from({ length: enemyCount }).map((_, i) => ({
      x: (1 + i) * cellSize * 2 + cellSize,
      y: (1 + i) * cellSize * 2 + cellSize,
      color: ['#FF4D4D', '#FF6A00', '#00E5FF'][i % 3]
    }));

    const keyHandler = (e) => {
      if (selectedGame === 'pacman') {
        if (e.key === 'ArrowLeft') { vx = -speed; vy = 0; }
        if (e.key === 'ArrowRight') { vx = speed; vy = 0; }
        if (e.key === 'ArrowUp') { vy = -speed; vx = 0; }
        if (e.key === 'ArrowDown') { vy = speed; vx = 0; }
      } else if (selectedGame === 'snake') {
        const map = { ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 } };
        const nd = map[e.key];
        if (nd) {
          // prevent reversing
          if (!(nd.x === -dir.x && nd.y === -dir.y)) {
            pendingDir = nd;
          }
        }
      }
    };
    window.addEventListener('keydown', keyHandler);

    // On-screen controls
    const setPacmanDirection = (dir) => {
      if (dir === 'left') { vx = -speed; vy = 0; }
      if (dir === 'right') { vx = speed; vy = 0; }
      if (dir === 'up') { vy = -speed; vx = 0; }
      if (dir === 'down') { vy = speed; vx = 0; }
    };

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

      // Check win condition
      if (dots.size === 0) {
        setGameMessage('You won!');
        setIsRunning(false);
        return;
      }

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

      // Enemies logic
      enemies.forEach((g) => {
        // Move along grid-aligned paths (follow dot lines)
        const dxTot = pacX - g.x;
        const dyTot = pacY - g.y;
        let stepX = 0, stepY = 0;
        if (Math.abs(dxTot) >= Math.abs(dyTot)) {
          // favor horizontal movement first
          stepX = dxTot > 0 ? enemySpeed : -enemySpeed;
          stepY = 0;
        } else {
          stepY = dyTot > 0 ? enemySpeed : -enemySpeed;
          stepX = 0;
        }
        // Snap movement to grid corridors by keeping one axis constant towards nearest corridor center
        // Align to nearest row/column center when moving horizontally/vertically
        if (stepX !== 0) {
          const targetRowY = Math.round(g.y / cellSize) * cellSize;
          g.y += Math.sign(targetRowY - g.y) * Math.min(Math.abs(targetRowY - g.y), enemySpeed);
        } else if (stepY !== 0) {
          const targetColX = Math.round(g.x / cellSize) * cellSize;
          g.x += Math.sign(targetColX - g.x) * Math.min(Math.abs(targetColX - g.x), enemySpeed);
        }
        g.x += stepX; g.y += stepY;
        // wrap
        if (g.x < 0) g.x = width(); if (g.x > width()) g.x = 0;
        if (g.y < 0) g.y = height(); if (g.y > height()) g.y = 0;

        // Draw ghost
        ctx.fillStyle = g.color;
        ctx.beginPath();
        ctx.arc(g.x, g.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Collision with pacman
        if (Math.hypot(pacX - g.x, pacY - g.y) < 18) {
          setGameMessage('You lose!');
          setIsRunning(false);
        }
      });

      rafId = requestAnimationFrame(draw);
    };
    // Snake implementation
    let snake = [{ x: Math.floor(cols() / 2), y: Math.floor(rows() / 2) }];
    let dir = { x: 1, y: 0 };
    let pendingDir = dir;
    let food = { x: 2, y: 2 };
    let score = 0;
    let tickAccumulator = 0;
    const snakeSpeed = 8; // cells per second

    const placeFood = () => {
      const cmax = cols() - 2, rmax = rows() - 2;
      food = { x: 1 + Math.floor(Math.random() * cmax), y: 1 + Math.floor(Math.random() * rmax) };
    };
    placeFood();

    const setSnakeDirection = (d) => {
      const map = { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: 1 } };
      const nd = map[d] || dir;
      // prevent reversing
      if (nd.x === -dir.x && nd.y === -dir.y) return;
      pendingDir = nd;
    };

    // Bind controls depending on game
    setDirection = selectedGame === 'pacman' ? setPacmanDirection : setSnakeDirection;

    const updateSnake = (dt) => {
      tickAccumulator += dt;
      const stepTime = 1 / snakeSpeed;
      let moved = false;
      while (tickAccumulator >= stepTime) {
        tickAccumulator -= stepTime;
        dir = pendingDir;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
        // wrap borderless map
        head.x = (head.x + cols()) % cols();
        head.y = (head.y + rows()) % rows();
        // self collision
        if (snake.some((s, i) => i > 0 && s.x === head.x && s.y === head.y)) {
          setGameMessage('Game Over');
          setIsRunning(false);
          return true; // game over
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          score += 1;
          placeFood();
        } else {
          snake.pop();
        }
        moved = true;
      }
      return false; // not game over
    };

    let lastTs = 0;
    const loop = (ts) => {
      const dt = (ts - lastTs) / 1000 || 0;
      lastTs = ts;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width(), height());

      if (selectedGame === 'pacman') {
        draw(dt * 60); // reuse pacman draw at ~60fps scale
      } else if (selectedGame === 'snake') {
        // grid background
        ctx.strokeStyle = '#111';
        for (let c = 0; c < cols(); c++) {
          ctx.beginPath(); ctx.moveTo(c * cellSize, 0); ctx.lineTo(c * cellSize, height()); ctx.stroke();
        }
        for (let r = 0; r < rows(); r++) {
          ctx.beginPath(); ctx.moveTo(0, r * cellSize); ctx.lineTo(width(), r * cellSize); ctx.stroke();
        }

        if (updateSnake(dt)) return; // return only if game over

        // draw food
        ctx.fillStyle = '#E50914';
        ctx.fillRect(food.x * cellSize + 6, food.y * cellSize + 6, cellSize - 12, cellSize - 12);

        // draw snake
        ctx.fillStyle = '#00FF66';
        snake.forEach((s, i) => {
          ctx.fillRect(s.x * cellSize + 2, s.y * cellSize + 2, cellSize - 4, cellSize - 4);
        });

        // score
        ctx.fillStyle = '#fff';
        ctx.font = '14px sans-serif';
        ctx.fillText(`Score: ${score}`, 10, 18);
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', keyHandler);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [selectedGame, isRunning]);

  const [eatRun, setEatRun] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setEatRun(false), 1800); // run once on load
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative inline-block">
                {/* Animated Pacman eating the name once */}
                {eatRun && (
                  <svg width="28" height="28" viewBox="0 0 32 32" className="absolute left-0 top-1/2 -translate-y-1/2 animate-[pacrun_1.6s_linear_forwards]">
                    <defs>
                      <clipPath id="mouthClip"><path d="M16,16 L32,0 L32,32 Z"/></clipPath>
                    </defs>
                    <circle cx="16" cy="16" r="14" fill="#FFE000" clipPath="url(#mouthClip)"/>
                    <circle cx="12" cy="10" r="2" fill="#000"/>
                  </svg>
                )}
                <style>{`@keyframes pacrun{0%{transform:translate(0,-50%);}100%{transform:translate(140px,-50%);}}`}</style>
                <button
                  onClick={onHome}
                  className={`text-xl sm:text-3xl font-bold tracking-tight font-netflix text-arc-effect transition-colors cursor-pointer ${eatRun ? 'text-transparent' : 'text-netflixRed hover:text-red-400'}`}
                >
                  KEEGAN CHETTY
                </button>
              </div>
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
            <button
              onClick={() => { setSelectedGame('snake'); setIsRunning(false); }}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gray-900 border border-gray-700 hover:border-netflixRed transition-colors skill-card-hover"
            >
              <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop" alt="Snake" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 h-full w-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Snake</span>
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
              <div className="mb-4 flex items-center gap-3">
                <button onClick={() => setIsRunning(true)} className="bg-netflixRed text-white font-semibold px-5 py-2 rounded hover:bg-red-700 transition-colors">Start Game</button>
                {gameMessage && <span className="text-white/90">{gameMessage}</span>}
              </div>
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

        {selectedGame === 'snake' && (
          <div className="mt-6">
            {!isRunning && (
              <div className="mb-4 flex items-center gap-3">
                <button onClick={() => setIsRunning(true)} className="bg-netflixRed text-white font-semibold px-5 py-2 rounded hover:bg-red-700 transition-colors">Start Game</button>
                {gameMessage && <span className="text-white/90">{gameMessage}</span>}
              </div>
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


