import { useEffect, useRef } from 'react';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ cx: 0, cy: 0, mx: 0, my: 0 });
  const isVisible = useRef(false);
  const scrollPctRef = useRef(0);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const outer = outerRef.current;
    const ripple = rippleRef.current;
    if (!outer || !ripple) return;

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (!isVisible.current) {
        isVisible.current = true;
        outer.style.opacity = '1';
      }
    };

    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollPctRef.current = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          outer.classList.add('cursor-hover');
          ripple.classList.add('cursor-ripple-active');
        });
        el.addEventListener('mouseleave', () => {
          outer.classList.remove('cursor-hover');
          ripple.classList.remove('cursor-ripple-active');
        });
      });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', () => outer.classList.add('cursor-press'));
    document.addEventListener('mouseup', () => outer.classList.remove('cursor-press'));
    window.addEventListener('scroll', onScroll, { passive: true });

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    let rafId: number;
    const animate = () => {
      const p = pos.current;
      p.cx += (p.mx - p.cx) * 0.13;
      p.cy += (p.my - p.cy) * 0.13;

      const sp = scrollPctRef.current;
      const r = Math.round(lerp(241, 45, sp));
      const g = Math.round(lerp(148, 212, sp));
      const b = Math.round(lerp(71, 179, sp));

      if (outer) {
        outer.style.left = `${p.cx}px`;
        outer.style.top = `${p.cy}px`;
        outer.style.setProperty('--cursor-r', String(r));
        outer.style.setProperty('--cursor-g', String(g));
        outer.style.setProperty('--cursor-b', String(b));
      }
      if (ripple) {
        ripple.style.left = `${p.cx}px`;
        ripple.style.top = `${p.cy}px`;
        ripple.style.borderColor = `rgba(${r},${g},${b},0.3)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-droplet" />
      <div ref={rippleRef} className="cursor-ripple-ring" />
    </>
  );
}
