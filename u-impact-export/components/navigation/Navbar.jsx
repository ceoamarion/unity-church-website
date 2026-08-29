import React, { useState, useEffect } from 'react';
import { Sparkles, HeartHandshake, Menu, X, Compass, Layers, Calendar, Volume2, VolumeX } from 'lucide-react';
import { impactAudio } from '../intro/ImpactAudio';
import './Navbar.css';

export default function Navbar({ onGetInvolvedClick }) {
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

  return (
    <header className={`u-impact-nav-wrapper ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner glass-nav">
        {/* Brand Logo */}
        <a 
          href="#cinematic-intro" 
          className="nav-brand"
          onClick={(e) => handleNavClick(e, '#cinematic-intro')}
        >
          <span className="nav-brand-orb pulse-gold"></span>
          <div className="nav-brand-text">
            <span className="brand-primary font-display">U IMPACT</span>
            <span className="brand-sub font-editorial">COMMUNITY PLATFORM</span>
          </div>
        </a>

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

          <button 
            className="btn-primary nav-cta-btn"
            onClick={onGetInvolvedClick}
          >
            <HeartHandshake size={16} />
            <span>GET INVOLVED</span>
          </button>

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
            <button 
              className="btn-primary mobile-cta-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onGetInvolvedClick();
              }}
            >
              <HeartHandshake size={18} />
              GET INVOLVED
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
