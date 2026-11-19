'use client';

import React from 'react';
import { useInquiry } from '../context/InquiryContext';
import { CheckCircle2 } from 'lucide-react';

export default function ToastContainer() {
  const { toastMessage } = useInquiry();

  if (!toastMessage) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <CheckCircle2 size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
      <span>{toastMessage}</span>
    </div>
  );
}
