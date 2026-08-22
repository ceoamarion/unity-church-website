import React, { useState } from 'react';
import { X, HeartHandshake, Sparkles, CheckCircle2, User, Mail, Phone, ArrowRight } from 'lucide-react';

const ROLES = [
  { id: 'volunteer', title: 'Rapid Volunteer Squad', desc: 'Join on-the-ground food distribution, cleanups, and emergency support.' },
  { id: 'mentor', title: 'Youth STEM & Creative Mentor', desc: 'Guide next-gen leaders in software, media, academic success, and robotics.' },
  { id: 'food', title: 'Food Sanctuary Organizer', desc: 'Help manage community pantries, harvest gleaning, and fresh prep.' },
  { id: 'donor', title: 'Impact Donor & Patron', desc: 'Fund micro-grants, educational toolkits, and housing stabilization funds.' },
  { id: 'partner', title: 'Civic or Corporate Partner', desc: 'Bring your organization, school, or business to co-create initiatives.' }
];

export default function GetInvolvedModal({ isOpen, onClose }) {
  const [selectedRole, setSelectedRole] = useState('volunteer');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', note: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      backgroundColor: 'rgba(5, 6, 8, 0.85)',
      backdropFilter: 'blur(16px)',
      animation: 'fadeInModal 0.3s ease-out'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '24px',
        border: '1px solid var(--border-gold)',
        padding: 'clamp(1.75rem, 4vw, 3rem)',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px var(--accent-gold-glow)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div style={{ marginBottom: '2rem' }}>
              <div className="scene-badge" style={{ marginBottom: '1rem' }}>
                <HeartHandshake size={14} className="text-accent-gold" />
                <span className="badge-text">JOIN U IMPACT</span>
              </div>
              <h3 className="font-display text-gradient-gold" style={{ fontSize: '1.85rem', fontWeight: 800, lineHeight: 1.2 }}>
                Make your impact where you are.
              </h3>
              <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Select how you'd like to get involved. We'll connect you directly with an initiative team in your area.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Role Selection */}
              <div>
                <label className="font-editorial" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-gold-light)', display: 'block', marginBottom: '0.75rem' }}>
                  1. Choose Your Impact Pathway
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {ROLES.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: selectedRole === role.id ? 'var(--accent-gold)' : 'var(--border-glass)',
                        background: selectedRole === role.id ? 'rgba(229, 169, 104, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-display" style={{ fontSize: '1rem', fontWeight: 600, color: selectedRole === role.id ? 'var(--accent-gold-light)' : 'var(--text-primary)' }}>
                          {role.title}
                        </span>
                        {selectedRole === role.id && <CheckCircle2 size={16} className="text-accent-gold" />}
                      </div>
                      <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {role.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label className="font-editorial" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-gold-light)', display: 'block', marginBottom: '0.75rem' }}>
                  2. Your Details
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        background: 'rgba(5, 6, 8, 0.6)',
                        border: '1px solid var(--border-glass-bright)',
                        color: 'var(--text-primary)',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        background: 'rgba(5, 6, 8, 0.6)',
                        border: '1px solid var(--border-glass-bright)',
                        color: 'var(--text-primary)',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Optional: Tell us about your background, neighborhood, or ideas..."
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(5, 6, 8, 0.6)',
                    border: '1px solid var(--border-glass-bright)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}
              >
                <Sparkles size={18} />
                CONFIRM MY PLEDGE TO IMPACT
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(229, 169, 104, 0.15)',
              border: '2px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--accent-gold)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 className="font-display text-gradient-gold" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Your spark is set in motion!
            </h3>

            <p className="font-sans" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Thank you, <strong style={{ color: '#ffffff' }}>{formData.name || 'Friend'}</strong>. One action becomes many. Our community coordinator will reach out to you within 24 hours.
            </p>

            <button
              onClick={handleReset}
              className="btn-primary"
              style={{ padding: '0.85rem 2rem' }}
            >
              RETURN TO EXPLORING
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
