import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power2.out' });
      },
    });
    return () => trigger.kill();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: 'translateY(20px)' }}>
      {children}
    </div>
  );
}
