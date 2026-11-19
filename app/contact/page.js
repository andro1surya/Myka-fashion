'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useInquiry } from '../../context/InquiryContext';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Trash2,
  FileText,
  Mail,
  Clock,
  Globe,
  Upload,
  MessageCircle,
  HelpCircle,
  Loader2
} from 'lucide-react';

const COUNTRIES = [
  'United Kingdom',
  'United Arab Emirates',
  'United States',
  'India',
  'Germany',
  'Australia',
  'France',
  'Canada',
  'Netherlands',
  'Spain',
  'Italy',
  'Saudi Arabia',
  'Kuwait',
  'Qatar',
  'Singapore',
  'South Africa',
  'Other Country'
];

const BUYER_TYPES = [
  'Boutique',
  'Wholesaler',
  'Importer',
  'Brand',
  'Department Store',
  'Other'
];

export default function ContactPage() {
  const { items, removeItem, updateQuantity, clearInquiry, totalItemsCount } = useInquiry();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    phone: '',
    companyName: '',
    country: 'United Kingdom',
    buyerType: 'Boutique',
    gstNumber: '',
    estimatedQuantity: '',
    message: '',
    honeypot: '' // Anti-spam trap
  });

  const [attachedFile, setAttachedFile] = useState(null);
  const [fileBase64, setFileBase64] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  // Auto-calculate default estimated quantity from shortlisted items
  useEffect(() => {
    if (items.length > 0 && !formData.estimatedQuantity) {
      const sum = items.reduce((acc, it) => acc + (Number(it.quantity) || 0), 0);
      setFormData((prev) => ({ ...prev, estimatedQuantity: String(sum || 50) }));
    }
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit. Please upload a smaller tech pack or specification document.');
      return;
    }

    setAttachedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot spam check
    if (formData.honeypot) {
      return;
    }

    // Email validation
    if (!formData.businessEmail || !formData.businessEmail.includes('@')) {
      setErrorMessage('Please provide a valid corporate or business email.');
      return;
    }

    // Phone validation
    if (!formData.phone || formData.phone.length < 6) {
      setErrorMessage('Please provide a complete contact phone or WhatsApp number including country dial code.');
      return;
    }

    // Conditional India GST check
    if (formData.country === 'India' && !formData.gstNumber) {
      setErrorMessage('GST Number is mandatory for domestic Indian wholesale trade invoicing.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName,
        businessEmail: formData.businessEmail,
        phone: formData.phone,
        companyName: formData.companyName,
        country: formData.country,
        buyerType: formData.buyerType,
        gstNumber: formData.country === 'India' ? formData.gstNumber : null,
        estimatedQuantity: Number(formData.estimatedQuantity) || 50,
        message: formData.message,
        attachmentUrl: fileBase64 || null,
        items: items.map((it) => ({
          sku: it.sku,
          productName: it.name,
          quantity: it.quantity,
          colorNotes: it.notes || it.color || '',
          isSampleRequest: it.isSample
        }))
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmissionSuccess(result.data);
      clearInquiry();
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'An error occurred while submitting your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-ivory-light)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* ----------------------------------------------------
          PAGE HEADER
          ---------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-navy)',
          color: 'var(--color-ivory)',
          padding: '4.5rem 0 3.5rem',
          borderBottom: '1px solid rgba(184, 137, 59, 0.3)'
        }}
      >
        <div className="container">
          <span
            style={{
              color: 'var(--color-gold)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'block',
              marginBottom: '8px'
            }}
          >
            Direct Trade Inquiries
          </span>
          <h1
            style={{
              color: 'var(--color-ivory)',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              margin: '0 0 12px 0'
            }}
          >
            Request a Wholesale / Export Quotation
          </h1>
          <p
            style={{
              color: 'rgba(244, 239, 230, 0.8)',
              maxWidth: '680px',
              margin: 0,
              fontSize: '1rem',
              lineHeight: 1.6
            }}
          >
            Connect directly with our export desk. We prepare comprehensive FOB/CIF proforma quotes, arrange fabric swatch cards, and provide private-label sampling timelines.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        {submissionSuccess ? (
          /* ----------------------------------------------------
              SUCCESS CONFIRMATION SCREEN
              ---------------------------------------------------- */
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--color-gold)',
              padding: '50px 40px',
              boxShadow: '0 15px 40px rgba(20, 33, 61, 0.08)',
              textAlign: 'center'
            }}
          >
            <CheckCircle2 size={60} style={{ color: '#25D366', margin: '0 auto 20px' }} />

            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '6px'
              }}
            >
              Inquiry Successfully Dispatched
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-navy)',
                fontSize: '2.2rem',
                marginBottom: '14px'
              }}
            >
              Thank You, {submissionSuccess.fullName}
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--color-charcoal-light)', lineHeight: 1.7, marginBottom: '24px' }}>
              Your B2B inquiry has been received by the <strong>MYKA FASHION</strong> export merchandising desk. An acknowledgment email has been delivered to <strong>{submissionSuccess.businessEmail}</strong>.
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-border)',
                padding: '20px',
                marginBottom: '30px',
                display: 'inline-block',
                minWidth: '280px'
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Your Unique Inquiry Reference
              </span>
              <div
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  letterSpacing: '0.05em',
                  marginTop: '4px'
                }}
              >
                {submissionSuccess.inquiryNumber}
              </div>
            </div>

            <div
              style={{
                textAlign: 'left',
                backgroundColor: 'var(--color-ivory-light)',
                padding: '20px',
                borderLeft: '4px solid var(--color-navy)',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                marginBottom: '30px'
              }}
            >
              <strong style={{ color: 'var(--color-navy)', display: 'block', marginBottom: '6px' }}>
                Next Merchandising Steps:
              </strong>
              • Our team evaluates fabric availability and dye-lot queues.<br />
              • A formal proforma with FOB / CIF pricing tiers is prepared within 24 business hours.<br />
              • Physical sample garments and swatch booklets can be dispatched via DHL Express upon confirmation.
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/collections" className="btn btn-primary">
                Browse More Collections
              </Link>
              <button
                onClick={() => setSubmissionSuccess(null)}
                className="btn btn-secondary"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          /* ----------------------------------------------------
              INQUIRY FORM & CONTACT SIDEBAR
              ---------------------------------------------------- */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3.5rem',
              alignItems: 'flex-start'
            }}
          >
            {/* Form Column */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                padding: 'clamp(24px, 4vw, 44px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  color: 'var(--color-navy)',
                  margin: '0 0 6px 0'
                }}
              >
                Wholesale Inquiry Form
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-light)', marginBottom: '24px' }}>
                Fields marked with an asterisk (*) are mandatory for formal proforma quotation.
              </p>

              {errorMessage && (
                <div
                  style={{
                    backgroundColor: '#FDE8E8',
                    borderLeft: '4px solid #E02424',
                    color: '#9B1C1C',
                    padding: '12px 16px',
                    fontSize: '0.88rem',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Shortlist summary widget if user already selected styles */}
              {items.length > 0 && (
                <div
                  style={{
                    backgroundColor: 'var(--color-ivory)',
                    border: '1px solid var(--color-border)',
                    padding: '16px 20px',
                    marginBottom: '28px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    <strong style={{ color: 'var(--color-navy)', fontSize: '0.9rem' }}>
                      Shortlisted Styles ({totalItemsCount})
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-subtle)' }}>
                      Included with this inquiry
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {items.map((it) => (
                      <div
                        key={it.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.82rem',
                          padding: '6px 0',
                          borderBottom: '1px dashed #DDD'
                        }}
                      >
                        <div>
                          <strong style={{ color: 'var(--color-navy)' }}>{it.sku}</strong> — {it.name}
                          {it.isSample && <span style={{ color: 'var(--color-gold)', marginLeft: '6px' }}>(Sample)</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: 600 }}>{it.quantity} pcs</span>
                          <button
                            type="button"
                            onClick={() => removeItem(it.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
                            title="Remove style"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: 'var(--color-ivory-light)' }}
                    />
                  </div>

                  {/* Business Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                      Business Email *
                    </label>
                    <input
                      type="email"
                      name="businessEmail"
                      required
                      placeholder="buyer@brand.com"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: 'var(--color-ivory-light)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                  {/* Phone / WhatsApp */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="+44 7700 900123"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: 'var(--color-ivory-light)' }}
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                      Company / Label Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="e.g. Willow & Thread"
                      value={formData.companyName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: 'var(--color-ivory-light)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                  {/* Country Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                      Country of Delivery *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: 'var(--color-ivory-light)', cursor: 'pointer' }}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Buyer Type */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                      Buyer Classification *
                    </label>
                    <select
                      name="buyerType"
                      value={formData.buyerType}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: 'var(--color-ivory-light)', cursor: 'pointer' }}
                    >
                      {BUYER_TYPES.map((bt) => (
                        <option key={bt} value={bt}>{bt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Conditional GST Number for India */}
                {formData.country === 'India' && (
                  <div
                    style={{
                      marginBottom: '18px',
                      padding: '14px',
                      backgroundColor: 'rgba(184, 137, 59, 0.08)',
                      border: '1px solid rgba(184, 137, 59, 0.3)'
                    }}
                  >
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                      GSTIN Number (Mandatory for Indian Business Invoicing) *
                    </label>
                    <input
                      type="text"
                      name="gstNumber"
                      required
                      placeholder="e.g. 08AABCM1234D1Z5"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: '#FFF' }}
                    />
                  </div>
                )}

                {/* Estimated Total Quantity */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                    Estimated Total Order Volume (pieces) *
                  </label>
                  <input
                    type="number"
                    name="estimatedQuantity"
                    min={1}
                    required
                    placeholder="e.g. 500"
                    value={formData.estimatedQuantity}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: 'var(--color-ivory-light)' }}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-gray-subtle)', marginTop: '4px', display: 'block' }}>
                    Minimum overall order size is typically 50–100 pieces per style.
                  </span>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                    Garment Specifications / Delivery Target / Questions
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Please specify size splits, private label woven tag requirements, custom colorways, or target FOB delivery dates..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: 'var(--color-ivory-light)', resize: 'vertical' }}
                  />
                </div>

                {/* File Upload (Optional tech pack / moodboard) */}
                <div style={{ marginBottom: '26px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                    Attach Tech Pack / Reference Mockup (Optional, max 10MB)
                  </label>
                  <div
                    style={{
                      border: '1px dashed var(--color-border)',
                      padding: '16px',
                      textAlign: 'center',
                      backgroundColor: 'var(--color-ivory-light)',
                      position: 'relative'
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    <Upload size={22} style={{ color: 'var(--color-gold)', margin: '0 auto 6px' }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-charcoal)' }}>
                      {attachedFile ? (
                        <strong>Selected: {attachedFile.name} ({(attachedFile.size / 1024).toFixed(1)} KB)</strong>
                      ) : (
                        'Click or drag PDF, PNG, or JPG tech pack here'
                      )}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '0.9rem' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Transmitting Inquiry to Export Desk...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Wholesale Inquiry</span>
                    </>
                  )}
                </button>

                <p style={{ fontSize: '0.72rem', color: 'var(--color-gray-subtle)', textAlign: 'center', marginTop: '12px', marginBottom: 0 }}>
                  ✓ Official B2B inquiry. No payment gateway or retail cart checkout.
                </p>
              </form>
            </div>

            {/* Sidebar Column: Contact Info & Export FAQs */}
            <div>
              {/* Direct Desk Details */}
              <div
                style={{
                  backgroundColor: 'var(--color-navy)',
                  color: 'var(--color-ivory)',
                  padding: '36px 32px',
                  marginBottom: '2rem'
                }}
              >
                <span style={{ color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 600 }}>
                  Direct Contact
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)', fontSize: '1.6rem', margin: '4px 0 16px' }}>
                  Export Desk Contacts
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'rgba(244, 239, 230, 0.6)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                      Trade Inquiries Email
                    </span>
                    <a href="mailto:wholesale@mykafashion.com" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
                      wholesale@mykafashion.com
                    </a>
                  </div>

                  {whatsappNumber && (
                    <div>
                      <span style={{ color: 'rgba(244, 239, 230, 0.6)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                        WhatsApp Business Line
                      </span>
                      <a
                        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#25D366', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <MessageCircle size={16} />
                        <span>Chat with Merchandiser</span>
                      </a>
                    </div>
                  )}

                  <div>
                    <span style={{ color: 'rgba(244, 239, 230, 0.6)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                      Export Desk Working Hours
                    </span>
                    <span>Monday – Saturday: 09:30 – 18:30 IST (UTC +5:30)</span>
                  </div>

                  <div>
                    <span style={{ color: 'rgba(244, 239, 230, 0.6)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                      Facility Location
                    </span>
                    <span>Jaipur &amp; Delhi NCR Garment Export Clusters, India</span>
                    <span style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(244, 239, 230, 0.5)', marginTop: '2px' }}>
                      (Facility visits arranged by verified buyer appointment)
                    </span>
                  </div>
                </div>
              </div>

              {/* Inquiry FAQs Box */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  padding: '30px'
                }}
              >
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-navy)', margin: '0 0 16px 0' }}>
                  Wholesale Buyer FAQ
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ color: 'var(--color-navy)', display: 'block' }}>
                      Can we order physical samples before committing to bulk?
                    </strong>
                    <span style={{ color: 'var(--color-charcoal-light)' }}>
                      Yes. We produce showroom samples and fabric swatch rings with 7–10 days dispatch via DHL/FedEx courier.
                    </span>
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-navy)', display: 'block' }}>
                      What are your standard export payment terms?
                    </strong>
                    <span style={{ color: 'var(--color-charcoal-light)' }}>
                      Standard international trade wire (T/T): 40% advance proforma confirmation and 60% balance against inspection & Bill of Lading. Irrevocable LC acceptable for bulk volumes.
                    </span>
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-navy)', display: 'block' }}>
                      Can we customize measurements or design length?
                    </strong>
                    <span style={{ color: 'var(--color-charcoal-light)' }}>
                      Yes. We accommodate modest lengths, customized sleeve finishes, and regional sizing adjustments for European, American, or Gulf markets.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
