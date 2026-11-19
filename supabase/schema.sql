-- =====================================================================
-- MYKA FASHION - SUPABASE DATABASE SCHEMA & POLICIES
-- =====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    fabric VARCHAR(100) NOT NULL,
    composition VARCHAR(150),
    sizes TEXT[] NOT NULL DEFAULT '{}',
    moq INTEGER NOT NULL DEFAULT 50,
    price_min NUMERIC(10, 2),
    price_max NUMERIC(10, 2),
    price_display VARCHAR(100) NOT NULL,
    lead_time VARCHAR(100) NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    colors JSONB DEFAULT '[]'::jsonb,
    price_tiers JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_number VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    business_email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    buyer_type VARCHAR(100) NOT NULL,
    gst_number VARCHAR(100),
    estimated_quantity INTEGER DEFAULT 0,
    message TEXT,
    attachment_url TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'New', -- New, Contacted, Sample Sent, Quote Sent, Negotiation, Converted, Closed
    is_demo BOOLEAN NOT NULL DEFAULT false,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. INQUIRY ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.inquiry_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
    product_id VARCHAR(100),
    sku VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    color_notes TEXT,
    is_sample_request BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. CATALOGUE LEADS TABLE
CREATE TABLE IF NOT EXISTS public.catalogue_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    consent_marketing BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.website_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_inquiries_number ON public.inquiries(inquiry_number);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiry_items_inquiry_id ON public.inquiry_items(inquiry_id);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalogue_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Products Policies: Public can read active products; Service role / Authenticated admin can read/write all
CREATE POLICY "Public can view active products"
    ON public.products FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admin full access to products"
    ON public.products FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Inquiries Policies: Public can submit inquiries but cannot read inquiries
CREATE POLICY "Public can insert inquiries"
    ON public.inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin full access to inquiries"
    ON public.inquiries FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Inquiry Items Policies: Public can insert inquiry items
CREATE POLICY "Public can insert inquiry items"
    ON public.inquiry_items FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin full access to inquiry items"
    ON public.inquiry_items FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Catalogue Leads Policies: Public can insert lead email
CREATE POLICY "Public can insert catalogue leads"
    ON public.catalogue_leads FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin full access to catalogue leads"
    ON public.catalogue_leads FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Website Settings Policies: Public can read settings
CREATE POLICY "Public can view website settings"
    ON public.website_settings FOR SELECT
    USING (true);

CREATE POLICY "Admin full access to website settings"
    ON public.website_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
