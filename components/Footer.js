import Link from 'next/link';
import Logo from './Logo';
import { Mail, Globe, ArrowUpRight, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-navy-dark)',
        color: 'var(--color-ivory)',
        borderTop: '2px solid var(--color-gold)',
        paddingTop: '5rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem'
          }}
        >
          {/* Col 1: Brand & Identity */}
          <div>
            <Logo light />
            <p
              style={{
                color: 'rgba(244, 239, 230, 0.75)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                marginTop: '1.25rem',
                marginBottom: '1.5rem'
              }}
            >
              MYKA FASHION is an export-focused Indian apparel manufacturer specializing in artisanal block-printed kurtis, hand-embroidered chikankari tunics, linen co-ord sets, and conscious natural-fiber garments for international fashion houses and wholesale distributors.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: 'rgba(184, 137, 59, 0.12)',
                border: '1px solid rgba(184, 137, 59, 0.3)',
                fontSize: '0.75rem',
                color: 'var(--color-gold)'
              }}
            >
              <Globe size={14} />
              <span>Worldwide Seaport & Air Freight Export</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '1.4rem'
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>
                <Link
                  href="/"
                  style={{ color: 'rgba(244, 239, 230, 0.8)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                >
                  Home Lookbook
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  style={{ color: 'rgba(244, 239, 230, 0.8)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                >
                  Wholesale Catalogue (16 Styles)
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  style={{ color: 'rgba(244, 239, 230, 0.8)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                >
                  About & Export Capabilities
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{ color: 'rgba(244, 239, 230, 0.8)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                >
                  Request a Formal Quote
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  style={{ color: 'rgba(244, 239, 230, 0.8)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                >
                  Privacy Policy & Data Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Export Services */}
          <div>
            <h4
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '1.4rem'
              }}
            >
              Wholesale Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: 'rgba(244, 239, 230, 0.8)' }}>
              <li>• Low MOQ: 50–100 pieces per style</li>
              <li>• Private Label & Custom Branding</li>
              <li>• Woven Neck Labels & Hang Tags</li>
              <li>• Incoterms: EXW, FOB & CIF Delivery</li>
              <li>• Lucknow Chikankari Hand Embroidery</li>
              <li>• Bagru & Sanganeri Block Printing</li>
              <li>• Courier Sampling Dispatch via DHL / FedEx</li>
            </ul>
          </div>

          {/* Col 4: Contact & Inquiries */}
          <div>
            <h4
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '1.4rem'
              }}
            >
              Export Desk
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'rgba(244, 239, 230, 0.8)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Direct trade inquiries for retail chains, fashion brands, and wholesale importers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="mailto:wholesale@mykafashion.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-ivory)',
                  fontSize: '0.88rem'
                }}
              >
                <Mail size={16} style={{ color: 'var(--color-gold)' }} />
                <span>wholesale@mykafashion.com</span>
              </a>

              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#25D366',
                    fontSize: '0.88rem'
                  }}
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>

            <div style={{ marginTop: '1.75rem' }}>
              <Link
                href="/admin"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  color: 'rgba(244, 239, 230, 0.5)',
                  textDecoration: 'none'
                }}
              >
                <Lock size={12} />
                <span>Merchant / Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Verification & Compliance Note */}
        <div
          style={{
            borderTop: '1px solid rgba(184, 137, 59, 0.2)',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            fontSize: '0.78rem',
            color: 'rgba(244, 239, 230, 0.55)',
            lineHeight: 1.6
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>Demonstration Notice:</strong> All business statistics, capacity numbers, factory details, and customer testimonials displayed on this site represent demonstration data prepared for client review and are subject to formal verification by the business owner before commercial launch.
          </p>
        </div>

        {/* Copyright strip */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'rgba(244, 239, 230, 0.5)'
          }}
        >
          <div>
            &copy; {currentYear} MYKA FASHION. All rights reserved. B2B Wholesale & Indian Garment Export.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy" style={{ color: 'inherit' }}>
              Privacy & Cookies
            </Link>
            <Link href="/contact" style={{ color: 'inherit' }}>
              Export Inquiry
            </Link>
            <Link href="/admin/login" style={{ color: 'inherit' }}>
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
