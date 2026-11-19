import Link from 'next/link';

export default function Logo({ light = false }) {
  return (
    <Link
      href="/"
      className="inline-flex flex-col text-decoration-none group"
      style={{ textDecoration: 'none' }}
      aria-label="MYKA FASHION Home"
    >
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: '1.65rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          color: light ? 'var(--color-ivory)' : 'var(--color-navy)',
          lineHeight: 1,
          textTransform: 'uppercase',
          transition: 'color var(--transition-fast)'
        }}
      >
        MYKA
      </span>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: '0.62rem',
          fontWeight: 500,
          letterSpacing: '0.35em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginTop: '3px'
        }}
      >
        FASHION • EXPORT
      </span>
    </Link>
  );
}
