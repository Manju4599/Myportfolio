import { useState, useEffect, useCallback } from 'react';
import { NAV_ITEMS, PROFILE } from '../data/portfolio';
import { useScrollProgress } from '../hooks/useReveal';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useScrollProgress();

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Active section detection
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Scroll progress */}
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <header className={`nav${scrolled ? ' nav--scrolled' : ''}`} role="banner">
        <nav className="nav__inner container" aria-label="Main navigation">
          {/* Logo */}
          <a href="#" className="nav__logo" onClick={(e) => handleNavClick(e, 'body')} aria-label="Back to top">
            <span className="nav__logo-initials">MR</span>
            <span className="nav__logo-name">Manjunath R</span>
          </a>

          {/* Desktop nav */}
          <ul className="nav__links" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav__link${activeSection === item.href.slice(1) ? ' nav__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="nav__actions">
            <a
              href={PROFILE.resumeUrl}
              className="btn btn--outline btn--sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className={`nav__burger${menuOpen ? ' nav__burger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`nav__mobile${menuOpen ? ' nav__mobile--open' : ''}`} aria-hidden={!menuOpen}>
          <ul className="nav__mobile-links" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav__mobile-link"
                  onClick={(e) => handleNavClick(e, item.href)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__mobile-actions">
            <a
              href={PROFILE.resumeUrl}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              Download Resume
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
