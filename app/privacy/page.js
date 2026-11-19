import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy & Data Protection Terms',
  description: 'International B2B data collection, GDPR compliance, and cookie policy for MYKA FASHION trade inquiries.'
};

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <span
          style={{
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'block',
            marginBottom: '8px'
          }}
        >
          Compliance & Legal Terms
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-navy)',
            fontSize: '2.8rem',
            margin: '0 0 1.5rem 0'
          }}
        >
          Privacy Policy & B2B Data Terms
        </h1>

        <p style={{ fontSize: '0.88rem', color: 'var(--color-gray-subtle)', marginBottom: '2.5rem' }}>
          Last Updated: November 2026 • Governed by Indian Information Technology Act and European General Data Protection Regulation (GDPR).
        </p>

        <div style={{ color: 'var(--color-charcoal-light)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.8rem' }}>
            1. Scope of B2B Wholesale Data Collection
          </h3>
          <p>
            MYKA FASHION operates an inquiry-based business-to-business (B2B) garment export catalogue. We do not conduct consumer retail e-commerce or process online consumer credit card transactions. Information collected through our inquiry forms (including company name, business email, contact phone, delivery country, GST numbers, and style shortlists) is utilized solely for commercial communication, proforma quotation, and export order processing.
          </p>

          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.8rem' }}>
            2. Confidentiality of Buyer Designs & Tech Packs
          </h3>
          <p>
            Any proprietary artwork, tech packs, measurement specifications, or brand label designs submitted through our inquiry portals or via direct email remain the exclusive intellectual property of the buyer. MYKA FASHION does not share, disclose, or replicate proprietary client designs for any third party.
          </p>

          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.8rem' }}>
            3. Cookies & Local Storage
          </h3>
          <p>
            Our website uses browser <code>localStorage</code> to preserve your shortlisted wholesale styles between page visits and browser refreshes so your inquiry list remains intact without requiring account creation. We also use functional cookies to record your cookie consent choice. Optional analytical measurement (e.g. Google Analytics 4) may be utilized to analyze international geographic interest in our collections.
          </p>

          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.8rem' }}>
            4. Third-Party Data Processors
          </h3>
          <p>
            We process corporate transactional communications and database storage through industry-standard secure infrastructure providers:
          </p>
          <ul>
            <li><strong>Supabase:</strong> Encrypted PostgreSQL database hosted with Row Level Security (RLS) ensuring buyer inquiry data cannot be read by unauthorized public users.</li>
            <li><strong>Resend:</strong> Transactional email delivery service used to dispatch your inquiry acknowledgment reference and sales team notifications.</li>
          </ul>

          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.8rem' }}>
            5. Your Data Rights & Contact Information
          </h3>
          <p>
            International buyers (including UK, EU, UAE, and US entities) retain the right to request access to their inquiry history, update contact details, or request full deletion of their records from our database at any time by contacting our trade desk:
          </p>
          <div style={{ backgroundColor: 'var(--color-ivory)', padding: '16px 20px', borderLeft: '3px solid var(--color-gold)', margin: '1.5rem 0' }}>
            <strong>MYKA FASHION Export Desk — Data Protection</strong><br />
            Email: <a href="mailto:wholesale@mykafashion.com" style={{ color: 'var(--color-navy)' }}>wholesale@mykafashion.com</a><br />
            Jurisdiction: Jaipur &amp; New Delhi, India
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
            <Link href="/" className="btn btn-primary btn-sm">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
