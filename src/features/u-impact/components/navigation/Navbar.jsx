import React, { useState, useEffect } from 'react';
import { Sparkles, HeartHandshake, Menu, X, Compass, Layers, Calendar, Volume2, VolumeX } from 'lucide-react';
import { impactAudio } from '../intro/ImpactAudio';
import uImpactLogo from '../../../../assets/u-impact-icon-transparent.png';
import './Navbar.css';

export default function Navbar({ onGetInvolvedClick, onReturnToChurch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = impactAudio.toggleAudio();
    setIsAudioActive(active);
  };

  const navLinks = [
    { label: "The Beginning", href: "#cinematic-intro" },
    { label: "Our Pillars", href: "#pillars" },
    { label: "Stories of Change", href: "#stories" },
    { label: "Physical Spaces", href: "#construction" },
    { label: "Upcoming", href: "#upcoming" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReturnChurch = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onReturnToChurch) {
      onReturnToChurch();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <header className={`u-impact-nav-wrapper ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner glass-nav">
        {/* Brand Group */}
        <div className="nav-brand-group">
          <a 
            href="/"
            className="nav-return-church"
            onClick={handleReturnChurch}
            title="Return to Unity Christian Church Homepage"
          >
            ← Church Home
          </a>
          <span className="nav-brand-sep" aria-hidden="true" />
          <a 
            href="#cinematic-intro" 
            className="nav-brand"
            onClick={(e) => handleNavClick(e, '#cinematic-intro')}
            title="U Impact — United We Impact"
          >
            <img 
              src={uImpactLogo} 
              alt="U Impact Logo" 
              className="nav-brand-logo"
            />
            <div className="nav-brand-text">
              <span className="brand-primary font-display">U IMPACT</span>
              <span className="brand-sub font-editorial">COMMUNITY PLATFORM</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-links font-editorial">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="nav-link-item"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Nav Actions */}
        <div className="nav-actions">
          <button 
            className={`nav-audio-btn ${isAudioActive ? 'active' : ''}`}
            onClick={handleAudioToggle}
            title={isAudioActive ? "Mute Atmosphere" : "Unmute Atmosphere"}
            aria-label="Sound Toggle"
          >
            {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <a 
            href="https://unitycc.breezechms.com/give/online"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary nav-cta-btn"
            style={{ textDecoration: 'none' }}
          >
            <HeartHandshake size={16} />
            <span>GET INVOLVED</span>
          </a>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer glass-panel animate-fade-in">
          <div className="mobile-drawer-links font-editorial">
            <a
              href="/"
              className="mobile-link-item"
              style={{ color: 'var(--accent-gold-light)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleReturnChurch(e);
              }}
            >
              ← Return to Church Home
            </a>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-link-item"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="https://unitycc.breezechms.com/give/online"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mobile-cta-btn"
              style={{ textDecoration: 'none' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <HeartHandshake size={18} />
              GET INVOLVED
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
