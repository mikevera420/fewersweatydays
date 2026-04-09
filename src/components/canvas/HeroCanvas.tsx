import { useEffect, useRef } from 'react';

/* ── helpers ─────────────────────────────────────────── */
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutQuad = (t: number) => t * (2 - t);

const TEAL = { r: 45, g: 212, b: 179 };

function tealColor(alpha: number): string {
  return `rgba(${TEAL.r},${TEAL.g},${TEAL.b},${alpha})`;
}

/* ── types ───────────────────────────────────────────── */
interface Bead {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;       // max size before it might streak
  growRate: number;         // px per frame
  opacity: number;
  targetOpacity: number;   // what opacity to fade in to
  specularOffset: number;  // angle for highlight
  streaking: boolean;
  vy: number;              // streak velocity (only when streaking)
  trail: { x: number; y: number; opacity: number }[];
  age: number;
}

/* ── component ───────────────────────────────────────── */
export default function HeroCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const scrollPctRef = useRef(0);
  const mouseRef     = useRef({ x: -9999, y: -9999, active: false });
  const beadsRef     = useRef<Bead[]>([]);
  const frameRef     = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0;

    /* ── resize ─────────────────────────────────────── */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── scroll ─────────────────────────────────────── */
    const heroEl = canvas.parentElement;
    const onScroll = () => {
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const progress = -rect.top / (rect.height || 1);
      scrollPctRef.current = Math.max(0, Math.min(1, progress));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── mouse ──────────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = (
        e.clientY >= rect.top && e.clientY <= rect.bottom &&
        e.clientX >= rect.left && e.clientX <= rect.right
      );
    };
    const onMouseLeave = () => { mouseRef.current.active = false; };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    /* ── spawn a bead ───────────────────────────────── */
    const spawnBead = (x?: number, y?: number, startLarge?: boolean) => {
      const maxR = rand(4, 12);
      beadsRef.current.push({
        x: x ?? rand(w * 0.03, w * 0.97),
        y: y ?? rand(h * 0.03, h * 0.97),
        radius: startLarge ? rand(maxR * 0.3, maxR * 0.6) : rand(0.8, 2),
        maxRadius: maxR,
        growRate: startLarge ? rand(0.02, 0.04) : rand(0.005, 0.018),
        opacity: 0,  // always start invisible — fade in naturally
        targetOpacity: rand(0.14, 0.32),
        specularOffset: rand(0, Math.PI * 2),
        streaking: false,
        vy: 0,
        trail: [],
        age: 0,
      });
    };

    /* seed initial beads — start mid-size but fade in */
    const initialCount = Math.round(lerp(22, 8, 0));
    for (let i = 0; i < initialCount; i++) spawnBead(undefined, undefined, true);

    /* ── animation loop ─────────────────────────────── */
    let rafId: number;

    const draw = () => {
      if (document.hidden) { rafId = requestAnimationFrame(draw); return; }
      const sp = scrollPctRef.current;
      frameRef.current++;
      ctx.clearRect(0, 0, w, h);

      /* ── background: subtle foggy wash ────────────── */
      const fogAlpha = lerp(0.035, 0.006, easeOutQuad(sp));
      const fogGrad = ctx.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h * 0.4, Math.max(w, h) * 0.7);
      fogGrad.addColorStop(0, tealColor(fogAlpha));
      fogGrad.addColorStop(0.6, tealColor(fogAlpha * 0.4));
      fogGrad.addColorStop(1, 'rgba(250,248,245,0)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, w, h);

      /* ── target bead count based on scroll ────────── */
      const targetCount = Math.round(lerp(22, 5, easeOutQuad(sp)));

      /* nucleate new beads if below target */
      if (beadsRef.current.length < targetCount && frameRef.current % 14 === 0) {
        spawnBead();
      }

      /* ── mouse repulsion ──────────────────────────── */
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;
      const repelRadius = 80;

      /* ── update & draw beads ──────────────────────── */
      const alive: Bead[] = [];

      for (const bead of beadsRef.current) {
        bead.age++;

        /* natural fade-in: ramp opacity over ~1.5s */
        if (bead.opacity < bead.targetOpacity && !bead.streaking) {
          bead.opacity = Math.min(bead.targetOpacity, bead.opacity + 0.004);
        }

        /* evaporation: if we have too many beads, older small ones fade */
        if (beadsRef.current.length > targetCount + 5 && bead.radius < 4 && !bead.streaking) {
          bead.opacity -= 0.004;
          if (bead.opacity <= 0) continue;
        }

        if (!bead.streaking) {
          /* grow */
          bead.radius += bead.growRate;

          /* mouse repulsion — push beads away from cursor */
          if (mouseActive) {
            const dx = bead.x - mx;
            const dy = bead.y - my;
            const dist = Math.hypot(dx, dy);
            if (dist < repelRadius && dist > 0) {
              const force = (1 - dist / repelRadius) * 1.2;
              bead.x += (dx / dist) * force;
              bead.y += (dy / dist) * force;
            }
          }

          /* chance to start streaking once large enough */
          if (bead.radius >= bead.maxRadius * 0.85 && Math.random() < 0.003) {
            bead.streaking = true;
            bead.vy = rand(0.3, 0.8);
          }
        } else {
          /* streaking downward */
          bead.vy += 0.015; // gentle gravity acceleration
          bead.y += bead.vy;
          bead.radius *= 0.998; // slowly shrink as water leaves

          /* leave trail points */
          if (frameRef.current % 2 === 0) {
            bead.trail.push({ x: bead.x, y: bead.y, opacity: bead.opacity * 0.5 });
          }
          /* fade trail */
          for (const tp of bead.trail) tp.opacity *= 0.97;
          bead.trail = bead.trail.filter(tp => tp.opacity > 0.01);

          /* off screen? */
          if (bead.y > h + 20) continue;
        }

        /* ── merge check: absorb nearby smaller beads ── */
        if (!bead.streaking && bead.age > 30) {
          for (let j = beadsRef.current.length - 1; j >= 0; j--) {
            const other = beadsRef.current[j];
            if (other === bead || other.streaking) continue;
            const dist = Math.hypot(bead.x - other.x, bead.y - other.y);
            const touchDist = bead.radius + other.radius;
            if (dist < touchDist * 0.8) {
              /* absorb smaller into larger */
              if (other.radius < bead.radius) {
                const area = Math.PI * other.radius * other.radius;
                bead.radius = Math.min(bead.maxRadius * 1.3, Math.sqrt((Math.PI * bead.radius * bead.radius + area) / Math.PI));
                bead.opacity = Math.min(0.4, Math.max(bead.opacity, other.opacity));
                other.opacity = 0; // mark for removal
              }
            }
          }
        }

        if (bead.opacity <= 0) continue;

        /* ── draw streak trail ──────────────────────── */
        if (bead.trail.length > 1) {
          for (let t = 0; t < bead.trail.length; t++) {
            const tp = bead.trail[t];
            const trailWidth = bead.radius * lerp(0.3, 0.8, t / bead.trail.length);
            ctx.fillStyle = tealColor(tp.opacity * 0.3);
            ctx.beginPath();
            ctx.ellipse(tp.x, tp.y, trailWidth, trailWidth * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        /* ── draw bead body ─────────────────────────── */
        const bodyAlpha = bead.opacity * lerp(1, 0.6, easeOutQuad(sp));

        /* outer body — soft circle */
        const bodyGrad = ctx.createRadialGradient(
          bead.x, bead.y, bead.radius * 0.1,
          bead.x, bead.y, bead.radius
        );
        bodyGrad.addColorStop(0, tealColor(bodyAlpha * 0.6));
        bodyGrad.addColorStop(0.5, tealColor(bodyAlpha * 0.35));
        bodyGrad.addColorStop(1, tealColor(bodyAlpha * 0.08));
        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.arc(bead.x, bead.y, bead.radius, 0, Math.PI * 2);
        ctx.fill();

        /* rim/edge ring — gives it that water bead definition */
        ctx.strokeStyle = tealColor(bodyAlpha * 0.25);
        ctx.lineWidth = Math.max(0.3, bead.radius * 0.12);
        ctx.beginPath();
        ctx.arc(bead.x, bead.y, bead.radius * 0.9, 0, Math.PI * 2);
        ctx.stroke();

        /* specular highlight — small bright crescent */
        if (bead.radius > 3) {
          const specX = bead.x + Math.cos(bead.specularOffset) * bead.radius * 0.35;
          const specY = bead.y + Math.sin(bead.specularOffset) * bead.radius * 0.35;
          const specR = bead.radius * 0.25;
          const specGrad = ctx.createRadialGradient(specX, specY, 0, specX, specY, specR);
          specGrad.addColorStop(0, `rgba(255,255,255,${bodyAlpha * 0.35})`);
          specGrad.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.fillStyle = specGrad;
          ctx.beginPath();
          ctx.arc(specX, specY, specR, 0, Math.PI * 2);
          ctx.fill();
        }

        alive.push(bead);
      }

      beadsRef.current = alive;

      /* cap total beads */
      if (beadsRef.current.length > 35) {
        beadsRef.current = beadsRef.current.slice(-35);
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="nervous-system-canvas" />;
}
