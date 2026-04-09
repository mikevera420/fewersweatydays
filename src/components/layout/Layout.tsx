import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import CustomCursor from '../ui/CustomCursor';
import ScrollProgress from '../ui/ScrollProgress';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/work-with-me', label: 'Work With Me' },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <nav className="site-nav">
        <div className="site-nav-inner">
          <Link to="/" className="site-logo" data-cursor-hover>FewerSweatyDays</Link>
          <div className="site-nav-links desktop-only">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={`site-nav-link${location.pathname === link.to ? ' active' : ''}`} data-cursor-hover>
                {link.label}
              </Link>
            ))}
          </div>
          <Link to="/work-with-me" className="site-nav-cta desktop-only" data-cursor-hover>Book a Session</Link>
          <button className="mobile-menu-btn mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{link.label}</Link>
            ))}
            <Link to="/work-with-me" className="mobile-menu-cta" onClick={() => setMenuOpen(false)}>Book a Session</Link>
          </div>
        )}
      </nav>

      <main><Outlet /></main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <span className="site-footer-logo">FewerSweatyDays</span>
            <p className="site-footer-tagline">Fewer sweaty days through lifestyle change. Real answers for people with hyperhidrosis who've been ignored.</p>
          </div>
          <div className="site-footer-links">
            <div className="site-footer-col">
              <h4>Navigate</h4>
              {navLinks.map((link) => (<Link key={link.to} to={link.to}>{link.label}</Link>))}
            </div>
            <div className="site-footer-col">
              <h4>Connect</h4>
              <a href="https://avantia.health" target="_blank" rel="noopener noreferrer">Avantia Health Optimization</a>
              <a href="https://www.linkedin.com/in/mikevera/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:hello@fewersweatydays.com">Contact</a>
            </div>
            <div className="site-footer-col">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
          <div className="site-footer-bottom">
            <p className="site-footer-disclaimer">Lifestyle guidance only. Not medical advice. FewerSweatyDays is part of the Avantia Health Optimization family.</p>
            <p className="site-footer-copy">&copy; {new Date().getFullYear()} FewerSweatyDays. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
