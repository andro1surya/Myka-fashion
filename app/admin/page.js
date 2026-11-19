'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../../components/Logo';
import {
  Inbox,
  Package,
  Users,
  Settings,
  Download,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  X,
  LogOut,
  ExternalLink,
  Clock,
  Layers,
  Save,
  Loader2,
  FileSpreadsheet
} from 'lucide-react';

const STATUSES = ['All', 'New', 'Contacted', 'Sample Sent', 'Quote Sent', 'Negotiation', 'Converted', 'Closed'];

export default function AdminDashboardPage() {
  const router = useRouter();

  // Navigation tabs
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'products' | 'leads' | 'settings'

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [settings, setSettings] = useState({
    whatsappNumber: '',
    contactEmail: 'wholesale@mykafashion.com',
    notificationEmail: 'wholesale@mykafashion.com',
    defaultMoq: 50
  });

  const [loading, setLoading] = useState(true);

  // Inquiry filters
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');

  // Modals
  const [activeInquiryDetail, setActiveInquiryDetail] = useState(null);
  const [productModalMode, setProductModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState('');

  const showAdminToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Fetch initial dashboard data
  const fetchData = async () => {
    try {
      setLoading(true);

      // Check session by trying to fetch inquiries
      const inqRes = await fetch('/api/inquiries');
      if (inqRes.status === 401) {
        router.push('/admin/login');
        return;
      }
      const inqData = await inqRes.json();
      if (inqData.success) {
        setInquiries(inqData.data || []);
      }

      // Fetch products (all = true for admin)
      const prodRes = await fetch('/api/products?all=true');
      const prodData = await prodRes.json();
      if (prodData.success) {
        setProducts(prodData.data || []);
      }

      // Fetch leads
      const leadsRes = await fetch('/api/catalogue-download');
      const leadsData = await leadsRes.json();
      if (leadsData.success) {
        setLeads(leadsData.data || []);
      }

      // Fetch settings
      const setRes = await fetch('/api/settings');
      const setData = await setRes.json();
      if (setData.success) {
        setSettings(setData.settings || {});
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // ----------------------------------------------------
  // INQUIRY ACTIONS
  // ----------------------------------------------------
  const handleUpdateInquiryStatus = async (inquiryId, newStatus, newNotes) => {
    try {
      const res = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, internalNotes: newNotes })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(prev => prev.map(i => (i.id === inquiryId || i.inquiryNumber === inquiryId) ? { ...i, status: newStatus, internalNotes: newNotes } : i));
        if (activeInquiryDetail && (activeInquiryDetail.id === inquiryId || activeInquiryDetail.inquiryNumber === inquiryId)) {
          setActiveInquiryDetail(prev => ({ ...prev, status: newStatus, internalNotes: newNotes }));
        }
        showAdminToast(`Inquiry status updated to "${newStatus}"`);
      }
    } catch (err) {
      console.error('Update status failed:', err);
    }
  };

  const handleDeleteInquiry = async (inquiryId) => {
    if (!confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/inquiries/${inquiryId}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i.id !== inquiryId && i.inquiryNumber !== inquiryId));
        setActiveInquiryDetail(null);
        showAdminToast('Inquiry record deleted.');
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // ----------------------------------------------------
  // PRODUCT ACTIONS
  // ----------------------------------------------------
  const handleToggleProductActive = async (sku, currentActive) => {
    try {
      const res = await fetch(`/api/products/${sku}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku, isActive: !currentActive })
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => p.sku === sku ? { ...p, isActive: !currentActive } : p));
        showAdminToast(`Product ${sku} ${!currentActive ? 'is now Visible' : 'is now Hidden'}`);
      }
    } catch (err) {
      console.error('Toggle active failed:', err);
    }
  };

  const handleDeleteProduct = async (sku) => {
    if (!confirm(`Are you sure you want to permanently delete style ${sku}?`)) return;
    try {
      const res = await fetch(`/api/products/${sku}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.sku !== sku));
        showAdminToast(`Product ${sku} deleted.`);
      }
    } catch (err) {
      console.error('Delete product failed:', err);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (productModalMode === 'edit') {
        const res = await fetch(`/api/products/${editingProduct.sku}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProduct)
        });
        if (res.ok) {
          setProducts(prev => prev.map(p => p.sku === editingProduct.sku ? { ...p, ...editingProduct } : p));
          setProductModalMode(null);
          showAdminToast(`Product ${editingProduct.sku} updated successfully.`);
        }
      } else if (productModalMode === 'add') {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProduct)
        });
        const data = await res.json();
        if (data.success) {
          setProducts(prev => [data.data, ...prev]);
          setProductModalMode(null);
          showAdminToast(`New product ${editingProduct.sku} created.`);
        }
      }
    } catch (err) {
      console.error('Save product error:', err);
    }
  };

  // ----------------------------------------------------
  // SETTINGS SAVE
  // ----------------------------------------------------
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        showAdminToast('Website settings saved successfully.');
      }
    } catch (err) {
      console.error('Settings save error:', err);
    }
  };

  // Filtered inquiries calculation
  const filteredInquiries = inquiries.filter(i => {
    if (selectedStatus !== 'All' && i.status.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    if (selectedCountry !== 'All' && i.country.toLowerCase() !== selectedCountry.toLowerCase()) return false;
    if (inquirySearch) {
      const q = inquirySearch.toLowerCase();
      const match =
        i.inquiryNumber.toLowerCase().includes(q) ||
        i.fullName.toLowerCase().includes(q) ||
        i.companyName.toLowerCase().includes(q) ||
        i.businessEmail.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: '#F8F6F2', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Header Bar */}
      <header
        style={{
          backgroundColor: 'var(--color-navy-dark)',
          color: 'var(--color-ivory)',
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid var(--color-gold)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Logo light />
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              padding: '3px 8px',
              border: '1px solid rgba(184, 137, 59, 0.4)',
              fontWeight: 600
            }}
          >
            Owner Management Desk
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              color: 'var(--color-ivory)',
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            <span>View Live Site</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--color-ivory)',
              padding: '6px 12px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div style={{ padding: '30px' }} className="container">
        {/* Toast Feedback */}
        {toast && (
          <div
            style={{
              backgroundColor: 'var(--color-navy)',
              color: 'var(--color-gold)',
              padding: '10px 18px',
              marginBottom: '20px',
              borderLeft: '4px solid var(--color-gold)',
              fontSize: '0.88rem',
              fontWeight: 500
            }}
          >
            ✓ {toast}
          </div>
        )}

        {/* Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '30px'
          }}
        >
          <div style={{ backgroundColor: '#FFF', padding: '20px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-gray-subtle)', letterSpacing: '0.08em' }}>
              Total Inquiries
            </span>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontWeight: 600, marginTop: '4px' }}>
              {inquiries.length}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)' }}>All-time wholesale leads</span>
          </div>

          <div style={{ backgroundColor: '#FFF', padding: '20px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-gray-subtle)', letterSpacing: '0.08em' }}>
              New / Uncontacted
            </span>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-terracotta)', fontWeight: 600, marginTop: '4px' }}>
              {inquiries.filter(i => i.status === 'New').length}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)' }}>Requires merchandising review</span>
          </div>

          <div style={{ backgroundColor: '#FFF', padding: '20px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-gray-subtle)', letterSpacing: '0.08em' }}>
              Quotes / Samples Active
            </span>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontWeight: 600, marginTop: '4px' }}>
              {inquiries.filter(i => ['Quote Sent', 'Sample Sent', 'Negotiation'].includes(i.status)).length}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-gray-subtle)' }}>Active trade pipeline</span>
          </div>

          <div style={{ backgroundColor: '#FFF', padding: '20px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-gray-subtle)', letterSpacing: '0.08em' }}>
              Active Export Styles
            </span>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontWeight: 600, marginTop: '4px' }}>
              {products.filter(p => p.isActive).length} / {products.length}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-gray-subtle)' }}>Published on catalogue</span>
          </div>

          <div style={{ backgroundColor: '#FFF', padding: '20px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-gray-subtle)', letterSpacing: '0.08em' }}>
              Catalogue Leads Captured
            </span>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontWeight: 600, marginTop: '4px' }}>
              {leads.length}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-gray-subtle)' }}>PDF lookbook downloads</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '2px solid var(--color-border)',
            marginBottom: '24px'
          }}
        >
          <button
            onClick={() => setActiveTab('inquiries')}
            style={{
              padding: '12px 20px',
              background: activeTab === 'inquiries' ? '#FFF' : 'transparent',
              border: activeTab === 'inquiries' ? '1px solid var(--color-border)' : 'none',
              borderBottom: activeTab === 'inquiries' ? '2px solid var(--color-navy)' : 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              color: activeTab === 'inquiries' ? 'var(--color-navy)' : 'var(--color-charcoal-light)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Inbox size={16} />
            <span>Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '12px 20px',
              background: activeTab === 'products' ? '#FFF' : 'transparent',
              border: activeTab === 'products' ? '1px solid var(--color-border)' : 'none',
              borderBottom: activeTab === 'products' ? '2px solid var(--color-navy)' : 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              color: activeTab === 'products' ? 'var(--color-navy)' : 'var(--color-charcoal-light)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Package size={16} />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            style={{
              padding: '12px 20px',
              background: activeTab === 'leads' ? '#FFF' : 'transparent',
              border: activeTab === 'leads' ? '1px solid var(--color-border)' : 'none',
              borderBottom: activeTab === 'leads' ? '2px solid var(--color-navy)' : 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              color: activeTab === 'leads' ? 'var(--color-navy)' : 'var(--color-charcoal-light)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Users size={16} />
            <span>Catalogue Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '12px 20px',
              background: activeTab === 'settings' ? '#FFF' : 'transparent',
              border: activeTab === 'settings' ? '1px solid var(--color-border)' : 'none',
              borderBottom: activeTab === 'settings' ? '2px solid var(--color-navy)' : 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              color: activeTab === 'settings' ? 'var(--color-navy)' : 'var(--color-charcoal-light)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Settings size={16} />
            <span>Website Settings</span>
          </button>
        </div>

        {/* ----------------------------------------------------
            TAB 1: INQUIRIES MANAGEMENT
            ---------------------------------------------------- */}
        {activeTab === 'inquiries' && (
          <div>
            {/* Filter & Export Bar */}
            <div
              style={{
                backgroundColor: '#FFF',
                padding: '16px',
                border: '1px solid var(--color-border)',
                marginBottom: '16px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search buyer, company, email, inquiry #..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.85rem',
                    width: '260px'
                  }}
                />

                {/* Status select */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
                  ))}
                </select>

                {/* Country select */}
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                >
                  <option value="All">All Countries</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              {/* CSV Export */}
              <a
                href="/api/inquiries/export"
                className="btn btn-secondary btn-sm"
                download
                style={{ textDecoration: 'none' }}
              >
                <FileSpreadsheet size={15} />
                <span>Export Inquiries (CSV)</span>
              </a>
            </div>

            {/* Inquiries Table */}
            <div style={{ backgroundColor: '#FFF', border: '1px solid var(--color-border)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-navy)', color: '#FFF' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Inquiry #</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Buyer &amp; Company</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Country</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Volume</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Received</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: 'var(--color-gray-subtle)' }}>
                        No inquiries found matching the selected filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr
                        key={inq.id || inq.inquiryNumber}
                        style={{ borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }}
                        onClick={() => setActiveInquiryDetail(inq)}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF8F4')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFF')}
                      >
                        <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-navy)' }}>
                          {inq.inquiryNumber}
                          {inq.isDemo && (
                            <span className="demo-tag" style={{ marginLeft: '6px' }}>DEMO</span>
                          )}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <strong style={{ display: 'block', color: 'var(--color-navy)' }}>{inq.fullName}</strong>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-gray-subtle)' }}>
                            {inq.companyName} • {inq.buyerType}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>{inq.country}</td>
                        <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-gold)' }}>
                          {inq.estimatedQuantity} pcs
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '2px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor:
                                inq.status === 'New' ? '#FEF3C7' :
                                inq.status === 'Quote Sent' ? '#DBEAFE' :
                                inq.status === 'Sample Sent' ? '#E0E7FF' :
                                inq.status === 'Converted' ? '#D1FAE5' :
                                inq.status === 'Negotiation' ? '#FEE2E2' : '#F3F4F6',
                              color:
                                inq.status === 'New' ? '#92400E' :
                                inq.status === 'Quote Sent' ? '#1E40AF' :
                                inq.status === 'Sample Sent' ? '#3730A3' :
                                inq.status === 'Converted' ? '#065F46' :
                                inq.status === 'Negotiation' ? '#991B1B' : '#374151'
                            }}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: 'var(--color-gray-subtle)' }}>
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setActiveInquiryDetail(inq)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '4px 8px', marginRight: '6px' }}
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id || inq.inquiryNumber)}
                            style={{
                              background: 'none',
                              border: '1px solid #E5E7EB',
                              color: '#9CA3AF',
                              padding: '4px 8px',
                              cursor: 'pointer'
                            }}
                            title="Delete inquiry"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 2: PRODUCT MANAGEMENT (CRUD)
            ---------------------------------------------------- */}
        {activeTab === 'products' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', margin: 0 }}>
                Wholesale Product Catalogue ({products.length} Styles)
              </h3>
              <button
                onClick={() => {
                  setEditingProduct({
                    sku: `MF-0${products.length + 1}`,
                    name: '',
                    category: 'Kurtis',
                    fabric: '100% cotton',
                    composition: '100% Combed Cotton',
                    sizes: ['S', 'M', 'L', 'XL'],
                    moq: 100,
                    priceMin: 6.50,
                    priceMax: 8.50,
                    priceDisplay: 'USD 6.50-8.50',
                    leadTime: '25 days',
                    description: '',
                    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'],
                    isActive: true
                  });
                  setProductModalMode('add');
                }}
                className="btn btn-primary btn-sm"
              >
                <Plus size={14} />
                <span>Add New Style</span>
              </button>
            </div>

            <div style={{ backgroundColor: '#FFF', border: '1px solid var(--color-border)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-navy)', color: '#FFF' }}>
                    <th style={{ padding: '12px 14px' }}>Image</th>
                    <th style={{ padding: '12px 14px' }}>SKU</th>
                    <th style={{ padding: '12px 14px' }}>Product Title</th>
                    <th style={{ padding: '12px 14px' }}>Category</th>
                    <th style={{ padding: '12px 14px' }}>Fabric</th>
                    <th style={{ padding: '12px 14px' }}>MOQ</th>
                    <th style={{ padding: '12px 14px' }}>FOB Price</th>
                    <th style={{ padding: '12px 14px' }}>Status</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.sku} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '8px 14px', width: '60px' }}>
                        <div style={{ width: '45px', height: '56px', backgroundColor: '#EEE', overflow: 'hidden' }}>
                          <img
                            src={(p.images && p.images[0]) || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80'}
                            alt={p.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--color-navy)' }}>{p.sku}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 500 }}>{p.name}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--color-gold)' }}>{p.category}</td>
                      <td style={{ padding: '12px 14px' }}>{p.fabric}</td>
                      <td style={{ padding: '12px 14px' }}>{p.moq} pcs</td>
                      <td style={{ padding: '12px 14px', fontWeight: 600 }}>{p.priceDisplay}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <button
                          onClick={() => handleToggleProductActive(p.sku, p.isActive)}
                          style={{
                            padding: '3px 8px',
                            border: 'none',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            backgroundColor: p.isActive ? '#D1FAE5' : '#FEE2E2',
                            color: p.isActive ? '#065F46' : '#991B1B'
                          }}
                        >
                          {p.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setEditingProduct({ ...p });
                            setProductModalMode('edit');
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', marginRight: '6px' }}
                          title="Edit Style Details"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.sku)}
                          style={{
                            background: 'none',
                            border: '1px solid #E5E7EB',
                            color: '#EF4444',
                            padding: '4px 8px',
                            cursor: 'pointer'
                          }}
                          title="Delete Style"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 3: CATALOGUE LEADS
            ---------------------------------------------------- */}
        {activeTab === 'leads' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '16px' }}>
              Lookbook Download Leads ({leads.length} Records)
            </h3>
            <div style={{ backgroundColor: '#FFF', border: '1px solid var(--color-border)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-navy)', color: '#FFF' }}>
                    <th style={{ padding: '12px 16px' }}>Corporate Email</th>
                    <th style={{ padding: '12px 16px' }}>Company Name</th>
                    <th style={{ padding: '12px 16px' }}>Download Timestamp</th>
                    <th style={{ padding: '12px 16px' }}>Marketing Consent</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l, idx) => (
                    <tr key={l.id || idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-navy)' }}>
                        <a href={`mailto:${l.email}`}>{l.email}</a>
                      </td>
                      <td style={{ padding: '12px 16px' }}>{l.companyName || 'Not specified'}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-gray-subtle)' }}>
                        {new Date(l.createdAt).toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#065F46' }}>✓ Consented</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 4: WEBSITE SETTINGS
            ---------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '640px', backgroundColor: '#FFF', padding: '32px', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', margin: '0 0 16px 0' }}>
              Basic Website &amp; Contact Configurations
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-light)', marginBottom: '24px' }}>
              Update export desk contact coordinates. WhatsApp buttons across all pages activate automatically as soon as a verified international number is saved below.
            </p>

            <form onSubmit={handleSaveSettings}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-navy)', marginBottom: '6px' }}>
                  Verified WhatsApp Business Number (with country code, e.g. 919876543210)
                </label>
                <input
                  type="text"
                  placeholder="Leave blank to deactivate WhatsApp button"
                  value={settings.whatsappNumber || ''}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--color-gray-subtle)', marginTop: '4px', display: 'block' }}>
                  {settings.whatsappNumber ? '✓ WhatsApp button active across all pages' : '• WhatsApp button currently inactive (clean core compliance)'}
                </span>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-navy)', marginBottom: '6px' }}>
                  Public Trade Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail || ''}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-navy)', marginBottom: '6px' }}>
                  Sales Notification Recipient Email
                </label>
                <input
                  type="email"
                  value={settings.notificationEmail || ''}
                  onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-navy)', marginBottom: '6px' }}>
                  Default Minimum Order Quantity (MOQ)
                </label>
                <input
                  type="number"
                  value={settings.defaultMoq || 50}
                  onChange={(e) => setSettings({ ...settings, defaultMoq: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                <Save size={15} />
                <span>Save Configuration</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------
          INQUIRY DETAIL MODAL / DRAWER
          ---------------------------------------------------- */}
      {activeInquiryDetail && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(13, 22, 41, 0.65)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveInquiryDetail(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '780px',
              maxHeight: '90vh',
              backgroundColor: '#FFFFFF',
              overflowY: 'auto',
              padding: '36px',
              border: '1px solid var(--color-gold)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveInquiryDetail(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={22} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-navy)' }}>
                {activeInquiryDetail.inquiryNumber}
              </span>
              {activeInquiryDetail.isDemo && (
                <span className="demo-tag">DEMO RECORD</span>
              )}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-subtle)', marginBottom: '24px' }}>
              Submitted on: {new Date(activeInquiryDetail.createdAt).toLocaleString()}
            </div>

            {/* Buyer Profile Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'var(--color-ivory)',
                marginBottom: '24px',
                fontSize: '0.85rem'
              }}
            >
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Buyer Name:</span>
                <strong style={{ display: 'block', color: 'var(--color-navy)' }}>{activeInquiryDetail.fullName}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Company:</span>
                <strong style={{ display: 'block', color: 'var(--color-navy)' }}>{activeInquiryDetail.companyName}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Corporate Email:</span>
                <a href={`mailto:${activeInquiryDetail.businessEmail}`} style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
                  {activeInquiryDetail.businessEmail}
                </a>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Phone / WhatsApp:</span>
                <strong style={{ display: 'block' }}>{activeInquiryDetail.phone}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Destination Country:</span>
                <strong style={{ display: 'block' }}>{activeInquiryDetail.country}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Buyer Classification:</span>
                <strong style={{ display: 'block' }}>{activeInquiryDetail.buyerType}</strong>
              </div>
              {activeInquiryDetail.gstNumber && (
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--color-gray-subtle)', fontSize: '0.72rem', textTransform: 'uppercase' }}>GST Number (India):</span>
                  <strong style={{ display: 'block', color: 'var(--color-navy)' }}>{activeInquiryDetail.gstNumber}</strong>
                </div>
              )}
            </div>

            {/* Buyer Message */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '6px' }}>
                Buyer Message / Target Notes:
              </h4>
              <p style={{ backgroundColor: 'var(--color-ivory-light)', padding: '12px 16px', borderLeft: '3px solid var(--color-navy)', margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>
                {activeInquiryDetail.message || 'No additional message provided.'}
              </p>
            </div>

            {/* Tech pack link */}
            {activeInquiryDetail.attachmentUrl && (
              <div style={{ marginBottom: '24px' }}>
                <a
                  href={activeInquiryDetail.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <ExternalLink size={13} />
                  <span>View Attached Tech Pack / Document</span>
                </a>
              </div>
            )}

            {/* Shortlisted Styles */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '10px' }}>
                Shortlisted Garment Styles ({activeInquiryDetail.items?.length || 0}):
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-navy)', color: '#FFF' }}>
                    <th style={{ padding: '8px 10px' }}>SKU</th>
                    <th style={{ padding: '8px 10px' }}>Style Name</th>
                    <th style={{ padding: '8px 10px' }}>Qty</th>
                    <th style={{ padding: '8px 10px' }}>Specifications / Color Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeInquiryDetail.items || []).map((it, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 600 }}>{it.sku}</td>
                      <td style={{ padding: '8px 10px' }}>{it.productName}</td>
                      <td style={{ padding: '8px 10px', fontWeight: 600, color: 'var(--color-gold)' }}>
                        {it.quantity} pcs
                      </td>
                      <td style={{ padding: '8px 10px', color: '#555' }}>
                        {it.colorNotes || 'Standard'}{it.isSampleRequest ? ' (Sample)' : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Status Update & Internal Notes Controls */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-navy)', marginBottom: '10px' }}>
                Update Inquiry Workflow &amp; Notes
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-gray-subtle)', marginBottom: '4px' }}>
                    Current Status:
                  </label>
                  <select
                    value={activeInquiryDetail.status}
                    onChange={(e) => {
                      const newSt = e.target.value;
                      handleUpdateInquiryStatus(activeInquiryDetail.id || activeInquiryDetail.inquiryNumber, newSt, activeInquiryDetail.internalNotes);
                    }}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    {STATUSES.filter(s => s !== 'All').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-gray-subtle)', marginBottom: '4px' }}>
                    Internal Merchandising Notes:
                  </label>
                  <input
                    type="text"
                    value={activeInquiryDetail.internalNotes || ''}
                    onChange={(e) => setActiveInquiryDetail({ ...activeInquiryDetail, internalNotes: e.target.value })}
                    placeholder="e.g. Sent proforma quotation, waiting on tech pack..."
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => handleUpdateInquiryStatus(activeInquiryDetail.id || activeInquiryDetail.inquiryNumber, activeInquiryDetail.status, activeInquiryDetail.internalNotes)}
                  className="btn btn-primary btn-sm"
                >
                  <Save size={13} />
                  <span>Save Notes &amp; Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          PRODUCT ADD / EDIT MODAL
          ---------------------------------------------------- */}
      {productModalMode && editingProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(13, 22, 41, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setProductModalMode(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              backgroundColor: '#FFFFFF',
              overflowY: 'auto',
              padding: '32px',
              border: '1px solid var(--color-gold)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', margin: 0 }}>
                {productModalMode === 'edit' ? `Edit Style ${editingProduct.sku}` : 'Add New Garment Style'}
              </h3>
              <button onClick={() => setProductModalMode(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                    SKU *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                    Fabric Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.fabric}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fabric: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                    MOQ (pcs) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.moq}
                    onChange={(e) => setEditingProduct({ ...editingProduct, moq: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                    FOB Price Display *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.priceDisplay}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceDisplay: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                    Lead Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.leadTime}
                    onChange={(e) => setEditingProduct({ ...editingProduct, leadTime: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                  Fabric Composition Specification
                </label>
                <input
                  type="text"
                  value={editingProduct.composition || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, composition: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                  Primary High-Res Image URL (4:5 Aspect Ratio)
                </label>
                <input
                  type="text"
                  value={(editingProduct.images && editingProduct.images[0]) || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-navy)', fontWeight: 600, marginBottom: '4px' }}>
                  Product Narrative Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setProductModalMode(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={13} />
                  <span>Save Style</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
