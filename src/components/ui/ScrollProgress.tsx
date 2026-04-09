import { useEffect, useRef } from 'react';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ScrollProgress() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topLabelRef = useRef<HTMLSpanElement>(null);
  const bottomLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const RAIL_W = 6;
    const RAIL_H = 120;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = RAIL_W * dpr;
    canvas.height = RAIL_H * dpr;
    canvas.style.width = `${RAIL_W}px`;
    canvas.style.height = `${RAIL_H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let rafId: number;
    let t = 0;

    const update = () => {
      t += 0.03;
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const clamped = Math.min(1, Math.max(0, scrollPct));

      ctx.clearRect(0, 0, RAIL_W, RAIL_H);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.beginPath();
      ctx.roundRect(0, 0, RAIL_W, RAIL_H, 3);
      ctx.fill();

      const fillH = clamped * RAIL_H;
      if (fillH > 0.5) {
        const r = Math.round(lerp(241, 45, clamped));
        const g = Math.round(lerp(148, 212, clamped));
        const b = Math.round(lerp(71, 179, clamped));

        const grad = ctx.createLinearGradient(0, 0, 0, fillH);
        grad.addColorStop(0, 'rgba(241, 148, 71, 0.85)');
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.85)`);

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(0, 0, RAIL_W, RAIL_H, 3);
        ctx.clip();
        ctx.fillStyle = grad;
        ctx.beginPath();

        const wobbleAmp = 1.5;
        const wobbleY = fillH + Math.sin(t * 2.5) * wobbleAmp;
        const meniscusDip = Math.sin(t * 1.8) * 0.8 + 1.5;

        ctx.moveTo(0, 0);
        ctx.lineTo(RAIL_W, 0);
        ctx.lineTo(RAIL_W, wobbleY - 1);
        ctx.quadraticCurveTo(RAIL_W / 2, wobbleY + meniscusDip, 0, wobbleY - 1);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0.5, wobbleY - 1);
        ctx.quadraticCurveTo(RAIL_W / 2, wobbleY + meniscusDip, RAIL_W - 0.5, wobbleY - 1);
        ctx.stroke();
        ctx.restore();
      }

      if (topLabelRef.current) {
        topLabelRef.current.style.opacity = String(clamped < 0.15 ? 1 : Math.max(0.3, 1 - clamped));
        topLabelRef.current.style.color = '#f19447';
      }
      if (bottomLabelRef.current) {
        bottomLabelRef.current.style.opacity = String(clamped > 0.85 ? 1 : Math.max(0.3, clamped));
        bottomLabelRef.current.style.color = '#2dd4b3';
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="scroll-progress-track">
      <span ref={topLabelRef} className="scroll-progress-label" style={{ color: '#f19447' }}>Overdrive</span>
      <canvas ref={canvasRef} className="scroll-progress-canvas" />
      <span ref={bottomLabelRef} className="scroll-progress-label" style={{ color: '#2dd4b3', opacity: 0.3 }}>Control</span>
    </div>
  );
}
