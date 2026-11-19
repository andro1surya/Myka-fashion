// Master product seed data for MYKA FASHION
// All 16 products exactly as specified in the PRD

export const initialProducts = [
  {
    id: "mf-001",
    sku: "MF-001",
    name: "Indigo Block Print Cotton Kurti",
    slug: "indigo-block-print-cotton-kurti",
    category: "Kurtis",
    description: "Handcrafted Indian cotton kurti featuring artisanal Bagru Dabu mud-resist indigo block printing. Designed with a Mandarin keyhole collar, side slits, and breathable weave tailored for international resort and retail markets.",
    fabric: "100% cotton",
    composition: "100% Cambric Cotton, 60s count, natural vegetable dyes",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    moq: 100,
    priceMin: 6.80,
    priceMax: 8.50,
    priceDisplay: "USD 6.80-8.50",
    leadTime: "25 days",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Traditional Indigo", hex: "#1B365D" },
      { name: "Madder Rust", hex: "#8B3A2B" },
      { name: "Ivory Natural", hex: "#F4EFE6" }
    ],
    priceTiers: [
      { range: "100-299 pcs", price: "USD 8.50", leadTime: "25 days" },
      { range: "300-999 pcs", price: "USD 7.60", leadTime: "28 days" },
      { range: "1,000-2,999 pcs", price: "USD 7.10", leadTime: "32 days" },
      { range: "3,000+ pcs", price: "USD 6.80", leadTime: "Lead time on request" }
    ],
    isActive: true,
    isFeatured: true
  },
  {
    id: "mf-002",
    sku: "MF-002",
    name: "Chikankari Embroidered Tunic",
    slug: "chikankari-embroidered-tunic",
    category: "Kurtis",
    description: "Authentic Lucknowi hand-embroidered shadow and bakhiya work on flowing premium georgette. Finished with delicate crochet lace edging along the hem and sleeves, ideal for modern boho and occasion boutiques.",
    fabric: "Georgette",
    composition: "100% Faux Georgette with Cotton Embroidery Thread",
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    moq: 60,
    priceMin: 11.20,
    priceMax: 13.50,
    priceDisplay: "USD 11.20-13.50",
    leadTime: "35 days",
    images: [
      "https://images.unsplash.com/photo-1583391733975-dd8837e3d3bd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Pristine White", hex: "#FFFFFF" },
      { name: "Powder Peach", hex: "#FAD4C0" },
      { name: "Mint Sage", hex: "#B5C99A" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: true
  },
  {
    id: "mf-003",
    sku: "MF-003",
    name: "Straight-Fit Kurti with Pockets",
    slug: "straight-fit-kurti-with-pockets",
    category: "Kurtis",
    description: "Contemporary minimal daily wear kurti in textured handloom-feel cotton slub with dual functional side seam pockets and mother-of-pearl buttons.",
    fabric: "Cotton slub",
    composition: "100% Cotton Slub, yarn-dyed 180 GSM",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
    moq: 150,
    priceMin: 5.90,
    priceMax: 7.20,
    priceDisplay: "USD 5.90-7.20",
    leadTime: "22 days",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Terracotta", hex: "#A64B2A" },
      { name: "Olive Khaki", hex: "#556B2F" },
      { name: "Charcoal Black", hex: "#2B2B2B" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-004",
    sku: "MF-004",
    name: "Floral Rayon Maxi Dress",
    slug: "floral-rayon-maxi-dress",
    category: "Dresses",
    description: "Fluid bohemian floor-length maxi dress crafted from breathable 140 GSM rayon with romantic vintage botanical prints, flutter sleeves and drawstring waist cinch.",
    fabric: "Rayon",
    composition: "100% Liva Certified Viscose Rayon",
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: 100,
    priceMin: 7.90,
    priceMax: 9.60,
    priceDisplay: "USD 7.90-9.60",
    leadTime: "30 days",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Vintage Mustard", hex: "#D4A373" },
      { name: "Midnight Floral", hex: "#1D2D44" },
      { name: "Blush Rose", hex: "#E0AFA0" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: true
  },
  {
    id: "mf-005",
    sku: "MF-005",
    name: "Tiered Cotton Voile Midi Dress",
    slug: "tiered-cotton-voile-midi-dress",
    category: "Dresses",
    description: "Lightweight multi-tiered summer midi in ultra-soft organic cotton voile. Full breathable cotton lining, ruffle neckline and refined cuff details.",
    fabric: "Cotton voile",
    composition: "100% Fine Cotton Voile with Cotton Mull Lining",
    sizes: ["S", "M", "L", "XL"],
    moq: 100,
    priceMin: 8.60,
    priceMax: 10.20,
    priceDisplay: "USD 8.60-10.20",
    leadTime: "28 days",
    images: [
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Soft Sage", hex: "#7A8B76" },
      { name: "Warm Cream", hex: "#FAF0CA" },
      { name: "Antique Rose", hex: "#DDA15E" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-006",
    sku: "MF-006",
    name: "Linen Co-ord Set (Top and Pant)",
    slug: "linen-co-ord-set-top-and-pant",
    category: "Co-ord Sets",
    description: "Two-piece relaxed resort silhouette featuring a boxy notch-collar cropped shirt paired with wide-leg elasticated cropped trousers in pre-washed natural linen.",
    fabric: "Linen blend",
    composition: "55% French Flax Linen, 45% Cotton",
    sizes: ["S", "M", "L", "XL"],
    moq: 80,
    priceMin: 12.40,
    priceMax: 14.80,
    priceDisplay: "USD 12.40-14.80",
    leadTime: "30 days",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Natural Oatmeal", hex: "#D8C3A5" },
      { name: "Deep Terracotta", hex: "#A64B2A" },
      { name: "Washed Navy", hex: "#274C77" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: true
  },
  {
    id: "mf-007",
    sku: "MF-007",
    name: "Block Print Co-ord Set",
    slug: "block-print-co-ord-set",
    category: "Co-ord Sets",
    description: "Hand-printed matching 2-piece lounge ensemble. Relaxed tunic top with side slits and matching ankle-tapered pull-on pants with comfortable drawstring.",
    fabric: "Cotton",
    composition: "100% Pure Cotton Sheeting 140 GSM",
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: 80,
    priceMin: 10.80,
    priceMax: 12.90,
    priceDisplay: "USD 10.80-12.90",
    leadTime: "28 days",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Sanganeri Blue", hex: "#2B4162" },
      { name: "Jaipur Ochre", hex: "#E07A5F" },
      { name: "Forest Green", hex: "#3D5A80" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-008",
    sku: "MF-008",
    name: "Kurta, Pant and Dupatta Set",
    slug: "kurta-pant-and-dupatta-set",
    category: "Ethnic Sets",
    description: "Complete three-piece occasion wear suit. Straight long kurta with subtle zari yoke highlight, straight cigarette pants, and pure organza woven border dupatta.",
    fabric: "Cotton silk",
    composition: "70% Cotton, 30% Silk with Zari Border",
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    moq: 60,
    priceMin: 14.50,
    priceMax: 17.80,
    priceDisplay: "USD 14.50-17.80",
    leadTime: "35 days",
    images: [
      "https://images.unsplash.com/photo-1583391733975-dd8837e3d3bd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Antique Gold", hex: "#B8893B" },
      { name: "Regal Emerald", hex: "#2D6A4F" },
      { name: "Deep Garnet", hex: "#6B2D5C" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: true
  },
  {
    id: "mf-009",
    sku: "MF-009",
    name: "Festive Anarkali Set",
    slug: "festive-anarkali-set",
    category: "Ethnic Sets",
    description: "Voluminous 24-kali flared Anarkali gown paired with matching churidar and artisanal Banarasi silk-blend dupatta. Finished with gota patti handwork along the borders.",
    fabric: "Chanderi blend",
    composition: "60% Chanderi Silk, 40% Fine Cotton",
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: 50,
    priceMin: 19.50,
    priceMax: 24.00,
    priceDisplay: "USD 19.50-24.00",
    leadTime: "40 days",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Ivory Pearl", hex: "#F4EFE6" },
      { name: "Ruby Crimson", hex: "#9B2226" },
      { name: "Royal Navy", hex: "#14213D" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-010",
    sku: "MF-010",
    name: "Mandarin Collar Linen Shirt",
    slug: "mandarin-collar-linen-shirt",
    category: "Tops",
    description: "Sophisticated relaxed women's button-down in European flax linen. Featuring a clean grandad band collar, mother-of-pearl buttons, and a curved hem suitable for layering.",
    fabric: "Linen",
    composition: "100% Pre-washed European Flax Linen",
    sizes: ["XS", "S", "M", "L", "XL"],
    moq: 100,
    priceMin: 8.20,
    priceMax: 9.90,
    priceDisplay: "USD 8.20-9.90",
    leadTime: "25 days",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Bleached White", hex: "#FFFFFF" },
      { name: "French Blue", hex: "#4A6FA5" },
      { name: "Sand Dune", hex: "#D3B88C" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-011",
    sku: "MF-011",
    name: "Smocked Peasant Top",
    slug: "smocked-peasant-top",
    category: "Tops",
    description: "Boho elasticated smocked bodice with raglan puff sleeves and square neckline. Soft breathable cotton fabric with delicate tonal hand embroidery along the sleeve cuff.",
    fabric: "Cotton",
    composition: "100% Breathable Cotton Poplin",
    sizes: ["S", "M", "L", "XL"],
    moq: 120,
    priceMin: 5.40,
    priceMax: 6.60,
    priceDisplay: "USD 5.40-6.60",
    leadTime: "22 days",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Ivory Sand", hex: "#F4EFE6" },
      { name: "Brick Red", hex: "#9E2A2B" },
      { name: "Olive Moss", hex: "#606C38" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-012",
    sku: "MF-012",
    name: "Cotton Palazzo Pants",
    slug: "cotton-palazzo-pants",
    category: "Bottoms",
    description: "Wide-leg fluid palazzo trousers in breathable plain-weave cotton. Full elasticated waistband with adjustable drawstring, deep side pockets and reinforced inner seams.",
    fabric: "Cotton",
    composition: "100% Premium Combed Cotton 160 GSM",
    sizes: ["Free", "XL"],
    moq: 150,
    priceMin: 3.90,
    priceMax: 4.80,
    priceDisplay: "USD 3.90-4.80",
    leadTime: "20 days",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Off White", hex: "#FAF0CA" },
      { name: "Jet Black", hex: "#1F2421" },
      { name: "Camel Khaki", hex: "#C2B280" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-013",
    sku: "MF-013",
    name: "Wide-Leg Linen Trousers",
    slug: "wide-leg-linen-trousers",
    category: "Bottoms",
    description: "Tailored front pleat trousers in rich linen-cotton blend. Features high-waist band, belt loops, side slant pockets and clean blind-stitched hem.",
    fabric: "Linen blend",
    composition: "50% Flax Linen, 50% Organic Cotton",
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: 100,
    priceMin: 7.40,
    priceMax: 9.10,
    priceDisplay: "USD 7.40-9.10",
    leadTime: "25 days",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Natural Ecru", hex: "#E9D8A6" },
      { name: "Deep Olive", hex: "#415A77" },
      { name: "Rich Mocha", hex: "#583101" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-014",
    sku: "MF-014",
    name: "Curvy Printed Kurti",
    slug: "curvy-printed-kurti",
    category: "Plus Size",
    description: "Generously cut A-line silhouette specifically tailored for full-figured comfort. Soft flowing rayon fabric with vertical ethnic geometric motifs that elongate the frame.",
    fabric: "Rayon",
    composition: "100% Rayon 160 GSM Heavy Drape",
    sizes: ["3XL", "4XL", "5XL", "6XL"],
    moq: 80,
    priceMin: 7.60,
    priceMax: 9.20,
    priceDisplay: "USD 7.60-9.20",
    leadTime: "28 days",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733975-dd8837e3d3bd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Teal Botanical", hex: "#005F73" },
      { name: "Rust Mandala", hex: "#CA6702" },
      { name: "Navy Paisley", hex: "#14213D" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-015",
    sku: "MF-015",
    name: "Organic Cotton Lounge Set",
    slug: "organic-cotton-lounge-set",
    category: "Loungewear",
    description: "Ultra-soft GOTS-grade combed organic cotton two-piece sleepwear and home lounge set. Includes relaxed scoop tee and relaxed jogger pants with elastic cuff.",
    fabric: "Organic cotton",
    composition: "100% Certified Organic Cotton Jersey 180 GSM",
    sizes: ["S", "M", "L", "XL", "XXL"],
    moq: 150,
    priceMin: 9.30,
    priceMax: 11.00,
    priceDisplay: "USD 9.30-11.00",
    leadTime: "28 days",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Heather Fog", hex: "#CED4DA" },
      { name: "Dusty Rose", hex: "#D8A48F" },
      { name: "Sage Mist", hex: "#7A8B76" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  },
  {
    id: "mf-016",
    sku: "MF-016",
    name: "Printed Cotton Dupatta",
    slug: "printed-cotton-dupatta",
    category: "Dupattas",
    description: "Feather-light 2.4 meter full-length mulmul cotton scarf finished with handmade cotton tassels. Traditional Sanganeri screen/block print in natural mineral dyes.",
    fabric: "Cotton mulmul",
    composition: "100% Superfine Cotton Mulmul 80s Count",
    sizes: ["Free"],
    moq: 200,
    priceMin: 2.20,
    priceMax: 3.10,
    priceDisplay: "USD 2.20-3.10",
    leadTime: "15 days",
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Indigo Floral", hex: "#14213D" },
      { name: "Marigold Gold", hex: "#B8893B" },
      { name: "Crimson Jaal", hex: "#A64B2A" }
    ],
    priceTiers: [],
    isActive: true,
    isFeatured: false
  }
];

export const categoriesList = [
  "All",
  "Kurtis",
  "Dresses",
  "Co-ord Sets",
  "Ethnic Sets",
  "Tops",
  "Bottoms",
  "Plus Size",
  "Loungewear",
  "Dupattas"
];

export const fabricsList = [
  "All",
  "100% cotton",
  "Georgette",
  "Cotton slub",
  "Rayon",
  "Cotton voile",
  "Linen blend",
  "Cotton",
  "Cotton silk",
  "Chanderi blend",
  "Linen",
  "Organic cotton",
  "Cotton mulmul"
];

export const sizesList = [
  "All",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  "4XL",
  "5XL",
  "6XL",
  "Free"
];
