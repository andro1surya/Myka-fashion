import { initialProducts } from './data/products.js';
import { initialDemoInquiries } from './data/demoInquiries.js';
import { isSupabaseConfigured, supabaseAdmin, supabasePublic } from './supabaseClient.js';

// Server-side in-memory cache for local/demo mode
let memoryProducts = [...initialProducts];
let memoryInquiries = [...initialDemoInquiries];
let memoryLeads = [
  { id: 'lead-1', email: 'buyer@nordicfashions.se', companyName: 'Nordic Fashion Group', createdAt: '2026-11-15T10:00:00Z', consentMarketing: true },
  { id: 'lead-2', email: 'procurement@sydneyapparel.com.au', companyName: 'Sydney Wholesale Garments', createdAt: '2026-11-17T08:30:00Z', consentMarketing: true }
];
let memorySettings = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'wholesale@mykafashion.com',
  notificationEmail: process.env.SALES_NOTIFICATION_EMAIL || 'wholesale@mykafashion.com',
  companyName: 'MYKA FASHION',
  officeCity: 'Jaipur / Delhi NCR, India',
  defaultMoq: 50
};

let nextInquirySeq = 43;

// Helper to generate the next unique inquiry number
export function generateInquiryNumber() {
  const num = nextInquirySeq++;
  const padded = String(num).padStart(4, '0');
  return `MF-INQ-${padded}`;
}

// ----------------------------------------------------
// PRODUCTS
// ----------------------------------------------------
export async function getProducts({ category, search, activeOnly = false } = {}) {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      let query = supabaseAdmin.from('products').select('*');
      if (activeOnly) {
        query = query.eq('is_active', true);
      }
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let mapped = data.map(p => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
          slug: p.slug,
          category: p.category,
          description: p.description,
          fabric: p.fabric,
          composition: p.composition,
          sizes: p.sizes || [],
          moq: p.moq,
          priceMin: Number(p.price_min),
          priceMax: Number(p.price_max),
          priceDisplay: p.price_display,
          leadTime: p.lead_time,
          images: p.images || [],
          colors: p.colors || [],
          priceTiers: p.price_tiers || [],
          isActive: p.is_active,
          isFeatured: p.is_featured
        }));
        if (search) {
          const q = search.toLowerCase();
          mapped = mapped.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
        }
        return mapped;
      }
    } catch (err) {
      console.warn('Supabase query error, falling back to local products store:', err.message);
    }
  }

  // Fallback memory store
  let results = [...memoryProducts];
  if (activeOnly) {
    results = results.filter(p => p.isActive);
  }
  if (category && category !== 'All') {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }
  return results;
}

export async function getProductBySku(sku) {
  const products = await getProducts();
  return products.find(p => p.sku.toLowerCase() === sku.toLowerCase()) || null;
}

export async function createProduct(productData) {
  const newProduct = {
    id: `mf-${Date.now()}`,
    sku: productData.sku,
    name: productData.name,
    slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category: productData.category,
    description: productData.description || '',
    fabric: productData.fabric,
    composition: productData.composition || '',
    sizes: productData.sizes || ['S', 'M', 'L', 'XL'],
    moq: Number(productData.moq) || 50,
    priceMin: Number(productData.priceMin) || 0,
    priceMax: Number(productData.priceMax) || 0,
    priceDisplay: productData.priceDisplay || `USD ${productData.priceMin}-${productData.priceMax}`,
    leadTime: productData.leadTime || '25 days',
    images: productData.images || ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'],
    colors: productData.colors || [{ name: 'Standard', hex: '#14213D' }],
    priceTiers: productData.priceTiers || [],
    isActive: productData.isActive !== false,
    isFeatured: Boolean(productData.isFeatured)
  };

  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      await supabaseAdmin.from('products').insert({
        sku: newProduct.sku,
        name: newProduct.name,
        slug: newProduct.slug,
        category: newProduct.category,
        description: newProduct.description,
        fabric: newProduct.fabric,
        composition: newProduct.composition,
        sizes: newProduct.sizes,
        moq: newProduct.moq,
        price_min: newProduct.priceMin,
        price_max: newProduct.priceMax,
        price_display: newProduct.priceDisplay,
        lead_time: newProduct.leadTime,
        images: newProduct.images,
        colors: newProduct.colors,
        price_tiers: newProduct.priceTiers,
        is_active: newProduct.isActive,
        is_featured: newProduct.isFeatured
      });
    } catch (err) {
      console.warn('Failed to insert into Supabase products:', err.message);
    }
  }

  memoryProducts.unshift(newProduct);
  return newProduct;
}

export async function updateProduct(id, updates) {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const dbUpdates = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.sku !== undefined) dbUpdates.sku = updates.sku;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.fabric !== undefined) dbUpdates.fabric = updates.fabric;
      if (updates.composition !== undefined) dbUpdates.composition = updates.composition;
      if (updates.sizes !== undefined) dbUpdates.sizes = updates.sizes;
      if (updates.moq !== undefined) dbUpdates.moq = Number(updates.moq);
      if (updates.priceMin !== undefined) dbUpdates.price_min = Number(updates.priceMin);
      if (updates.priceMax !== undefined) dbUpdates.price_max = Number(updates.priceMax);
      if (updates.priceDisplay !== undefined) dbUpdates.price_display = updates.priceDisplay;
      if (updates.leadTime !== undefined) dbUpdates.lead_time = updates.leadTime;
      if (updates.images !== undefined) dbUpdates.images = updates.images;
      if (updates.colors !== undefined) dbUpdates.colors = updates.colors;
      if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
      if (updates.isFeatured !== undefined) dbUpdates.is_featured = updates.isFeatured;
      dbUpdates.updated_at = new Date().toISOString();

      await supabaseAdmin.from('products').update(dbUpdates).match({ sku: updates.sku || id });
    } catch (err) {
      console.warn('Supabase product update error:', err.message);
    }
  }

  const idx = memoryProducts.findIndex(p => p.id === id || p.sku === id);
  if (idx !== -1) {
    memoryProducts[idx] = { ...memoryProducts[idx], ...updates };
    return memoryProducts[idx];
  }
  return null;
}

export async function deleteProduct(id) {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      await supabaseAdmin.from('products').delete().match({ sku: id });
    } catch (err) {
      console.warn('Supabase product delete error:', err.message);
    }
  }
  memoryProducts = memoryProducts.filter(p => p.id !== id && p.sku !== id);
  return true;
}

// ----------------------------------------------------
// INQUIRIES
// ----------------------------------------------------
export async function getInquiries({ status, country, search } = {}) {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      let query = supabaseAdmin
        .from('inquiries')
        .select(`
          *,
          inquiry_items (*)
        `)
        .order('created_at', { ascending: false });

      if (status && status !== 'All') {
        query = query.eq('status', status);
      }
      if (country && country !== 'All') {
        query = query.eq('country', country);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let mapped = data.map(inq => ({
          id: inq.id,
          inquiryNumber: inq.inquiry_number,
          fullName: inq.full_name,
          businessEmail: inq.business_email,
          phone: inq.phone,
          companyName: inq.company_name,
          country: inq.country,
          buyerType: inq.buyer_type,
          gstNumber: inq.gst_number,
          estimatedQuantity: inq.estimated_quantity,
          message: inq.message,
          attachmentUrl: inq.attachment_url,
          status: inq.status,
          isDemo: inq.is_demo,
          internalNotes: inq.internal_notes,
          createdAt: inq.created_at,
          items: (inq.inquiry_items || []).map(item => ({
            id: item.id,
            sku: item.sku,
            productName: item.product_name,
            quantity: item.quantity,
            colorNotes: item.color_notes,
            isSampleRequest: item.is_sample_request
          }))
        }));

        if (search) {
          const q = search.toLowerCase();
          mapped = mapped.filter(i =>
            i.inquiryNumber.toLowerCase().includes(q) ||
            i.fullName.toLowerCase().includes(q) ||
            i.companyName.toLowerCase().includes(q) ||
            i.businessEmail.toLowerCase().includes(q)
          );
        }
        return mapped;
      }
    } catch (err) {
      console.warn('Supabase inquiries query error, using local fallback:', err.message);
    }
  }

  // Fallback memory inquiries
  let list = [...memoryInquiries];
  if (status && status !== 'All') {
    list = list.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }
  if (country && country !== 'All') {
    list = list.filter(i => i.country.toLowerCase() === country.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(i =>
      i.inquiryNumber.toLowerCase().includes(q) ||
      i.fullName.toLowerCase().includes(q) ||
      i.companyName.toLowerCase().includes(q) ||
      i.businessEmail.toLowerCase().includes(q)
    );
  }
  // Sort newest first
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createInquiry(inquiryData, items = []) {
  const inquiryNumber = generateInquiryNumber();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    inquiryNumber,
    fullName: inquiryData.fullName,
    businessEmail: inquiryData.businessEmail,
    phone: inquiryData.phone,
    companyName: inquiryData.companyName,
    country: inquiryData.country,
    buyerType: inquiryData.buyerType,
    gstNumber: inquiryData.gstNumber || null,
    estimatedQuantity: Number(inquiryData.estimatedQuantity) || (items.reduce((s, it) => s + (Number(it.quantity) || 0), 0) || 50),
    message: inquiryData.message || '',
    attachmentUrl: inquiryData.attachmentUrl || null,
    status: 'New',
    isDemo: false,
    internalNotes: '',
    createdAt: new Date().toISOString(),
    items: items.map((it, idx) => ({
      id: `item-${Date.now()}-${idx}`,
      sku: it.sku || 'CUSTOM',
      productName: it.productName || it.name || 'Custom Garment Spec',
      quantity: Number(it.quantity) || 1,
      colorNotes: it.colorNotes || it.color || '',
      isSampleRequest: Boolean(it.isSampleRequest)
    }))
  };

  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const { data: insertedInq, error: inqErr } = await supabaseAdmin
        .from('inquiries')
        .insert({
          inquiry_number: newInquiry.inquiryNumber,
          full_name: newInquiry.fullName,
          business_email: newInquiry.businessEmail,
          phone: newInquiry.phone,
          company_name: newInquiry.companyName,
          country: newInquiry.country,
          buyer_type: newInquiry.buyerType,
          gst_number: newInquiry.gstNumber,
          estimated_quantity: newInquiry.estimatedQuantity,
          message: newInquiry.message,
          attachment_url: newInquiry.attachmentUrl,
          status: 'New',
          is_demo: false
        })
        .select()
        .single();

      if (!inqErr && insertedInq) {
        if (newInquiry.items.length > 0) {
          await supabaseAdmin.from('inquiry_items').insert(
            newInquiry.items.map(it => ({
              inquiry_id: insertedInq.id,
              sku: it.sku,
              product_name: it.productName,
              quantity: it.quantity,
              color_notes: it.colorNotes,
              is_sample_request: it.isSampleRequest
            }))
          );
        }
      }
    } catch (err) {
      console.warn('Failed to insert inquiry into Supabase:', err.message);
    }
  }

  memoryInquiries.unshift(newInquiry);
  return newInquiry;
}

export async function updateInquiryStatus(id, status, notes) {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const updates = { status, updated_at: new Date().toISOString() };
      if (notes !== undefined) updates.internal_notes = notes;
      await supabaseAdmin.from('inquiries').update(updates).eq('id', id);
    } catch (err) {
      console.warn('Failed to update inquiry status in Supabase:', err.message);
    }
  }

  const idx = memoryInquiries.findIndex(i => i.id === id || i.inquiryNumber === id);
  if (idx !== -1) {
    memoryInquiries[idx].status = status;
    if (notes !== undefined) memoryInquiries[idx].internalNotes = notes;
    return memoryInquiries[idx];
  }
  return null;
}

export async function deleteInquiry(id) {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      await supabaseAdmin.from('inquiries').delete().eq('id', id);
    } catch (err) {
      console.warn('Failed to delete inquiry from Supabase:', err.message);
    }
  }
  memoryInquiries = memoryInquiries.filter(i => i.id !== id && i.inquiryNumber !== id);
  return true;
}

// ----------------------------------------------------
// CATALOGUE LEADS
// ----------------------------------------------------
export async function createCatalogueLead(email, companyName = '') {
  const lead = {
    id: `lead-${Date.now()}`,
    email,
    companyName,
    consentMarketing: true,
    createdAt: new Date().toISOString()
  };

  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      await supabaseAdmin.from('catalogue_leads').insert({
        email,
        company_name: companyName,
        consent_marketing: true
      });
    } catch (err) {
      console.warn('Supabase catalogue lead insert error:', err.message);
    }
  }

  memoryLeads.unshift(lead);
  return lead;
}

export async function getCatalogueLeads() {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('catalogue_leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data.map(d => ({
          id: d.id,
          email: d.email,
          companyName: d.company_name,
          createdAt: d.created_at,
          consentMarketing: d.consent_marketing
        }));
      }
    } catch (err) {
      console.warn('Supabase leads query error:', err.message);
    }
  }
  return memoryLeads;
}

// ----------------------------------------------------
// STATS & SETTINGS
// ----------------------------------------------------
export async function getDashboardStats() {
  const inquiries = await getInquiries();
  const products = await getProducts();
  const leads = await getCatalogueLeads();

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;
  const quotesSent = inquiries.filter(i => i.status === 'Quote Sent').length;
  const samplesSent = inquiries.filter(i => i.status === 'Sample Sent').length;
  const converted = inquiries.filter(i => i.status === 'Converted').length;
  const activeProducts = products.filter(p => p.isActive).length;

  return {
    totalInquiries,
    newInquiries,
    quotesSent,
    samplesSent,
    converted,
    totalProducts: products.length,
    activeProducts,
    totalLeads: leads.length
  };
}

export async function getSettings() {
  return memorySettings;
}

export async function updateSettings(newSettings) {
  memorySettings = { ...memorySettings, ...newSettings };
  return memorySettings;
}
