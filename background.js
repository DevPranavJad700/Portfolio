/**
 * Pro Programmer Canvas Background Engine
 * Switchable Modes:
 * 1. 'particles' - Interactive Neural Particle Constellation
 * 2. 'matrix'    - Cyber Digital Matrix Rain
 * 3. 'grid'      - 3D Synthwave Horizon Grid
 */

class BackgroundEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.mode = 'particles'; // default mode
    this.animationFrameId = null;

    this.width = 0;
    this.height = 0;

    this.mouse = { x: -1000, y: -1000, radius: 150 };

    // Particle mode state
    this.particles = [];
    this.numParticles = 80;

    // Matrix mode state
    this.matrixColumns = [];
    this.matrixFontSize = 14;
    this.matrixChars = '0110010101110011010101010101001010010101010100101010011001010110101101010101010101010100101001010101001001010101001100101011010101010101010101010010010101';

    // Grid mode state
    this.gridOffset = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    this.initParticles();
    this.initMatrix();

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.initParticles();
    this.initMatrix();
  }

  setMode(newMode) {
    if (['particles', 'matrix', 'grid'].includes(newMode)) {
      this.mode = newMode;
      if (newMode === 'matrix') this.initMatrix();
    }
  }

  // --- Particle Mode Setup & Render ---
  initParticles() {
    this.particles = [];
    const count = Math.min(Math.floor((this.width * this.height) / 14000), 110);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(0, 243, 255, ' : 'rgba(138, 43, 226, '
      });
    }
  }

  renderParticles() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse repulsion/attraction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        p.x -= (dx / dist) * force * 3;
        p.y -= (dy / dist) * force * 3;
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + '0.8)';
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color + '1)';
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Draw connecting lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
        const maxDist = 130;
        if (distance < maxDist) {
          const alpha = (1 - distance / maxDist) * 0.35;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }
  }

  // --- Matrix Mode Setup & Render ---
  initMatrix() {
    const cols = Math.floor(this.width / this.matrixFontSize);
    this.matrixColumns = [];
    for (let i = 0; i < cols; i++) {
      this.matrixColumns[i] = Math.floor(Math.random() * -50);
    }
  }

  renderMatrix() {
    this.ctx.fillStyle = 'rgba(10, 13, 20, 0.15)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.font = `${this.matrixFontSize}px "Fira Code", monospace`;

    for (let i = 0; i < this.matrixColumns.length; i++) {
      const char = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
      const x = i * this.matrixFontSize;
      const y = this.matrixColumns[i] * this.matrixFontSize;

      if (Math.random() > 0.9) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#ffffff';
      } else {
        this.ctx.fillStyle = '#00ff88';
        this.ctx.shadowBlur = 4;
        this.ctx.shadowColor = '#00ff88';
      }

      this.ctx.fillText(char, x, y);
      this.ctx.shadowBlur = 0;

      if (y > this.height && Math.random() > 0.975) {
        this.matrixColumns[i] = 0;
      }
      this.matrixColumns[i]++;
    }
  }

  // --- Synthwave Grid Render ---
  renderGrid() {
    this.ctx.fillStyle = '#0a0d14';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const horizon = this.height * 0.45;
    const gridSpacing = 40;
    this.gridOffset = (this.gridOffset + 1.2) % gridSpacing;

    // Background horizon gradient glow
    const grad = this.ctx.createLinearGradient(0, 0, 0, horizon);
    grad.addColorStop(0, '#05070a');
    grad.addColorStop(1, 'rgba(138, 43, 226, 0.25)');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, horizon);

    // Horizon glowing neon line
    this.ctx.beginPath();
    this.ctx.moveTo(0, horizon);
    this.ctx.lineTo(this.width, horizon);
    this.ctx.strokeStyle = '#00f3ff';
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = '#00f3ff';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // Perspective lines emanating from horizon center
    const centerX = this.width / 2;
    const numLines = 30;
    for (let i = -numLines; i <= numLines; i++) {
      const targetX = centerX + i * (this.width / numLines) * 2;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, horizon);
      this.ctx.lineTo(targetX, this.height);
      this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.25)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    // Horizontal moving grid lines
    for (let y = horizon; y < this.height; y += gridSpacing) {
      const offsetY = y + (this.gridOffset * ((y - horizon) / (this.height - horizon)));
      if (offsetY <= this.height) {
        const lineAlpha = (offsetY - horizon) / (this.height - horizon);
        this.ctx.beginPath();
        this.ctx.moveTo(0, offsetY);
        this.ctx.lineTo(this.width, offsetY);
        this.ctx.strokeStyle = `rgba(138, 43, 226, ${lineAlpha * 0.6})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    }
  }

  animate() {
    if (this.mode === 'particles') {
      this.renderParticles();
    } else if (this.mode === 'matrix') {
      this.renderMatrix();
    } else if (this.mode === 'grid') {
      this.renderGrid();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

// Global initialization helper
window.addEventListener('DOMContentLoaded', () => {
  window.bgEngine = new BackgroundEngine('bg-canvas');
});
