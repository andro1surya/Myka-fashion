# MYKA FASHION — B2B Women's Fashion Wholesale & Export Platform

A premier, inquiry-based B2B apparel export web application built for international fashion houses, boutique retailers, department stores, and wholesale importers.

Designed with an international luxury fashion aesthetic (reminiscent of high-end editorial labels), **MYKA FASHION** showcases 16 core handcrafted Indian craft silhouettes—specializing in Bagru block prints, Lucknowi chikankari hand embroidery, European flax linen co-ords, and conscious natural-fiber textiles.

---

## Key Business Architecture

- **Inquiry-Based Wholesale Model:** Strictly B2B. No payment gateway, cart checkout, or consumer e-commerce transactions. Buyers use **"Add to Inquiry List"** and **"Request a Quote"** to shortlist styles and target volumes.
- **Persistent Wholesale Shortlist:** Stored in browser `localStorage` and synchronized across pages, allowing buyers to shortlist multiple garments with custom color/size notes and submit them in one consolidated inquiry.
- **Unique Inquiry Sequencing:** Automatically generates unique reference numbers (e.g., `MF-INQ-0043`) for traceability.
- **Dual Email Dispatch:** Automated professional buyer acknowledgment email + instant sales desk notification powered by Resend (with automatic local simulation mode when API keys are not configured).
- **Email-Gated Wholesale PDF Lookbook:** Instant generation and download of a multi-page, formatted wholesale PDF catalogue upon corporate email capture.
- **Demonstration Data Transparency:** All PRD sample metrics (25,000 monthly garment output, 120-person team, order shares, and sample testimonials) are explicitly labeled with `[Demonstration Metric / Pending Client Verification]` badges to prevent misrepresentation.
- **Protected Admin Management Portal (`/admin`):** Full inquiry workflow management (New, Contacted, Sample Sent, Quote Sent, Negotiation, Converted, Closed), internal notes, product CRUD (add, edit, hide, delete, price adjustments), catalogue lead inspection, CSV export, and site-wide contact/WhatsApp configuration.
- **Zero-Friction Local Fallback:** Runs immediately out of the box with an in-memory/demo store when Supabase or Resend credentials are not provided. Connects to Supabase PostgreSQL and live Resend automatically once production credentials are added.

---

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript (ES6+ / React 18)
- **Styling:** Luxury CSS design system with CSS Modules and responsive variables:
  - Deep Navy: `#14213D` (30%)
  - Antique Gold: `#B8893B` (10%)
  - Ivory / Cream: `#F4EFE6` (60%)
  - Charcoal: `#2B2B2B`
  - Terracotta: `#A64B2A` & Sage: `#7A8B76`
- **Database & Storage:** Supabase (PostgreSQL with Row Level Security policies)
- **Email Dispatch:** Resend (HTML templates for buyer confirmation & sales alerts)
- **PDF Generation:** jsPDF (Client-side wholesale vector lookbook generator)
- **Deployment:** Vercel-ready with zero-config build

---

## 4 Primary Pages + Key Routes

1. **Home (`/`):** Full-width editorial hero, trust strip with demo disclosures, 4 signature category tiles, 6-style New Season showcase, Indian craftsmanship narrative, 4-step How It Works workflow, 3 demo testimonials, international market share breakdown, and full-width inquiry CTA.
2. **Collections (`/collections`):** Responsive 4:5 product grid, instant search by SKU/title/fabric, multi-select filters (Category, Fabric, Size Range, MOQ), quick-view product modal (4–5 high-definition images, detailed composition, swatches, size tags, MF-001 volume tier pricing matrix, Add to Shortlist, Request Sample), and email-gated PDF lookbook download.
3. **About & Export (`/about`):** Indian textile heritage, Bagru block-print & Lucknow chikankari artisan clusters, natural fabric breakdown, factory finishing capacity (marked subject to verification), Incoterms guide (Ex-Works, FOB, CIF), private-label OEM branding (woven neck labels, hang tags, care tags, export cartons), and strict ethical certification compliance notice.
4. **Inquiry & Contact (`/contact` & `/inquiry`):** Comprehensive trade inquiry form, preloaded shortlist items with volume adjustment, country selector, buyer classification, conditional GST field for Indian domestic trade, optional tech pack / mood board upload (up to 10MB), honeypot anti-spam protection, verified WhatsApp link, and post-submission success reference view.
5. **Compliance (`/privacy`):** International B2B data protection policy covering GDPR, Indian IT Act, tech pack confidentiality, and cookie consent.
6. **Merchant Admin Portal (`/admin` & `/admin/login`):** Protected dashboard with live metrics, inquiry status lifecycle management, CSV download, product catalogue CRUD, and website settings.

---

## Core Product Seed Data (All 16 Styles)

| SKU | Product Name | Category | Fabric | Sizes | MOQ | FOB Price | Lead Time |
|---|---|---|---|---|---|---|---|
| **MF-001** | Indigo Block Print Cotton Kurti | Kurtis | 100% cotton | XS-3XL | 100 | USD 6.80-8.50* | 25 days |
| **MF-002** | Chikankari Embroidered Tunic | Kurtis | Georgette | S-3XL | 60 | USD 11.20-13.50 | 35 days |
| **MF-003** | Straight-Fit Kurti with Pockets | Kurtis | Cotton slub | XS-4XL | 150 | USD 5.90-7.20 | 22 days |
| **MF-004** | Floral Rayon Maxi Dress | Dresses | Rayon | S-XXL | 100 | USD 7.90-9.60 | 30 days |
| **MF-005** | Tiered Cotton Voile Midi Dress | Dresses | Cotton voile | S-XL | 100 | USD 8.60-10.20 | 28 days |
| **MF-006** | Linen Co-ord Set (Top and Pant) | Co-ord Sets | Linen blend | S-XL | 80 | USD 12.40-14.80 | 30 days |
| **MF-007** | Block Print Co-ord Set | Co-ord Sets | Cotton | S-XXL | 80 | USD 10.80-12.90 | 28 days |
| **MF-008** | Kurta, Pant and Dupatta Set | Ethnic Sets | Cotton silk | S-3XL | 60 | USD 14.50-17.80 | 35 days |
| **MF-009** | Festive Anarkali Set | Ethnic Sets | Chanderi blend | S-XXL | 50 | USD 19.50-24.00 | 40 days |
| **MF-010** | Mandarin Collar Linen Shirt | Tops | Linen | XS-XL | 100 | USD 8.20-9.90 | 25 days |
| **MF-011** | Smocked Peasant Top | Tops | Cotton | S-XL | 120 | USD 5.40-6.60 | 22 days |
| **MF-012** | Cotton Palazzo Pants | Bottoms | Cotton | Free/XL | 150 | USD 3.90-4.80 | 20 days |
| **MF-013** | Wide-Leg Linen Trousers | Bottoms | Linen blend | S-XXL | 100 | USD 7.40-9.10 | 25 days |
| **MF-014** | Curvy Printed Kurti | Plus Size | Rayon | 3XL-6XL | 80 | USD 7.60-9.20 | 28 days |
| **MF-015** | Organic Cotton Lounge Set | Loungewear | Organic cotton | S-XXL | 150 | USD 9.30-11.00 | 28 days |
| **MF-016** | Printed Cotton Dupatta | Dupattas | Cotton mulmul | Free | 200 | USD 2.20-3.10 | 15 days |

*\*MF-001 Quantity Price Breaks: 100-299 pcs: USD 8.50 (25 days) • 300-999 pcs: USD 7.60 (28 days) • 1,000-2,999 pcs: USD 7.10 (32 days) • 3,000+ pcs: USD 6.80 (Lead time on request).*

---

## Local Development & Setup

### 1. Prerequisites
- Node.js v18+ or v20+ / v22+
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Default credentials configured for immediate local exploration:
- **Admin Email:** `admin@mykafashion.com`
- **Admin Password:** `MykaAdmin2026!`

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Production Build & Verification Tests
```bash
npm run build
node test-e2e.mjs
```

---

## Supabase Production Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard.
3. Run the schema script located at `supabase/schema.sql`. This creates:
   - `products` (with full specs, sizes, colors, and tier pricing)
   - `inquiries` (with unique inquiry number index and buyer classification)
   - `inquiry_items` (associated shortlisted garments)
   - `catalogue_leads` (email capture from PDF downloads)
   - `website_settings`
   - Configures strict **Row Level Security (RLS)** ensuring public users can submit inquiries but can NEVER query other buyers' trade data.
4. Run the seed script located at `supabase/seed.sql` to populate all 16 products and 5 demo inquiries (flagged `is_demo: true`).
5. In **Project Settings -> API**, copy your `URL`, `anon public key`, and `service_role secret key` into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
   SUPABASE_SERVICE_ROLE_KEY=ey...
   ```

---

## Resend Email & Domain DNS Configuration

1. Create an account at [resend.com](https://resend.com).
2. Generate an API Key under **API Keys** and add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   EMAIL_FROM="MYKA FASHION Export Desk <inquiries@mykafashion.com>"
   SALES_NOTIFICATION_EMAIL="wholesale@mykafashion.com"
   ```
3. To deliver from `inquiries@mykafashion.com`, add and verify your domain in Resend:
   - **SPF:** TXT record `v=spf1 include:resend.com ~all`
   - **DKIM:** TXT record provided by Resend (e.g. `resend._domainkey.mykafashion.com`)
   - **DMARC:** TXT record `_dmarc.mykafashion.com` with value `v=DMARC1; p=none; rua=mailto:dmarc@mykafashion.com`
4. When `RESEND_API_KEY` is not present, the system logs simulated dispatches to stdout so form testing never fails or throws errors.

---

## Admin Portal User Guide

1. Navigate to `/admin` or click **"Merchant / Admin Portal"** in the footer.
2. Sign in using the admin credentials (default `admin@mykafashion.com` / `MykaAdmin2026!`).
3. **Inquiry Management:**
   - Review incoming wholesale inquiries with company name, volume, and shortlisted items.
   - Click any inquiry to inspect buyer tech packs, colorway preferences, and buyer type.
   - Update workflow status: `New` → `Contacted` → `Sample Sent` → `Quote Sent` → `Negotiation` → `Converted` → `Closed`.
   - Demo inquiries (`MF-INQ-0038` to `0042`) display a prominent `DEMO` badge.
   - Export all inquiries to CSV via the **"Export Inquiries (CSV)"** button.
4. **Product Management (CRUD):**
   - Click **"Add New Style"** to upload product details, FOB prices, and image URLs.
   - Click the pencil icon to edit existing specifications, lead times, or MOQs.
   - Click the **"Active / Hidden"** pill to instantly toggle visibility on the public catalogue.
5. **Website & WhatsApp Settings:**
   - Under the **"Website Settings"** tab, enter your verified international WhatsApp number (e.g. `919876543210`). The floating WhatsApp quick-chat widget across all pages activates automatically.

---

## Checklist of Information Still Needed from Business Owner Before Launch

Before connecting a live custom domain for public commercial operation, obtain:
1. **Verified WhatsApp Business Number:** For direct client chat.
2. **Real Corporate Email Accounts:** Confirmation of `wholesale@mykafashion.com` or custom domain email hosting.
3. **Formal Verification of Factory Figures:** Confirmation of monthly output (e.g. 25,000 units) and team count (e.g. 120 artisans).
4. **Authentic Client Testimonials:** Replace the 3 demo testimonials with quotes from verified retail partners.
5. **Physical Facility Address:** For the contact footer / private appointment scheduling.
6. **Owner's Resend & Supabase Production API Keys.**
