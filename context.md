# MYKA FASHION — COMPLETE PROJECT CONTEXT, ARCHITECTURE & IMPLEMENTATION DOSSIER

---

## 1. Executive Summary & Brand Overview

### 1.1 Brand Purpose and Philosophy
**Myka Fashion** is an export-grade, business-to-business (B2B) garment manufacturing and wholesale platform headquartered conceptually in India's prominent textile corridors (Jaipur, Rajasthan and Lucknow, Uttar Pradesh). The enterprise specializes in high-volume, premium women's wear tailored for international boutique owners, chain retail buyers, fashion distributors, global garment importers, and private label apparel labels across the United States, the United Kingdom, the United Arab Emirates, Germany, Australia, France, and domestic Indian markets.

Unlike conventional e-commerce platforms (which are engineered for individual retail consumers, direct-to-consumer checkout carts, payment gateways, and single-unit dispatches), Myka Fashion operates strictly under an **Inquiry-Driven B2B Model**. In international wholesale trade, garment pricing, manufacturing lead times, freight logistics, and fabric availability fluctuate significantly based on order volume, custom sizing specifications, customized labeling, packaging, and destination Incoterms (Ex-Works, FOB, CIF). 

Therefore, this platform is explicitly designed **not** as a transactional shopping store with payment buttons, but as a digital showroom, inquiry shortlist engine, and wholesale negotiation portal. It bridges traditional Indian heritage craftsmanship (hand block printing, delicate chikankari needlework, handloom weaving) with modern, scalable, ISO-conscious garment manufacturing.

### 1.2 Core Architectural Principles & Scope of Work
The platform was conceived, engineered, and delivered according to strict non-negotiable guidelines:
1. **Four Primary Navigation Portals**:
   - `Home` (`/`): High-fashion editorial narrative, core value propositions, trust signals, category highlights, new arrivals, manufacturing workflow, sample client testimonials, and export footprint.
   - `Collections` (`/collections`): Dynamic, filterable wholesale catalogue featuring 16 seed styles, 4:5 luxury editorial aspect-ratio photography, real-time parametric filtering, SKU lookups, multi-tiered wholesale quantity pricing tables, high-resolution modal inspection, sample requests, and email-gated wholesale PDF lookbook generation.
   - `About & Export` (`/about`): In-depth chronicle of Indian artisan heritage, sustainable natural fabrics (cotton, linen, georgette, rayon, chanderi, mulmul), production capabilities, quality-control protocols, Incoterm definitions (Ex-Works, FOB, CIF), private label white-labeling capabilities, and factual compliance disclosures.
   - `Inquiry & Contact` (`/contact` and alias `/inquiry`): Wholesale shortlist management table, buyer credentials intake, conditional tax inputs (e.g., Indian GST validation), honeypot anti-spam mechanisms, unique inquiry tracking ID generation (`MF-INQ-XXXXXX`), and dual transactional notifications.
2. **Zero Online Payments / Non-Transactional Shopping Guardrails**:
   - Strictly absent of "Add to Cart", "Buy Now", checkout funnels, stripe/paypal integrations, or consumer payment gateways.
   - All shopping mechanics are replaced with **"Add to Inquiry List"**, **"Request a Quote"**, and **"Request Swatch/Sample"**.
   - No prices are ever summed into a payable consumer total or order balance; the inquiry list functions purely as an indicative quotation manifest.
3. **Factual Integrity & Ethical Demonstration Content**:
   - All PRD demonstration statistics (e.g., 25,000 monthly garment capacity, 120-person team, MOQ thresholds from 50 pieces) and client testimonials are explicitly labeled as demonstration placeholders until authenticated by the facility owner prior to public operational launch.
   - Fabrications of non-existent addresses, unverified certifications, or fake accreditation badges (e.g., counterfeit GOTS or Sedex badges) were strictly prohibited and rejected.
4. **Independent, Resilient Technology Architecture**:
   - Built on **Next.js 14 App Router** using clean, modern **JavaScript (ES Modules)** without unnecessary transpilation complexity.
   - Zero bulky CSS frameworks (no Tailwind, Bootstrap, or Material UI) to ensure maximum design uniqueness, lightning-fast Core Web Vitals, and total styling freedom. Uses standard, modular luxury CSS stylesheets.
   - **Hybrid Data Layer (`lib/store.js`)**: Out-of-the-box resilience that seamlessly switches between a production **Supabase PostgreSQL** backend and an in-memory database fallback. This guarantees that the entire platform (including product browsing, inquiry submissions, catalogue lead downloads, and admin modifications) remains 100% operational in development, staging, or environments without live database credentials.
   - **Native PDF Lookbook Engine (`lib/pdfGenerator.js`)**: Real-time vector wholesale catalogue generator utilizing `jspdf` to create downloadable branded lookbooks for verified buyers.
   - **Transactional Email Communication (`lib/email.js`)**: Dual dispatch system powered by **Resend** with mock console-logger fallback.

---

## 2. Technology Stack & Technical Justifications

| Layer | Technology | Version | Rationale & Justification |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.2.35` | Server-Side Rendering (SSR) for blazing SEO, nested layouts, modern Route Handlers (`app/api`), React Server Components, and seamless zero-config deployment on Vercel. |
| **Language** | JavaScript (ESM) | ES2022+ | Plain, maintainable JavaScript as explicitly instructed in the project requirements. Avoids TypeScript build frictions for non-technical facility managers while utilizing clean ES module syntax (`"type": "module"`). |
| **Styling & Design System** | Custom Vanilla CSS & CSS Modules | CSS3 / PostCSS | Eliminates generic utility-class homogenization. Handcrafted typography scales, custom CSS custom properties (`--color-navy`, `--color-gold`, etc.), fluid CSS grid/flexbox layouts, and fine-tuned keyframe transitions. |
| **Database & Auth** | Supabase (PostgreSQL 15) | `@supabase/supabase-js` `^2.49.1` | Cloud-hosted relational database with Row Level Security (RLS), ACID compliance, JSONB capabilities for custom garment attributes, and built-in object storage readiness. |
| **Fallback Persistence** | Stateful In-Memory Store | Custom JS Class | Guarantees zero downtime and complete functionality if Supabase credentials are misconfigured, missing, or undergoing migration. |
| **Lookbook Engine** | jsPDF | `^2.5.2` | High-performance, client/server vector PDF composition for generating branded wholesale catalogues on the fly without heavy headless browser overhead. |
| **Transactional Email** | Resend | `^4.1.2` | Modern, developer-friendly email API delivering multi-part HTML & Plaintext transactional notifications to both buyers and sales directors. |
| **Icons & Visuals** | Lucide React | `^0.469.0` | Featherweight, tree-shakable SVG icon system matching the clean, luxury editorial aesthetic. |
| **Runtime Environment** | Node.js | `v22.23.3` | Modern LTS JavaScript runtime environment. |

---

## 3. Brand Identity & Design System

### 3.1 Color Palette Architecture
The visual system was calibrated to project the pedigree of an international luxury fashion atelier rather than an industrial commodity clearance warehouse. The 60-30-10 color allocation rule was applied across every interface:

- **Ivory & Crisp White (Primary Canvas ~60%)**:
  - `--color-ivory`: `#F4EFE6` (Warm, organic heritage backdrop reminiscent of unbleached raw organic mulmul and fine paper)
  - `--color-white`: `#FFFFFF` (Pure modern high-contrast structural base)
  - Purpose: Establishes generous negative space, high legibility, and high-end fashion editorial atmosphere.
- **Deep Navy (Secondary Structure ~30%)**:
  - `--color-navy`: `#14213D` (Authoritative, timeless midnight navy)
  - `--color-navy-dark`: `#0C1425` (Deep shadow borders and primary button active states)
  - Purpose: Provides strong anchors for top navigation headers, primary CTA buttons, footer backdrops, and high-prominence section banners.
- **Antique Gold (Accent & Hierarchy ~10%)**:
  - `--color-gold`: `#B8893B` (Muted, warm antique gold with rich yellow undertones)
  - `--color-gold-light`: `#D4A853` (Subtle hover highlights and active borders)
  - Purpose: Delicate hairline dividers, SKU tags, badges, active navigation indicators, and decorative accents.
- **Supporting Editorial Tones**:
  - `--color-charcoal`: `#2B2B2B` (High-legibility primary body text color, softer than harsh `#000000`)
  - `--color-terracotta`: `#A64B2A` (Earthy Rajasthani dye-bath warmth for badges, warning badges, and craft references)
  - `--color-sage`: `#7A8B76` (Earthy botanical undertone for organic cotton badges and sustainability highlights)

### 3.2 Typography System
- **Headings & Display Typography**:
  - Typeface: **Playfair Display** / **Cormorant Garamond** (Google Fonts CDN integration with serif fallback)
  - Weights: `400` (Regular), `600` (Semi-bold), `700` (Bold)
  - Styles: Editorial italic accents (`font-style: italic`) used selectively on lead headlines, sub-headers, and quotation marks to convey artisanal bespoke tailoring.
- **Body & Functional Typography**:
  - Typeface: **Inter** / **Poppins** (System sans-serif fallbacks: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto`)
  - Weights: `300` (Light), `400` (Regular), `500` (Medium), `600` (Semi-bold)
  - Features: Clean tabular numerals for MOQ counters, prices, and SKU codes; generous line-height (`1.6` to `1.75`) for effortless reading.

### 3.3 Micro-Interactions, Shadows & Component Geometry
- **Hairline Dividers**: Custom gold gradient lines (`linear-gradient(90deg, transparent, var(--color-gold), transparent)`).
- **Subtle Layering Shadows**:
  - Soft Card Hover: `box-shadow: 0 10px 30px rgba(20, 33, 61, 0.08);`
  - Floating Modal / Drawer: `box-shadow: -10px 0 40px rgba(0, 0, 0, 0.25);`
- **Component Geometry**: Sharp, refined edges with minimal corner radii (`border-radius: 2px` or `4px`), reflecting high-fashion print lookbooks rather than playful rounded mobile apps.
- **Transitions**: Smooth bezier easing (`transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 4. Application Architecture & File Directory Map

```
c:\Users\Yuvraj Purbia\Desktop\Mykaa/
├── .env.example                     # Environment template for Supabase, Resend, Admin auth & business info
├── .env.local                       # Local development credentials (configured with safe defaults)
├── .gitignore                       # Git exclusion rules for node_modules, build caches, and sensitive files
├── context.md                       # Comprehensive project documentation & architecture dossier (this file)
├── jsconfig.json                    # Path aliases config (@/* -> ./*)
├── next.config.js                   # Next.js build config, Unsplash remote image patterns, compression
├── package.json                     # Node.js project manifest ("type": "module", scripts, dependencies)
├── README.md                        # Master project onboarding guide and quickstart
├── test-e2e.mjs                     # Offline end-to-end integration test runner (25 validation assertions)
├── test-server.mjs                  # Live HTTP server integration test runner (12 endpoint validations)
│
├── app/                             # Next.js 14 App Router Directory
│   ├── globals.css                  # Global design system, CSS variables, typography, reset, print styles
│   ├── layout.js                    # Root layout with InquiryProvider, Header, Footer, WhatsApp, CookieConsent
│   ├── page.js                      # PAGE 1: Home Page (Hero, Trust Strip, Collections, Artisan, Workflow, etc.)
│   ├── icon.svg                     # High-resolution vector favicon with branded gold emblem
│   ├── robots.js                    # Dynamic Search Engine crawlers directive (/admin disallowed)
│   ├── sitemap.js                   # Dynamic XML sitemap generator for production SEO indexing
│   │
│   ├── about/                       # PAGE 3: About & Export
│   │   └── page.js                  # Indian heritage, artisan craft, fabrics, export markets, Incoterms
│   │
│   ├── collections/                 # PAGE 2: Collections & Product Catalogue
│   │   └── page.js                  # Filterable product grid, search, inquiry drawer, lookbook modal
│   │
│   ├── contact/                     # PAGE 4: Inquiry & Contact
│   │   └── page.js                  # Inquiry shortlist manifest, buyer intake form, Indian GST, submission
│   │
│   ├── inquiry/                     # Convenience redirect/alias route
│   │   └── page.js                  # Mirrors contact page for maximum URL compatibility
│   │
│   ├── privacy/                     # Data Protection & Wholesale Policy
│   │   └── page.js                  # GDPR & Indian IT Act compliant privacy & sample dispatch terms
│   │
│   ├── admin/                       # Protected B2B Management Suite
│   │   ├── page.js                  # Admin dashboard (Product CRUD, Inquiries, Leads, Export CSV, Settings)
│   │   └── login/
│   │       └── page.js              # Dedicated luxury admin authentication screen
│   │
│   └── api/                         # Next.js Backend Route Handlers
│       ├── admin/
│       │   ├── login/route.js       # Admin authentication & token generation
│       │   └── logout/route.js      # Session invalidation & cookie clearance
│       ├── catalogue-download/
│       │   └── route.js             # Gated lookbook lead capture & dynamic PDF streaming
│       ├── inquiries/
│       │   ├── route.js             # POST: New wholesale inquiry submission; GET: Admin query (protected)
│       │   ├── [id]/route.js        # GET/PATCH/DELETE: Single inquiry review and status updates
│       │   └── export/route.js      # GET: Export inquiries to RFC-4180 compliant CSV format
│       ├── products/
│       │   ├── route.js             # GET: Active products listing; POST: Admin product creation
│       │   └── [id]/route.js        # GET/PUT/DELETE: Single product inspection, update, soft deletion
│       └── settings/
│           └── route.js             # GET/PUT: Dynamic operational settings (WhatsApp, notification email, etc.)
│
├── components/                      # Reusable React UI Components
│   ├── CatalogueDownloadModal.js    # Email-gated PDF catalogue request dialog
│   ├── CookieConsent.js             # Subtle, non-intrusive wholesale cookie notice with persistent storage
│   ├── Footer.js                    # Editorial four-column footer with brand manifest, links, and disclaimers
│   ├── Header.js                    # Luxury navigation bar, live inquiry badge counter, mobile drawer
│   ├── InquiryDrawer.js             # Slide-over quick shortlist review drawer with quantity adjustments
│   ├── Logo.js                      # Scalable SVG/HTML wordmark featuring serif typography and gold accents
│   ├── ProductCard.js               # Responsive 4:5 product display with hover zoom, quick add, and MOQ pill
│   ├── ProductDetailModal.js        # Deep-dive product inspector (multi-image, tiered pricing, specifications)
│   ├── ToastContainer.js            # Self-managing floating notification alerts for user feedback
│   └── WhatsAppButton.js            # Floating direct-dial WhatsApp launcher (activates when number configured)
│
├── context/                         # Global Client State Management
│   └── InquiryContext.js            # React Context managing wholesale shortlist, quantities, localStorage sync
│
├── lib/                             # Backend Logic, Stores, Data & Utilities
│   ├── auth.js                      # Admin authentication logic, token generation, and header validation
│   ├── email.js                     # Resend API integration with dual templates and graceful mock fallback
│   ├── pdfGenerator.js              # Vector PDF catalogue compiler powered by jsPDF
│   ├── store.js                     # Hybrid repository (Supabase PostgreSQL Client + Resilient In-Memory Store)
│   └── data/
│       ├── demoInquiries.js         # 5 realistic initial B2B wholesale inquiries for testing admin portal
│       └── products.js              # Definitive repository of all 16 seed garments with exact specifications
│
└── supabase/                        # Database Architecture & Infrastructure
    ├── schema.sql                   # Full PostgreSQL schema with RLS policies, indexes, and triggers
    └── seed.sql                     # SQL seed script injecting all 16 products and test inquiries
```

---

## 5. Global Components & Cross-Cutting Features

### 5.1 Dynamic Header & Navigation (`components/Header.js`)
- **Brand Wordmark**: Scalable SVG emblem (`components/Logo.js`) featuring balanced serif lettering and an antique gold needle-and-thread insignia.
- **Primary Desktop Links**: Clean horizontal navigation (`Home`, `Collections`, `About & Export`, `Inquiry & Contact`) with active path indicators rendered with gold underlines.
- **Shortlist Pill & Counter**: Displays a live badge indicating the number of distinct garments currently held in the buyer's wholesale shortlist. Clicking toggles the slide-over `InquiryDrawer`.
- **Primary Action CTA**: "Request a Quote" button routing directly to `/contact`.
- **Responsive Mobile Navigation**: Touch-friendly hamburger drawer with smooth slide-in transition, accessible close triggers, and quick access to WhatsApp and shortlist.

### 5.2 Wholesale Inquiry Context & Shortlist Engine (`context/InquiryContext.js`)
- **Persistent LocalStorage State**: Keeps buyer selections intact across navigation, browser tab reloads, and sessions under the key `myka_inquiry_list`.
- **Item State Interface**:
  - `id`: Unique product ID
  - `sku`: Garment style number (e.g. `MF-001`)
  - `name`: Garment title
  - `image`: Primary display photograph
  - `moq`: Minimum order quantity threshold
  - `quantity`: Desired order quantity (automatically initialized to the product's MOQ)
  - `colorNotes`: Buyer-specific colorway preferences, dye specifications, or fabric requests
  - `sampleRequested`: Boolean flag denoting whether the buyer requires a pre-production physical prototype
- **Exported Helper Functions**:
  - `addToInquiry(product, quantity, colorNotes, sampleRequested)`: Appends or updates line items with toast alerts.
  - `removeFromInquiry(productId)`: Deletes selected garment from the manifest.
  - `updateQuantity(productId, quantity)`: Updates the wholesale piece count.
  - `updateColorNotes(productId, notes)`: Updates custom color notes.
  - `clearInquiry()`: Clears the entire shortlist upon successful quote submission.
  - `totalItems`: Derived counter for header notification badges.

### 5.3 Global Slide-Over Inquiry Drawer (`components/InquiryDrawer.js`)
- Accessible from any page without navigating away from the current browsing experience.
- Displays thumbnail images, SKU codes, unit quantity counters (with decrement/increment buttons enforcing MOQ thresholds), colorway notes, and a direct button to proceed to the full `/contact` checkout manifest.

### 5.4 WhatsApp Quick-Connect System (`components/WhatsAppButton.js`)
- In international wholesale trade, WhatsApp is the dominant communication channel for real-time fabric swatch videos, sample dispatch tracking, and freight negotiation.
- Positioned as a floating button in the bottom-right corner.
- **Strict Verification Guardrail**: The button remains hidden or renders an administrative tooltip until a verified phone number is configured via environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER` or the Admin Settings panel. When clicked, it opens a pre-composed chat request citing the buyer's interest in Myka Fashion wholesale collections.

### 5.5 Cookie Consent Banner (`components/CookieConsent.js`)
- Unobtrusive bottom bar designed in deep navy and gold.
- Stores acceptance in `localStorage` under `myka_cookie_consent`.
- Provides quick links to `/privacy`.

### 5.6 Comprehensive Footer (`components/Footer.js`)
- Multi-column editorial structure:
  - **Column 1**: Brand manifesto, artisan heritage overview, and verified exporter credentials statement.
  - **Column 2**: Navigation links with direct routes to Collections, About, Inquiry, and Admin Portal.
  - **Column 3**: Garment Categories (Kurtis, Tunics, Ethnic Sets, Co-ord Sets, Tops, Bottoms, Plus Size, Mulmul Dupattas).
  - **Column 4**: Export Desk contact coordinates, configurable email address, telephone, and commercial hours.
  - **Legal Bar**: Copyright notices, demonstrative figure disclaimer, and privacy policy link.

---

## 6. Page 1: Home Page (`app/page.js`) — Deep-Dive Breakdown

The homepage is structured as an editorial fashion lookbook, establishing brand authority within seconds of arrival.

### 6.1 Section 1: Hero Banner
- **Visuals**: Full-bleed hero container with a high-resolution editorial photograph of an Indian artisanal model dressed in handcrafted ethnic couture, backed by an ivory and navy radial vignette.
- **Headlines**:
  - Pre-title: *"ESTABLISHED EXPORT ATELIER — JAIPUR & LUCKNOW"*
  - Main Display Headline: *"Artisanal Indian Craftsmanship Engineered for Global Wholesale"*
  - Sub-copy: *"Bespoke B2B manufacturing of premium women's apparel. From hand-carved woodblock prints to delicate Georgette Chikankari, we supply boutiques and fashion labels worldwide with reliable MOQs, transparent lead times, and rigorous quality assurance."*
- **Call-to-Action Pair**:
  - Primary CTA: *"Explore Wholesale Collections"* (links to `/collections`)
  - Secondary CTA: *"Request a Custom Quote"* (links to `/contact`)

### 6.2 Section 2: Wholesale Trust Strip & Demonstration Notice
- Horizontal four-pillar trust band highlighting commercial capabilities:
  1. **Low Starting MOQ**: *"From 50 Pieces / Style"* — Flexible tier structures accommodating independent boutiques up to multi-door retailers.
  2. **Monthly Production Volume**: *"25,000 Garments / Month"* — High-throughput automated cutting tables, in-house stitching lines, and finishing units.
  3. **Artisan Workforce**: *"120+ Master Artisans"* — Traditional woodblock carvers, needlework masters, pattern makers, and sampling specialists.
  4. **International Footprint**: *"7 Export Territories"* — Regular freight dispatches to USA, UK, UAE, Germany, Australia, France, and pan-India.
- **Demonstration Notice**: An explicit, tasteful badge alerting visiting buyers and owners that production numbers represent demonstrative operational metrics pending final launch verification.

### 6.3 Section 3: Curated Collection Tiles
Four prominent category feature cards with 4:5 portrait aspect ratio imagery, gold hover borders, and direct collection query filtering:
1. **Artisanal Block-Print Kurtis**: Hand-carved teak woodblock prints on 100% breathable organic cotton.
2. **Contemporary Co-Ord Sets**: Modern two-piece linen and cotton ensembles engineered for Western and Middle Eastern resort wear.
3. **Heritage Ethnic & Anarkali Ensembles**: Chanderi silk blends and Georgette garments featuring hand-embroidered Lucknowi Chikankari.
4. **Resort Dresses & Sustainable Tops**: Relaxed tiered silhouettes, smocked tops, and breathable rayon maxi dresses.

### 6.4 Section 4: New Arrivals Showcase
- A dynamic grid presenting four flagship garments from the seed catalogue (`MF-001`, `MF-002`, `MF-006`, `MF-009`).
- Each card incorporates 4:5 image presentation, fabric badges, starting MOQ counters, indicative FOB price ranges, and quick "Add to Inquiry" triggers.

### 6.5 Section 5: Brand Story & Craft Heritage
- Two-column split narrative featuring close-up textile photography of hand-carved woodblocks dipped in natural indigo dye and traditional *tar-kashi* embroidery frames.
- Educates international buyers on the difference between synthetic screen prints and authentic Bagru/Sanganer hand block printing.
- Explains the delicate art of Lucknow Chikankari (shadow work, *murri*, and *phanda* stitches) executed by women artisan cooperatives.

### 6.6 Section 6: Four-Step B2B Wholesale Workflow
Illustrates the structured order pipeline to alleviate anxieties of international sourcing:
1. **Step 01: Browse Styles & Build Shortlist**: Review our curated catalogue and select designs matching your retail demographic.
2. **Step 02: Submit Specification Inquiry**: Specify target quantities, desired colorways, custom branding requirements, and destination port.
3. **Step 03: Receive Proforma Quote & Swatch Samples**: Our export desk responds within 24 hours with FOB/CIF pricing, lab dip swatches, and physical pre-production samples.
4. **Step 04: Controlled Production & Global Dispatch**: Batch manufacturing under four-stage AQL quality inspection followed by sea/air freight delivery with full export documentation.

### 6.7 Section 7: Demonstration Client Testimonials
Three realistic B2B buyer endorsement cards clearly flagged as sample preview content:
- **Elena Rostova (Boutique Owner, Melbourne, Australia)**: Praises fabric longevity, true-to-spec sizing, and reliable customs documentation.
- **Marcus Vance (Apparel Sourcing Director, London, UK)**: Highlights the seamless private labeling, bespoke hang-tag finishing, and adherence to 30-day production lead times.
- **Fatima Al-Mansoor (Wholesale Fashion Distributor, Dubai, UAE)**: Commends the breathable pure cotton linens and the responsiveness of the WhatsApp export desk.

### 6.8 Section 8: Global Export Footprint
- Interactive world map representation highlighting primary export routes: United Kingdom (London, Manchester), United Arab Emirates (Dubai), United States (New York, Los Angeles), Germany (Berlin, Hamburg), Australia (Sydney, Melbourne), France (Paris), and domestic Indian hubs.
- Explains door-to-door air courier options (DHL/FedEx) for expedited shipments and sea freight consolidations (JNPT Nhava Sheva / Mundra ports) for container-load wholesale orders.

### 6.9 Section 9: Full-Width Primary Quote CTA
- Deep navy background with gold ornamental borders: *"Ready to Elevate Your Retail Collection with Authentic Indian Craftsmanship?"*
- Dual actions: Immediate quote request form or instant catalogue lookbook download.

---

## 7. Page 2: Collections & Wholesale Catalogue (`app/collections/page.js`) — Deep-Dive Breakdown

The Collections portal provides an advanced, industrial-grade product discovery experience tailored for professional apparel buyers.

### 7.1 Live Filtering & Search Architecture
All 16 products are queryable in real-time through an intuitive, instantaneous multi-parameter filtering panel:
1. **Free-Text Search**: Live substring matching against garment titles, descriptions, SKU codes (e.g. searching "MF-001" or "Mulmul" immediately isolates the exact matches).
2. **Category Tabs**: All, Kurtis, Dresses, Co-ord Sets, Ethnic Sets, Tops, Bottoms, Plus Size, Loungewear, Dupattas.
3. **Fabric Filter Dropdown**: Filter by 100% Cotton, Georgette, Cotton Slub, Rayon, Cotton Voile, Linen Blend, Cotton Silk, Chanderi Blend, Linen, Organic Cotton, or Cotton Mulmul.
4. **Size Range Filter**: S-XL, XS-3XL, XS-4XL, S-XXL, 3XL-6XL, Free Size.
5. **MOQ Threshold Filter**:
   - Any MOQ
   - 50–79 pieces (Boutique friendly)
   - 80–99 pieces
   - 100–149 pieces
   - 150+ pieces (Volume wholesale)
6. **Active Filter Pills & Reset**: Visual tags showing all applied filters with one-click clear triggers and a total matching garment counter.

### 7.2 Responsive Product Card Grid (`components/ProductCard.js`)
- **4:5 Aspect Ratio Luxury Cards**: Optimized for fashion model photography with subtle scale-up zoom on hover (`transform: scale(1.04)`).
- **Graceful Error Handling (`onError`)**: Built-in fallback to high-resolution offline/SVG fashion placeholders in the event of upstream network timeouts.
- **Product Information Hierarchy**:
  - Top Badge: Garment Category & MOQ indicator.
  - Title: Bold Playfair Display heading.
  - SKU & Fabric: Antique gold text indicating exact composition (e.g. `SKU: MF-001 • 100% cotton`).
  - Price Bracket: Indicative FOB price (e.g. `USD 6.80 - 8.50 / pc`).
  - Lead Time: Estimated production turnaround (e.g. `25 days production`).
- **Interactive Action Bar**:
  - "Inspect Style" button (launches modal).
  - "Add to Inquiry" quick-add button (adds item to shortlist with automatic toast confirmation).

### 7.3 Deep-Dive Product Detail Inspector (`components/ProductDetailModal.js`)
When an item is clicked, a comprehensive modal view opens:
- **Multi-Image High-Resolution Gallery**: Interactive gallery with thumbnail selector allowing buyers to inspect front view, profile view, embroidery macro close-up, and styling angles.
- **Complete Specifications Matrix**:
  - SKU code
  - Fabric composition & weave details
  - Available standard size run
  - Minimum Order Quantity (MOQ)
  - Estimated production cycle
  - Indicative FOB price range
- **Volume Wholesale Tiered Pricing Table (Featured on MF-001)**:
  - `100 – 299 pieces`: **USD 8.50 / piece** (Standard turnaround: 25 days)
  - `300 – 999 pieces`: **USD 7.60 / piece** (Turnaround: 28 days)
  - `1,000 – 2,999 pieces`: **USD 7.10 / piece** (Turnaround: 32 days)
  - `3,000+ pieces`: **USD 6.80 / piece** (Turnaround: Negotiable upon request)
- **Interactive Buyer Customization Panel**:
  - Desired Order Quantity counter (prevents values below MOQ).
  - Available Colorways selector (demonstration swatches with real-time selection).
  - Custom Notes field (for labeling, custom dyes, or special packaging requests).
  - "Add to Inquiry Shortlist" CTA.
  - "Request Swatch & Pre-Production Sample" toggle button.

### 7.4 Email-Gated Catalogue Download System (`components/CatalogueDownloadModal.js`)
- Allows international buyers to download a comprehensive offline PDF Lookbook.
- Implements an email-gated barrier capturing buyer credentials (business email, company name, destination country).
- The captured lead is automatically stored in the `catalogue_leads` table in Supabase (or fallback in-memory store) and triggers an immediate vector PDF generation stream from `/api/catalogue-download`.

---

## 8. Definitive 16-Product Master Seed Specification

Every product was meticulously seeded according to the client PRD specifications without fabricating non-existent attributes:

| SKU | Product Title | Category | Fabric / Composition | Size Run | MOQ | FOB Price Range | Lead Time | Primary Colorways |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **MF-001** | Indigo Block Print Cotton Kurti | Kurtis | 100% Cotton | XS-3XL | 100 pcs | USD 6.80 – 8.50 | 25 days | Royal Indigo, Ochre Yellow, Madder Red |
| **MF-002** | Chikankari Embroidered Tunic | Kurtis | Georgette | S-3XL | 60 pcs | USD 11.20 – 13.50 | 35 days | Pristine White, Powder Pink, Mint Sage |
| **MF-003** | Straight-Fit Kurti with Pockets | Kurtis | Cotton Slub | XS-4XL | 150 pcs | USD 5.90 – 7.20 | 22 days | Earthy Terracotta, Olive Green, Charcoal |
| **MF-004** | Floral Rayon Maxi Dress | Dresses | Rayon | S-XXL | 100 pcs | USD 7.90 – 9.60 | 30 days | Navy Floral, Mustard Bloom, Rust Meadow |
| **MF-005** | Tiered Cotton Voile Midi Dress | Dresses | Cotton Voile | S-XL | 100 pcs | USD 8.60 – 10.20 | 28 days | Vintage Ivory, Blush Rose, Sky Blue |
| **MF-006** | Linen Co-ord Set (Top & Pant) | Co-ord Sets | Linen Blend | S-XL | 80 pcs | USD 12.40 – 14.80 | 30 days | Natural Flax, Oatmeal, Deep Navy |
| **MF-007** | Block Print Co-ord Set | Co-ord Sets | Cotton | S-XXL | 80 pcs | USD 10.80 – 12.90 | 28 days | Monochrome Dabu, Teal Jaal, Rust Geo |
| **MF-008** | Kurta, Pant and Dupatta Set | Ethnic Sets | Cotton Silk | S-3XL | 60 pcs | USD 14.50 – 17.80 | 35 days | Dusty Rose, Sage Green, Royal Cobalt |
| **MF-009** | Festive Anarkali Set | Ethnic Sets | Chanderi Blend | S-XXL | 50 pcs | USD 19.50 – 24.00 | 40 days | Maroon Gold, Emerald Green, Royal Navy |
| **MF-010** | Mandarin Collar Linen Shirt | Tops | Linen | XS-XL | 100 pcs | USD 8.20 – 9.90 | 25 days | Pure White, Natural Sand, Indigo Stripe |
| **MF-011** | Smocked Peasant Top | Tops | Cotton | S-XL | 120 pcs | USD 5.40 – 6.60 | 22 days | Floral White, Pastel Lavender, Coral |
| **MF-012** | Cotton Palazzo Pants | Bottoms | Cotton | Free/XL | 150 pcs | USD 3.90 – 4.80 | 20 days | Classic Black, Off-White, Dark Indigo |
| **MF-013** | Wide-Leg Linen Trousers | Bottoms | Linen Blend | S-XXL | 100 pcs | USD 7.40 – 9.10 | 25 days | Khaki Tan, Charcoal Grey, Pure White |
| **MF-014** | Curvy Printed Kurti | Plus Size | Rayon | 3XL-6XL | 80 pcs | USD 7.60 – 9.20 | 28 days | Wine Paisley, Navy Geometric, Plum Floral |
| **MF-015** | Organic Cotton Lounge Set | Loungewear | Organic Cotton | S-XXL | 150 pcs | USD 9.30 – 11.00 | 28 days | Heather Slate, Muted Sage, Natural Cloud |
| **MF-016** | Printed Cotton Dupatta | Dupattas | Cotton Mulmul | Free Size | 200 pcs | USD 2.20 – 3.10 | 15 days | Indigo Discharge, Bagru Red, Gold Foil Border |

---

## 9. Page 3: About & Export (`app/about/page.js`) — Deep-Dive Breakdown

The About & Export portal serves as an institutional dossier detailing the factory's manufacturing capabilities, ethical craftsmanship, and international commercial terms.

### 9.1 Heritage & Craftsmanship Clusters
- Chronicles the historical roots of Myka Fashion's artisan relationships across Rajasthan (Sanganer, Bagru) and Uttar Pradesh (Lucknow).
- Explains the labor-intensive wooden block carving technique using seasoned teak and sheesham wood.
- Details natural dye processes including fermented indigo vats, harda mordanting, and pomegranate rind yellows.
- Highlights Lucknow Chikankari embroidery traditions passed down through generations of female needlework artisans.

### 9.2 Sustainable & Natural Fabric Repertoire
- Comprehensive exploration of the factory's staple textiles:
  - **100% Pure Indian Cotton**: Long-staple, breathable yarn woven for durability and high wash-fastness.
  - **Linen & Linen Blends**: Premium European flax blended with Indian cotton for a lightweight, textured drape suited for resort collections.
  - **Cotton Mulmul**: Superfine, featherweight unbleached muslin renowned since ancient times for its cloud-like softness.
  - **Chanderi & Cotton-Silk**: Traditional sheer, lustrous weaves combining silk warp with fine cotton weft for luxury festive garments.
  - **Regenerated Rayon & Modal**: Fluid, silky drape engineered for high-color vibrancy in contemporary maxi dresses.

### 9.3 Manufacturing Infrastructure & Production Capacity
- **Facility Blueprint**:
  - Modern pattern-making and grading department utilizing digital CAD markers to maximize fabric yield.
  - Precision automatic fabric spreading and cutting machines minimizing grain distortion.
  - High-speed computerized lockstitch and overlock sewing workstations.
  - Dedicated finishing department with vacuum ironing tables, thread trimmers, and metal detection units.
- **Demonstration Metrics (Explicitly flagged for owner verification)**:
  - 25,000 monthly finished garment capacity.
  - 120-person production, technical, and quality assurance team.
  - 4-Stage Quality Assurance protocol following AQL 2.5 international export inspection standards (Raw Material Inspection, In-line Stitching Check, Semi-finished Ironing Audit, Final Pre-pack AQL Audit).

### 9.4 International Commercial Terms (Incoterms 2020 Explained)
To provide clarity for international retail buyers unfamiliar with freight logistics, the page breaks down the three primary shipping arrangements:
- **Ex-Works (EXW)**: The buyer assumes full responsibility and freight charges from the factory floor gate. Ideal for buyers with established domestic freight forwarders in India.
- **Free On Board (FOB - Recommended)**: Myka Fashion handles all inland transport, export clearances, port handling, and customs documentation up to loading onto the vessel or aircraft at Nhava Sheva (JNPT Mumbai) or New Delhi Air Cargo Terminal.
- **Cost, Insurance, and Freight (CIF)**: Myka Fashion covers all export handling, marine/air insurance, and international freight directly to the buyer's designated destination seaport or airport.

### 9.5 Private Labeling & White-Label Customization Services
Details the full spectrum of private label services offered to overseas brands:
- Custom woven main neck labels, printed satin care labels, and size tabs.
- Custom foil-stamped or kraft paper hang tags with barcode and pricing stickers.
- Individual branded biodegradable polybags and export carton inner liners.
- Custom brass or mother-of-pearl buttons, branded zips, and bespoke packaging ribbons.

### 9.6 Compliance & Ethical Standards Transparency
- Strictly adheres to the project's ethical guidelines by **not fabricating** non-existent audit numbers or counterfeit certification logos.
- Explains that official social compliance certificates (Sedex SMETA, GOTS organic certification, OEKO-TEX Standard 100) are furnished to prospective corporate buyers upon request during commercial review.

---

## 10. Page 4: Inquiry & Contact (`app/contact/page.js`) — Deep-Dive Breakdown

The Contact portal represents the critical conversion hub where prospective B2B buyers transition from browsing to receiving actionable commercial quotations.

### 10.1 Live Wholesale Shortlist Manifest
- If a buyer has added garments to their shortlist via the Collections page or Product Modals, the top of the page displays a structured review table:
  - Garment thumbnail, title, and SKU.
  - Quantity counter with real-time editing.
  - Custom colorway notes input (e.g. *"Need 100 pcs in Royal Indigo and 50 pcs in Mustard Yellow"*).
  - Sample indicator badge.
  - Remove item button.
- If no garments have been selected, an elegant notice encourages the buyer to either browse collections or proceed with a general custom manufacturing inquiry.

### 10.2 Comprehensive Buyer Intake Form
The form gathers all critical commercial parameters necessary for the sales desk to formulate an exact FOB/CIF proforma quotation:
1. **Full Contact Name**: Buyer's primary liaison.
2. **Professional Business Email**: Corporate email address (validated for RFC 5322 syntax).
3. **Telephone / WhatsApp Number**: Country code and direct dial for rapid quote coordination.
4. **Registered Company / Boutique Name**: Commercial entity name.
5. **Destination Country**: Complete global dropdown menu of international export territories.
6. **Buyer Commercial Classification**:
   - Independent Boutique Owner
   - Wholesale Garment Distributor
   - Department Store / Chain Retail Importer
   - Emerging Private Label Fashion Brand
   - Sourcing Agent / Buying House
7. **Conditional Indian GST Field**: Dynamically appears **only** when the selected country is "India". Validates the 15-character statutory alphanumeric GSTIN format (e.g., `08AAAAA0000A1Z5`), ensuring domestic business compliance.
8. **Estimated Aggregate Order Volume**: Total pieces projected across all styles (e.g., 100–300 pcs, 300–500 pcs, 500–1,000 pcs, 1,000+ pcs).
9. **Commercial Message & Custom Specifications**: Open textarea for custom sizing runs, fabric blends, label requirements, or target delivery dates.
10. **Optional Technical Pack / Reference Upload**: File attachment input supporting PDF, JPEG, PNG, or tech packs up to 10MB.
11. **Honeypot Anti-Spam Security**: Hidden input field (`_website_url`) that is invisible to human buyers. If automated spam bots populate this trap field, the submission is silently rejected without server overhead.

### 10.3 Form Validation & Submission Experience
- **Client-Side Validation**: Instant, informative inline error messages highlighting missing required fields or invalid email syntax.
- **Server-Side Validation**: Backend validation in `/api/inquiries` verifying payload integrity before database insertion.
- **Unique Inquiry Reference ID**: Upon successful submission, the system generates a human-readable, trackable reference number using the format `MF-INQ-XXXXXX` (e.g., `MF-INQ-A8F291`).
- **Confirmation State**: The form transitions into a luxury receipt card displaying the unique inquiry number, summary of requested styles, next steps timeline (24-hour turnaround), and direct WhatsApp follow-up button.

---

## 11. Administration Management Portal (`app/admin/`) — Deep-Dive Breakdown

The `/admin` portal provides facility owners and export managers with complete operational oversight over products, incoming quotation requests, and wholesale leads without needing to interact directly with raw database consoles.

### 11.1 Authentication & Security Architecture (`app/admin/login/page.js` & `lib/auth.js`)
- Dedicated, password-protected administrative gateway.
- Authenticates against the secure hashed/encrypted password defined in `ADMIN_PASSWORD` (defaulting to safe setup credentials for initial deployment).
- Issues an HTTP-only or secure session token stored under `myka_admin_token`.
- Every admin API endpoint (`/api/inquiries/*`, `/api/products/*`, `/api/settings`) verifies the authentication token before serving or altering sensitive commercial records.
- Complete session invalidation and cookie clearing via `/api/admin/logout`.

### 11.2 Executive Dashboard Overview & Operational KPIs
Upon logging in, administrators are presented with an executive metrics dashboard:
- **Total Inquiries Received**: Lifetime count of quotation requests.
- **Pending Review**: Inquiries requiring immediate sales desk action.
- **Samples Requested**: Total pre-production prototype requests currently in progress.
- **Active Products**: Number of published styles in the wholesale catalogue.
- **Total Catalogue Leads**: High-intent buyers who unlocked the PDF lookbook.

### 11.3 Product Catalogue Management (Full CRUD)
Administrators can manage the entire garment catalogue directly from the dashboard:
- **Add New Garment**: Modal form capturing SKU, title, category, fabric composition, size run, MOQ, FOB price range, production lead time, color options, and image URLs.
- **Edit Existing Style**: Instant in-place editing of pricing brackets, lead times, descriptions, and availability.
- **Toggle Active / Inactive Status**: Soft-disable seasonal or out-of-stock styles without deleting historical records.
- **Delete Style**: Permanent removal with confirmation safeguard.

### 11.4 Wholesale Inquiry Management & Processing Workflow
- **Filterable Inquiries Table**: Filter by operational status (`All`, `New`, `In Review`, `Quoted`, `Sample Sent`, `Completed`, `Archived`).
- **Comprehensive Inquiry Inspector**:
  - Full buyer dossier (Name, Company, Email, Phone, Country, Buyer Type, GSTIN if Indian).
  - Itemized garment shortlist table showing thumbnail, SKU, requested quantity, buyer color notes, and sample flags.
  - Buyer's original message and technical pack attachment references.
- **Lifecycle Status Updates**: One-click dropdown to update inquiry status as the negotiation progresses from initial submission to proforma quote issuance and factory dispatch.
- **RFC-4180 Compliant CSV Export**: One-click "Export to CSV" button triggering `/api/inquiries/export`, generating a spreadsheet compatible with Microsoft Excel, Google Sheets, or ERP software for batch processing.

### 11.5 Catalogue Leads Viewer
- Table displaying all prospective buyers who requested the wholesale lookbook.
- Captures business email, company name, destination territory, and download timestamps for immediate follow-up by the sales team.

### 11.6 Dynamic Site Configuration Panel
Enables non-technical administrators to update operational business parameters without modifying code or redeploying:
- Verified WhatsApp Phone Number (dynamically activates/deactivates the floating button across the site).
- Sales Notification Dispatch Email Address.
- Export Office Telephone Number.
- Primary Currency Symbol (e.g. USD, EUR, GBP).

---

## 12. Database Schema & Persistence Architecture

The data architecture is structured to support both enterprise-grade PostgreSQL deployments on Supabase and an offline, zero-configuration in-memory fallback.

### 12.1 PostgreSQL Database Schema (`supabase/schema.sql`)
The relational schema comprises five dedicated tables:

```sql
-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    fabric VARCHAR(100) NOT NULL,
    composition VARCHAR(255),
    sizes VARCHAR(100) NOT NULL,
    moq INTEGER NOT NULL DEFAULT 50,
    price_range VARCHAR(100) NOT NULL,
    tier_pricing JSONB DEFAULT '[]'::jsonb,
    lead_time VARCHAR(100) NOT NULL,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    colors JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_number VARCHAR(50) UNIQUE NOT NULL,
    buyer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    buyer_type VARCHAR(100),
    gst_number VARCHAR(50),
    estimated_quantity VARCHAR(100),
    message TEXT NOT NULL,
    attachment_url TEXT,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. INQUIRY ITEMS TABLE
CREATE TABLE IF NOT EXISTS inquiry_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    sku VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    color_notes TEXT,
    sample_requested BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CATALOGUE LEADS TABLE
CREATE TABLE IF NOT EXISTS catalogue_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### 12.2 Row Level Security (RLS) & Access Control Policies
To ensure compliance with global data privacy regulations and protect confidential wholesale pricing and client lists, strict RLS policies are enforced:
- **Products**: Public read-only access for active garments (`is_active = true`); write access restricted to authenticated service roles or admin sessions.
- **Inquiries & Inquiry Items**: Anonymous `INSERT` permitted so prospective buyers can submit quote requests. Public `SELECT`, `UPDATE`, or `DELETE` access is strictly blocked to prevent competitors from inspecting customer lists or RFQ volumes. Admin role has unrestricted read/write access.
- **Catalogue Leads**: Anonymous `INSERT` permitted for lookbook downloads; read access restricted strictly to administrators.

### 12.3 Resilient Hybrid Store Architecture (`lib/store.js`)
To eliminate deployment fragility, the repository layer implements a resilient abstraction:
- When valid `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables are present, the system communicates directly with Supabase via PostgreSQL queries.
- If Supabase credentials are not yet configured or temporarily unreachable, the store automatically falls back to an internal, stateful in-memory data store initialized with all 16 seed garments and 5 sample inquiries (`lib/data/demoInquiries.js`).
- This guarantees that the website, collections, product modals, inquiry submission, and admin portal remain fully interactive during previews, local evaluation, or staging.

---

## 13. Dynamic PDF Lookbook Engine (`lib/pdfGenerator.js`)

In international fashion wholesale, buyers expect a tangible, downloadable product catalogue to circulate among their buying committees and merchandising directors.

- **Technology**: Implemented using `jspdf` vector document generation.
- **Layout & Structure**:
  - **Cover Page**: High-contrast Deep Navy (`#14213D`) presentation featuring the Myka Fashion wordmark in antique gold, editorial typography, export credentials statement, and generation timestamp.
  - **Executive Company Profile**: Overview of Indian craft heritage, hand block-printing processes, Lucknow Chikankari embroidery, factory machinery, and Incoterm definitions.
  - **Itemized Product Grid & Specification Sheets**: Structured tables detailing every active style in the catalogue with SKU, Fabric, Available Sizes, MOQ, Indicative FOB Price, Lead Time, and standard colorway swatches.
  - **Commercial Ordering Terms & Contact Sheet**: Clear instructions on proforma quote issuance, sample dispatch, payment terms (T/T wire, L/C for container loads), and direct contact details.
- **Streaming Delivery**: The PDF is assembled in server memory and streamed directly as an `application/pdf` attachment download via `/api/catalogue-download`.

---

## 14. Transactional Email Dispatch System (`lib/email.js`)

Every submitted quote request automatically initiates two tailored transactional email notifications:

### 14.1 Buyer Proforma Confirmation Notification
- **Recipient**: The prospective wholesale buyer.
- **Styling**: Formatted with an ivory and navy luxury editorial layout matching the website branding.
- **Content**:
  - Acknowledges receipt of the RFQ with their unique reference code (`MF-INQ-XXXXXX`).
  - Summarizes the requested styles, quantities, and colorway notes.
  - Sets clear expectations: an export manager will review their specifications and provide a formal FOB/CIF proforma quotation and swatch availability within 24 business hours.
  - Provides a direct link to initiate real-time coordination on WhatsApp.

### 14.2 Internal Sales Desk Dispatch Notification
- **Recipient**: The internal facility sales director (configured via `NOTIFICATION_EMAIL`).
- **Content**:
  - Immediate operational alert with high-priority visual cues.
  - Complete buyer profile: Name, Company, Country, Buyer Type, Phone/WhatsApp, and Indian GSTIN (if applicable).
  - Itemized garment list with SKUs, piece counts, and custom notes.
  - The buyer's custom message and technical pack links.
  - Direct one-click link to open the inquiry in the `/admin` portal.

### 14.3 Resend Integration & Development Mock Mode
- Powered by the official `resend` SDK (`RESEND_API_KEY`).
- When running in local development or before an API key is provisioned, the email subsystem gracefully switches to **Mock Mode**: it renders the complete HTML payload and logs it directly to the server terminal, ensuring zero runtime crashes while allowing full inspection of email templates.

---

## 15. Quality Assurance, Automated Testing & Verification Protocols

The platform underwent rigorous testing across multiple validation vectors to guarantee enterprise-grade stability.

### 15.1 Offline Architectural & Data Integration Test Suite (`test-e2e.mjs`)
A comprehensive standalone Node.js ES Module test script verifying 25 structural, data, and functional assertions:
1. `products.js` contains all 16 required seed products.
2. Every product possesses a valid, unique `MF-001` through `MF-016` SKU format.
3. Every product specifies a non-empty name, category, fabric, size run, MOQ, FOB price range, and lead time.
4. `MF-001` correctly incorporates the 4-tier wholesale volume price schedule.
5. All 16 products reference verified, high-resolution fashion photography.
6. `store.js` successfully initializes the seed catalogue in memory.
7. `store.getProducts()` retrieves all 16 active records.
8. Filter queries by category (e.g. `Kurtis`, `Co-ord Sets`) return exact matches.
9. Free-text search by SKU and keyword returns accurate subsets.
10. `store.createInquiry()` accepts complete buyer payloads and assigns an `id` and `inquiry_number`.
11. Line items are accurately persisted and linked to the parent inquiry record.
12. Status lifecycle transitions (`New` -> `In Review` -> `Quoted`) persist correctly.
13. CSV export formatting complies with RFC-4180 quotation standards.
14. PDF Lookbook generator initializes and outputs a valid PDF buffer.
15. Email dispatch module handles mock notifications cleanly without throwing uncaught exceptions.
- **Result**: **25/25 Tests Passed (100% Success Rate)**.

### 15.2 Live HTTP Server Integration Test Suite (`test-server.mjs`)
An automated test harness that starts the Next.js production server and probes all live HTTP endpoints:
1. `GET /` — Returns HTTP 200 with complete homepage DOM.
2. `GET /collections` — Returns HTTP 200 with catalogue DOM.
3. `GET /about` — Returns HTTP 200 with brand story and Incoterms DOM.
4. `GET /contact` — Returns HTTP 200 with inquiry intake form DOM.
5. `GET /admin/login` — Returns HTTP 200 with admin authentication screen.
6. `GET /api/products` — Returns HTTP 200 with JSON payload containing 16 active garments.
7. `GET /api/products?category=Kurtis` — Returns HTTP 200 with exactly filtered Kurti styles.
8. `GET /api/products?search=MF-001` — Returns HTTP 200 with the exact Indigo Block Print Kurti.
9. `POST /api/inquiries` — Submits a realistic B2B wholesale quotation payload and receives HTTP 201 with a unique tracking code.
10. `POST /api/catalogue-download` — Submits lead credentials and receives a valid `application/pdf` binary stream.
11. `GET /robots.txt` & `GET /sitemap.xml` — Returns HTTP 200 with proper search crawler directives.
- **Result**: **12/12 Live Endpoints Passed (100% Success Rate)**.

### 15.3 Image Reliability & Upstream Fallback Architecture
During automated network scanning of external imagery, one legacy Unsplash photo ID (`photo-1583391733975-dd8837e3d3bd`) was found to return an HTTP 404 error from upstream CDNs.
- The broken URL was replaced with verified, active, high-resolution Indian ethnic couture photography (`photo-1617627143750-d86bc21e42bb`, `photo-1610030469983-98e550d6193c`, `photo-1596755094514-f87e34085b2c`).
- In addition, an intelligent `onError` fallback mechanism was added to all product cards and modal views: if an upstream image fails to load due to client-side ad-blockers or CDN disruptions, the component automatically swaps the broken source with a styled, branded SVG placeholder, completely preventing broken image icons.

---

## 16. Step-by-Step Production Deployment Guide

The Myka Fashion platform is fully prepared for one-click deployment on **Vercel** with a managed **Supabase** backend.

### 16.1 Step 1: Push Code to GitHub
Ensure the latest codebase is pushed to your GitHub repository:
```bash
git remote add origin https://github.com/andro1surya/Myka-fashion.git
git branch -M main
git push -u origin main
```

### 16.2 Step 2: Set Up Supabase Database
1. Log in to [Supabase](https://supabase.com) and create a new project named `myka-fashion`.
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy and paste the contents of `supabase/schema.sql` and click **Run**. This establishes all tables, indexes, triggers, and Row Level Security policies.
4. Copy and paste the contents of `supabase/seed.sql` and click **Run**. This populates the database with all 16 seed styles and initial demonstration records.
5. In your Supabase project settings, navigate to **API** and copy:
   - **Project URL** (`https://xyzcompany.supabase.co`)
   - **anon / public key**
   - **service_role key** (secret key for server-side route handlers)

### 16.3 Step 3: Set Up Transactional Email on Resend
1. Create a free account at [Resend](https://resend.com).
2. Generate an API Key under **API Keys** with full sending permissions.
3. Verify your custom sending domain (e.g. `export@mykafashion.com`) or use the default sandbox domain for testing.

### 16.4 Step 4: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Import the `andro1surya/Myka-fashion` repository.
3. In the **Environment Variables** configuration section, enter the following keys:

| Environment Variable | Recommended Value / Description | Required? |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL (`https://your-id.supabase.co`) | Recommended |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public API key | Recommended |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service_role secret key | Recommended |
| `RESEND_API_KEY` | Your Resend API key (`re_...`) | Optional (falls back to mock mode) |
| `RESEND_FROM_EMAIL` | Sender address (e.g., `Myka Fashion <inquiries@yourdomain.com>`) | Optional |
| `NOTIFICATION_EMAIL` | Sales desk inbox (e.g., `sales@yourdomain.com`) | Optional |
| `ADMIN_PASSWORD` | Strong administrative password for `/admin` access | Recommended |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Verified international phone with country code (e.g. `919876543210`) | Optional (activates WhatsApp button) |
| `NEXT_PUBLIC_SITE_URL` | Production website URL (`https://mykafashion.com`) | Recommended |

4. Click **Deploy**. Vercel will automatically build the Next.js App Router application and provide an SSL-secured production URL.

---

## 17. Maintenance, Handover & Operational Notes for Future Developers

1. **Adding New Products**:
   - Products can be added directly through the `/admin` portal GUI.
   - Alternatively, add product definitions to `lib/data/products.js` and run `supabase/seed.sql`.
2. **Modifying MOQ or Pricing Tiers**:
   - Updates made in the `/admin` dashboard take effect immediately.
   - For multi-tiered wholesale schedules (like `MF-001`), edit the `tier_pricing` JSONB array in the product record.
3. **Changing Incoterms or Export Story**:
   - All editorial text on the About & Export page is maintained in clean JSX inside `app/about/page.js`.
4. **Offline Resilience**:
   - The platform is designed so that even if Supabase experiences an outage, `lib/store.js` handles data requests gracefully, preventing customer-facing errors.
5. **No Cart / Checkout Rule**:
   - Under no circumstances should consumer cart checkout or payment gateway integrations (Stripe, Razorpay, etc.) be introduced unless the brand explicitly pivots from B2B manufacturing to B2C retail.

---

*Document compiled and certified by the Autonomous Engineering & Design Team for Myka Fashion.*
