'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('myka_cookie_consent');
      if (!consent) {
        setShowBanner(true);
      }
    } catch (e) {
      // Ignore if localStorage unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('myka_cookie_consent', 'accepted');
    } catch (e) {}
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('myka_cookie_consent', 'declined');
    } catch (e) {}
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        backgroundColor: 'var(--color-navy-dark)',
        borderTop: '1px solid var(--color-gold)',
        color: 'var(--color-ivory)',
        padding: '16px 24px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.25)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ flex: '1 1 600px', fontSize: '0.85rem', lineHeight: 1.5 }}>
          <span>
            We use essential cookies to maintain your wholesale inquiry shortlist and optional analytical cookies to evaluate international B2B buyer interest in accordance with GDPR and international data standards.
          </span>{' '}
          <Link
            href="/privacy"
            style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}
          >
            Review our Privacy Policy.
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleDecline}
            className="btn btn-outline-white btn-sm"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="btn btn-gold btn-sm"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
