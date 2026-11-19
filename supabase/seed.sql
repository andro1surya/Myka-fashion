-- =====================================================================
-- MYKA FASHION - SEED DATA SCRIPT
-- =====================================================================

-- 1. SEED ALL 16 PRODUCTS
INSERT INTO public.products (sku, name, slug, category, description, fabric, composition, sizes, moq, price_min, price_max, price_display, lead_time, images, colors, price_tiers, is_active, is_featured)
VALUES
(
    'MF-001',
    'Indigo Block Print Cotton Kurti',
    'indigo-block-print-cotton-kurti',
    'Kurtis',
    'Handcrafted Indian cotton kurti featuring artisanal Bagru Dabu mud-resist indigo block printing. Designed with a Mandarin keyhole collar, side slits, and breathable weave tailored for export markets.',
    '100% cotton',
    '100% Cambric Cotton, 60s count',
    ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    100,
    6.80,
    8.50,
    'USD 6.80-8.50',
    '25 days',
    ARRAY[
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Traditional Indigo", "hex": "#1B365D"}, {"name": "Madder Rust", "hex": "#8B3A2B"}, {"name": "Ivory Natural", "hex": "#F4EFE6"}]'::jsonb,
    '[
        {"range": "100-299 pcs", "price": "USD 8.50", "leadTime": "25 days"},
        {"range": "300-999 pcs", "price": "USD 7.60", "leadTime": "28 days"},
        {"range": "1,000-2,999 pcs", "price": "USD 7.10", "leadTime": "32 days"},
        {"range": "3,000+ pcs", "price": "USD 6.80", "leadTime": "On request"}
    ]'::jsonb,
    true,
    true
),
(
    'MF-002',
    'Chikankari Embroidered Tunic',
    'chikankari-embroidered-tunic',
    'Kurtis',
    'Authentic Lucknowi hand-embroidered shadow and bakhiya work on flowing premium georgette. Finished with delicate crochet lace edging along the hem and sleeves.',
    'Georgette',
    '100% Faux Georgette with Cotton Embroidery Thread',
    ARRAY['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    60,
    11.20,
    13.50,
    'USD 11.20-13.50',
    '35 days',
    ARRAY[
        'https://images.unsplash.com/photo-1583391733975-dd8837e3d3bd?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Pristine White", "hex": "#FFFFFF"}, {"name": "Powder Peach", "hex": "#FAD4C0"}, {"name": "Mint Sage", "hex": "#B5C99A"}]'::jsonb,
    '[]'::jsonb,
    true,
    true
),
(
    'MF-003',
    'Straight-Fit Kurti with Pockets',
    'straight-fit-kurti-with-pockets',
    'Kurtis',
    'Contemporary minimal daily wear kurti in textured handloom-feel cotton slub with dual functional side seam pockets and mother-of-pearl buttons.',
    'Cotton slub',
    '100% Cotton Slub, yarn-dyed',
    ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    150,
    5.90,
    7.20,
    'USD 5.90-7.20',
    '22 days',
    ARRAY[
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Terracotta", "hex": "#A64B2A"}, {"name": "Olive Khaki", "hex": "#556B2F"}, {"name": "Charcoal Black", "hex": "#2B2B2B"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-004',
    'Floral Rayon Maxi Dress',
    'floral-rayon-maxi-dress',
    'Dresses',
    'Fluid bohemian floor-length maxi dress crafted from breathable 140 GSM rayon with romantic vintage botanical prints, flutter sleeves and drawstring waist cinch.',
    'Rayon',
    '100% Liva Certified Viscose Rayon',
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    100,
    7.90,
    9.60,
    'USD 7.90-9.60',
    '30 days',
    ARRAY[
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Vintage Mustard", "hex": "#D4A373"}, {"name": "Midnight Floral", "hex": "#1D2D44"}, {"name": "Blush Rose", "hex": "#E0AFA0"}]'::jsonb,
    '[]'::jsonb,
    true,
    true
),
(
    'MF-005',
    'Tiered Cotton Voile Midi Dress',
    'tiered-cotton-voile-midi-dress',
    'Dresses',
    'Lightweight multi-tiered tiered summer midi in ultra-soft organic cotton voile. Full breathable lining, ruffle neckline and refined cuff details.',
    'Cotton voile',
    '100% Fine Cotton Voile with Cotton Mull Lining',
    ARRAY['S', 'M', 'L', 'XL'],
    100,
    8.60,
    10.20,
    'USD 8.60-10.20',
    '28 days',
    ARRAY[
        'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Soft Sage", "hex": "#7A8B76"}, {"name": "Warm Cream", "hex": "#FAF0CA"}, {"name": "Antique Rose", "hex": "#DDA15E"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-006',
    'Linen Co-ord Set (Top and Pant)',
    'linen-co-ord-set-top-and-pant',
    'Co-ord Sets',
    'Two-piece relaxed resort silhouette featuring a boxy notch-collar cropped shirt paired with wide-leg elasticated cropped trousers in pre-washed natural linen.',
    'Linen blend',
    '55% French Flax Linen, 45% Cotton',
    ARRAY['S', 'M', 'L', 'XL'],
    80,
    12.40,
    14.80,
    'USD 12.40-14.80',
    '30 days',
    ARRAY[
        'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Natural Oatmeal", "hex": "#D8C3A5"}, {"name": "Deep Terracotta", "hex": "#A64B2A"}, {"name": "Washed Navy", "hex": "#274C77"}]'::jsonb,
    '[]'::jsonb,
    true,
    true
),
(
    'MF-007',
    'Block Print Co-ord Set',
    'block-print-co-ord-set',
    'Co-ord Sets',
    'Hand-printed matching 2-piece lounge ensemble. Relaxed tunic top with side slits and matching ankle-tapered pull-on pants with comfortable drawstring.',
    'Cotton',
    '100% Pure Cotton Sheeting',
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    80,
    10.80,
    12.90,
    'USD 10.80-12.90',
    '28 days',
    ARRAY[
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Sanganeri Blue", "hex": "#2B4162"}, {"name": "Jaipur Ochre", "hex": "#E07A5F"}, {"name": "Forest Green", "hex": "#3D5A80"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-008',
    'Kurta, Pant and Dupatta Set',
    'kurta-pant-and-dupatta-set',
    'Ethnic Sets',
    'Complete three-piece occasion wear suit. Straight long kurta with subtle zari yoke highlight, straight cigarette pants, and pure organza woven border dupatta.',
    'Cotton silk',
    '70% Cotton, 30% Silk with Zari Accent',
    ARRAY['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    60,
    14.50,
    17.80,
    'USD 14.50-17.80',
    '35 days',
    ARRAY[
        'https://images.unsplash.com/photo-1583391733975-dd8837e3d3bd?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Antique Gold", "hex": "#B8893B"}, {"name": "Regal Emerald", "hex": "#2D6A4F"}, {"name": "Deep Garnet", "hex": "#6B2D5C"}]'::jsonb,
    '[]'::jsonb,
    true,
    true
),
(
    'MF-009',
    'Festive Anarkali Set',
    'festive-anarkali-set',
    'Ethnic Sets',
    'Voluminous 24-kali flared Anarkali gown paired with matching churidar and artisanal Banarasi silk-blend dupatta. Finished with gota patti handwork along the borders.',
    'Chanderi blend',
    '60% Chanderi Silk, 40% Cotton',
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    50,
    19.50,
    24.00,
    'USD 19.50-24.00',
    '40 days',
    ARRAY[
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Ivory Pearl", "hex": "#F4EFE6"}, {"name": "Ruby Crimson", "hex": "#9B2226"}, {"name": "Royal Navy", "hex": "#14213D"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-010',
    'Mandarin Collar Linen Shirt',
    'mandarin-collar-linen-shirt',
    'Tops',
    'Sophisticated relaxed women''s button-down in European linen. Featuring a clean grandad band collar, mother-of-pearl buttons, and a curved hem suitable for layering.',
    'Linen',
    '100% Pre-washed European Flax Linen',
    ARRAY['XS', 'S', 'M', 'L', 'XL'],
    100,
    8.20,
    9.90,
    'USD 8.20-9.90',
    '25 days',
    ARRAY[
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Bleached White", "hex": "#FFFFFF"}, {"name": "French Blue", "hex": "#4A6FA5"}, {"name": "Sand Dune", "hex": "#D3B88C"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-011',
    'Smocked Peasant Top',
    'smocked-peasant-top',
    'Tops',
    'Boho elasticated smocked bodice with raglan puff sleeves and square neckline. Soft breathable cotton fabric with delicate tonal hand embroidery along the sleeve cuff.',
    'Cotton',
    '100% Breathable Cotton Poplin',
    ARRAY['S', 'M', 'L', 'XL'],
    120,
    5.40,
    6.60,
    'USD 5.40-6.60',
    '22 days',
    ARRAY[
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Ivory Sand", "hex": "#F4EFE6"}, {"name": "Brick Red", "hex": "#9E2A2B"}, {"name": "Olive Moss", "hex": "#606C38"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-012',
    'Cotton Palazzo Pants',
    'cotton-palazzo-pants',
    'Bottoms',
    'Wide-leg fluid palazzo trousers in breathable plain-weave cotton. Full elasticated waistband with adjustable drawstring, deep side pockets and reinforced inner seams.',
    'Cotton',
    '100% Premium Combed Cotton',
    ARRAY['Free', 'XL'],
    150,
    3.90,
    4.80,
    'USD 3.90-4.80',
    '20 days',
    ARRAY[
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Off White", "hex": "#FAF0CA"}, {"name": "Jet Black", "hex": "#1F2421"}, {"name": "Camel Khaki", "hex": "#C2B280"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-013',
    'Wide-Leg Linen Trousers',
    'wide-leg-linen-trousers',
    'Bottoms',
    'Tailored front pleat trousers in rich linen-cotton blend. Features high-waist band, belt loops, side slant pockets and clean blind-stitched hem.',
    'Linen blend',
    '50% Flax Linen, 50% Organic Cotton',
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    100,
    7.40,
    9.10,
    'USD 7.40-9.10',
    '25 days',
    ARRAY[
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Natural Ecru", "hex": "#E9D8A6"}, {"name": "Deep Olive", "hex": "#415A77"}, {"name": "Rich Mocha", "hex": "#583101"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-014',
    'Curvy Printed Kurti',
    'curvy-printed-kurti',
    'Plus Size',
    'Generously cut A-line silhouette specifically tailored for full-figured comfort. Soft flowing rayon fabric with vertical ethnic geometric motifs that elongate the frame.',
    'Rayon',
    '100% Rayon 160 GSM Heavy Drape',
    ARRAY['3XL', '4XL', '5XL', '6XL'],
    80,
    7.60,
    9.20,
    'USD 7.60-9.20',
    '28 days',
    ARRAY[
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1583391733975-dd8837e3d3bd?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Teal Botanical", "hex": "#005F73"}, {"name": "Rust Mandala", "hex": "#CA6702"}, {"name": "Navy Paisley", "hex": "#14213D"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-015',
    'Organic Cotton Lounge Set',
    'organic-cotton-lounge-set',
    'Loungewear',
    'Ultra-soft GOTS-grade combed organic cotton two-piece sleepwear and home lounge set. Includes relaxed scoop tee and relaxed jogger pants with elastic cuff.',
    'Organic cotton',
    '100% Certified Organic Cotton Jersey 180 GSM',
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    150,
    9.30,
    11.00,
    'USD 9.30-11.00',
    '28 days',
    ARRAY[
        'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Heather Fog", "hex": "#CED4DA"}, {"name": "Dusty Rose", "hex": "#D8A48F"}, {"name": "Sage Mist", "hex": "#7A8B76"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
),
(
    'MF-016',
    'Printed Cotton Dupatta',
    'printed-cotton-dupatta',
    'Dupattas',
    'Feather-light 2.4 meter full-length mulmul cotton scarf finished with handmade cotton tassels. Traditional Sanganeri screen/block print in natural mineral dyes.',
    'Cotton mulmul',
    '100% Superfine Cotton Mulmul 80s Count',
    ARRAY['Free'],
    200,
    2.20,
    3.10,
    'USD 2.20-3.10',
    '15 days',
    ARRAY[
        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    '[{"name": "Indigo Floral", "hex": "#14213D"}, {"name": "Marigold Gold", "hex": "#B8893B"}, {"name": "Crimson Jaal", "hex": "#A64B2A"}]'::jsonb,
    '[]'::jsonb,
    true,
    false
)
ON CONFLICT (sku) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    fabric = EXCLUDED.fabric,
    composition = EXCLUDED.composition,
    sizes = EXCLUDED.sizes,
    moq = EXCLUDED.moq,
    price_min = EXCLUDED.price_min,
    price_max = EXCLUDED.price_max,
    price_display = EXCLUDED.price_display,
    lead_time = EXCLUDED.lead_time,
    images = EXCLUDED.images,
    colors = EXCLUDED.colors,
    price_tiers = EXCLUDED.price_tiers,
    updated_at = now();


-- 2. SEED DEMO INQUIRIES (Clearly flagged is_demo = true)
INSERT INTO public.inquiries (inquiry_number, full_name, business_email, phone, company_name, country, buyer_type, estimated_quantity, message, status, is_demo, created_at)
VALUES
(
    'MF-INQ-0038',
    'Emma Clarke',
    'e.clarke@willowandthread.co.uk',
    '+44 7700 900123',
    'Willow and Thread',
    'United Kingdom',
    'Boutique',
    600,
    'Export inquiry for Spring/Summer collection. Interested in private labeling with custom hang tags for UK retail delivery.',
    'Quote Sent',
    true,
    now() - INTERVAL '3 days'
),
(
    'MF-INQ-0039',
    'Rajesh Mehta',
    'rajesh@mehtagarments.in',
    '+91 98200 12345',
    'Mehta Garments',
    'India',
    'Wholesaler',
    2000,
    'Bulk wholesale supply across North India stores. Need FOB dispatch from Jaipur/Delhi hub within 30 days.',
    'Negotiation',
    true,
    now() - INTERVAL '2 days'
),
(
    'MF-INQ-0040',
    'Fatima Al-Sayed',
    'fatima@desertrosegulf.ae',
    '+971 50 123 4567',
    'Desert Rose',
    'United Arab Emirates',
    'Importer',
    1200,
    'Export consignment for Dubai & Riyadh stores. Custom length requested on maxi dresses. CIF Jebel Ali terms.',
    'New',
    true,
    now() - INTERVAL '1 day'
),
(
    'MF-INQ-0041',
    'Claire Dubois',
    'c.dubois@maisonlotus.fr',
    '+33 6 12 34 56 78',
    'Maison Lotus',
    'France',
    'Brand',
    3,
    'Sample request for SS26 evaluation. Please dispatch 3 swatches and sample pieces via DHL Express to Paris studio.',
    'Sample Sent',
    true,
    now() - INTERVAL '12 hours'
),
(
    'MF-INQ-0042',
    'Priya Nair',
    'priya@kaayalabel.com',
    '+91 99887 76655',
    'Kaaya Label',
    'India',
    'Brand',
    400,
    'Private Label requirement: Custom kurta line with proprietary block designs. Looking for sampling timeline.',
    'Contacted',
    true,
    now() - INTERVAL '4 hours'
)
ON CONFLICT (inquiry_number) DO NOTHING;

-- 3. SEED DEMO INQUIRY ITEMS
INSERT INTO public.inquiry_items (inquiry_id, sku, product_name, quantity, color_notes, is_sample_request)
SELECT id, 'MF-001', 'Indigo Block Print Cotton Kurti', 300, 'Traditional Indigo', false FROM public.inquiries WHERE inquiry_number = 'MF-INQ-0038'
UNION ALL
SELECT id, 'MF-006', 'Linen Co-ord Set (Top and Pant)', 300, 'Natural Oatmeal', false FROM public.inquiries WHERE inquiry_number = 'MF-INQ-0038'
UNION ALL
SELECT id, 'MF-003', 'Straight-Fit Kurti with Pockets', 1000, 'Terracotta', false FROM public.inquiries WHERE inquiry_number = 'MF-INQ-0039'
UNION ALL
SELECT id, 'MF-012', 'Cotton Palazzo Pants', 1000, 'Jet Black', false FROM public.inquiries WHERE inquiry_number = 'MF-INQ-0039'
UNION ALL
SELECT id, 'MF-004', 'Floral Rayon Maxi Dress', 700, 'Midnight Floral', false FROM public.inquiries WHERE inquiry_number = 'MF-INQ-0040'
UNION ALL
SELECT id, 'MF-008', 'Kurta, Pant and Dupatta Set', 500, 'Antique Gold', false FROM public.inquiries WHERE inquiry_number = 'MF-INQ-0040'
UNION ALL
SELECT id, 'MF-005', 'Tiered Cotton Voile Midi Dress', 3, 'Sample pieces: Soft Sage, Warm Cream, Antique Rose', true FROM public.inquiries WHERE inquiry_number = 'MF-INQ-0041'
ON CONFLICT DO NOTHING;
