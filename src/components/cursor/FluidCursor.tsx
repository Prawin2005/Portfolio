import { useEffect, useRef, useState } from "react";

interface FluidParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const FluidCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch-only / coarse pointer device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking state
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      vx: 0,
      vy: 0,
      speed: 0,
      isHovered: false
    };

    const particles: FluidParticle[] = [];
    const ripples: Ripple[] = [];
    const maxParticles = 60;

    const colors = [
      "rgba(0, 240, 255, ",   // Cyan
      "rgba(99, 102, 241, ",  // Indigo
      "rgba(16, 185, 129, ",  // Emerald
      "rgba(56, 189, 248, "   // Sky
    ];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest(".interactive-target") ||
        target?.closest("[data-cursor]")
      ) {
        mouse.isHovered = true;
      } else {
        mouse.isHovered = false;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 42,
        alpha: 0.8
      });

      // Emit small burst of splash particles
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 4,
          alpha: 0.8,
          decay: 0.02 + Math.random() * 0.03,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    let animationId: number;

    const render = () => {
      // Smooth interpolation (lerp)
      const prevX = mouse.x;
      const prevY = mouse.y;
      mouse.x += (mouse.targetX - mouse.x) * 0.35;
      mouse.y += (mouse.targetY - mouse.y) * 0.35;
      mouse.vx = mouse.x - prevX;
      mouse.vy = mouse.y - prevY;
      mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      ctx.clearRect(0, 0, width, height);

      // Spawn fluid trail particles based on movement velocity
      if (mouse.speed > 0.6) {
        const spawnCount = Math.min(Math.floor(mouse.speed / 3) + 1, 3);
        for (let i = 0; i < spawnCount; i++) {
          if (particles.length < maxParticles) {
            const jitter = (Math.random() - 0.5) * 4;
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
              x: mouse.x + jitter,
              y: mouse.y + jitter,
              vx: -mouse.vx * 0.15 + (Math.random() - 0.5) * 1.5,
              vy: -mouse.vy * 0.15 + (Math.random() - 0.5) * 1.5,
              size: Math.min(4 + mouse.speed * 0.4, 14),
              alpha: Math.min(0.35 + mouse.speed * 0.03, 0.75),
              decay: 0.035,
              color
            });
          }
        }
      }

      // Render & update fluid trail particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.95;

        if (p.alpha <= 0 || p.size <= 0.5) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00f0ff";
        ctx.fill();
        ctx.restore();
      }

      // Render & update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.2;
        r.alpha -= 0.04;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Render glowing central cursor dot & fluid aura
      const baseRadius = mouse.isHovered ? 12 : 5;
      const stretch = Math.min(mouse.speed * 0.25, 8);

      ctx.save();
      ctx.translate(mouse.x, mouse.y);
      const angle = Math.atan2(mouse.vy, mouse.vx);
      if (mouse.speed > 1) {
        ctx.rotate(angle);
      }

      // Fluid outer glow aura
      const glowGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, baseRadius + stretch + 12);
      glowGrad.addColorStop(0, "rgba(0, 240, 255, 0.45)");
      glowGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.2)");
      glowGrad.addColorStop(1, "rgba(0, 240, 255, 0)");

      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius + stretch + 8, baseRadius + 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Solid central core
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius + stretch * 0.5, baseRadius, 0, 0, Math.PI * 2);
      ctx.fillStyle = mouse.isHovered ? "#ffffff" : "#00f0ff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00f0ff";
      ctx.fill();

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
