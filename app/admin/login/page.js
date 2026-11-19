'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import Logo from '../../../components/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@mykafashion.com');
  const [password, setPassword] = useState('MykaAdmin2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        backgroundColor: 'var(--color-ivory-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          boxShadow: '0 12px 35px rgba(20, 33, 61, 0.08)',
          padding: '40px 36px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Logo />
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '16px',
              padding: '4px 10px',
              backgroundColor: 'rgba(20, 33, 61, 0.06)',
              fontSize: '0.75rem',
              color: 'var(--color-navy)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600
            }}
          >
            <Lock size={12} />
            <span>Merchant Management Portal</span>
          </div>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#FDE8E8',
              borderLeft: '4px solid #E02424',
              color: '#9B1C1C',
              padding: '10px 14px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-navy)',
                marginBottom: '6px'
              }}
            >
              Staff Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid var(--color-border)',
                fontSize: '0.9rem',
                backgroundColor: 'var(--color-ivory-light)'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-navy)',
                marginBottom: '6px'
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid var(--color-border)',
                fontSize: '0.9rem',
                backgroundColor: 'var(--color-ivory-light)'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Merchant Desk</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: '24px',
            padding: '12px 14px',
            backgroundColor: 'var(--color-ivory)',
            border: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            color: 'var(--color-charcoal-light)',
            lineHeight: 1.5
          }}
        >
          <strong>Default Owner Credentials (Configurable in .env):</strong><br />
          Email: <code>admin@mykafashion.com</code><br />
          Password: <code>MykaAdmin2026!</code>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--color-gray-subtle)', textDecoration: 'underline' }}>
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
