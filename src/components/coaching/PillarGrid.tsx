import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Apple, Activity, Users, Moon, ShieldAlert, type LucideIcon } from 'lucide-react';

interface Pillar {
  num: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgTint: string;
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  { num: '01', name: 'Stress Management', icon: Brain, color: '#e87c5d', bgTint: 'rgba(232,124,93,0.1)', title: 'Stress Management — Rewiring the Response', body: 'Your body can\'t tell the difference between real danger and a Monday morning meeting. Both flip the same switch — and the sweat follows. Stress management for HH isn\'t about "calming down." It\'s about teaching your system that the meeting isn\'t the threat. We work on practical techniques that lower your stress baseline over time, so your body stops treating every day like an emergency.' },
  { num: '02', name: 'Nutrition', icon: Apple, color: '#5dbd72', bgTint: 'rgba(93,189,114,0.1)', title: 'Nutrition — Feeding a Calmer System', body: 'What you eat affects how wired your system runs. Certain foods help your body stay calm. Others push an already-overactive system further into overdrive. This isn\'t a diet — it\'s understanding which foods help and which ones don\'t. We look at the specific nutritional gaps and triggers that are unique to your situation.' },
  { num: '03', name: 'Physical Activity', icon: Activity, color: '#5b8def', bgTint: 'rgba(91,141,239,0.1)', title: 'Physical Activity — Building Resilience', body: 'Exercise is tricky with HH. The wrong kind triggers the exact episodes you\'re trying to avoid, which makes you dread working out. The right kind teaches your body to rev up and cool down more efficiently. We find the approach that builds resilience without reinforcing avoidance.' },
  { num: '04', name: 'Social Support', icon: Users, color: '#e6735b', bgTint: 'rgba(230,115,91,0.1)', title: 'Social Support — Breaking the Isolation Loop', body: 'HH is one of the most isolating conditions that nobody talks about. The avoidance makes sense — if handshakes trigger panic, you stop shaking hands. If social events mean visible sweating, you stop going. But isolation makes everything worse. We work on gradual reintegration and building a support network that actually understands what you\'re dealing with.' },
  { num: '05', name: 'Circadian Health', icon: Moon, color: '#8b7ae8', bgTint: 'rgba(139,122,232,0.1)', title: 'Circadian Health — Resetting the Clock', body: 'Your body resets during deep sleep. If your sleep is disrupted — and for most people with HH, it is — you\'re starting every day already fired up before you even get out of bed. We work on light exposure, temperature, sleep timing, and the specific habits that give your body a real chance to recover overnight. Most people with HH have never had this conversation.' },
  { num: '06', name: 'Toxic Exposure', icon: ShieldAlert, color: '#e8a44a', bgTint: 'rgba(232,164,74,0.1)', title: 'Toxic Exposure — Reducing the Load', body: 'Things in your environment that most people tolerate without issue can push a sensitive system over the edge. This isn\'t about living in a bubble — it\'s about identifying and reducing the specific exposures that amplify your symptoms. We look at what\'s adding unnecessary load to an already-overloaded system.' },
];

export default function PillarGrid() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const expandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const tiles = gridRef.current.querySelectorAll('.pillar-tile');
    tiles.forEach((tile, i) => {
      ScrollTrigger.create({
        trigger: tile,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(tile, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out' });
        },
      });
    });
  }, []);

  const handleClick = (idx: number) => {
    if (activeIdx === idx) { setActiveIdx(null); }
    else {
      setActiveIdx(idx);
      setTimeout(() => expandRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
  };

  return (
    <>
      <div ref={gridRef} className="pillar-grid">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={p.num} className={`pillar-tile${activeIdx === i ? ' active' : ''}`} style={{ opacity: 0, transform: 'translateY(20px)', borderColor: activeIdx === i ? p.color : undefined, boxShadow: activeIdx === i ? `0 0 20px ${p.bgTint}, 0 4px 16px rgba(0,0,0,0.06)` : undefined }} onClick={() => handleClick(i)} data-cursor-hover>
              <div className="pillar-tile-icon" style={{ background: p.bgTint, boxShadow: `0 0 16px ${p.bgTint}` }}>
                <Icon size={28} style={{ color: p.color }} strokeWidth={activeIdx === i ? 2.5 : 2} />
              </div>
              <div className="pillar-tile-num">{p.num}</div>
              <div className="pillar-tile-name">{p.name}</div>
            </div>
          );
        })}
      </div>
      <div ref={expandRef} className={`pillar-expand${activeIdx !== null ? ' open' : ''}`}>
        {activeIdx !== null && (
          <>
            <h4 className="pillar-expand-title">{pillars[activeIdx].title}</h4>
            <p className="pillar-expand-body">{pillars[activeIdx].body}</p>
          </>
        )}
      </div>
    </>
  );
}
