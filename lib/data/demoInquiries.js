// Demo wholesale inquiries specified in PRD
// Clearly flagged isDemo = true so they are never confused with real production inquiries.

export const initialDemoInquiries = [
  {
    id: "inq-0038",
    inquiryNumber: "MF-INQ-0038",
    fullName: "Emma Clarke",
    businessEmail: "e.clarke@willowandthread.co.uk",
    phone: "+44 7700 900123",
    companyName: "Willow and Thread",
    country: "United Kingdom",
    buyerType: "Boutique",
    gstNumber: null,
    estimatedQuantity: 600,
    message: "Export inquiry for Spring/Summer collection. Interested in private labeling with custom hang tags for UK retail distribution across 4 boutique locations.",
    attachmentUrl: null,
    status: "Quote Sent",
    isDemo: true,
    internalNotes: "Sent FOB quotation on 14th Nov. Followed up regarding label artwork approval.",
    createdAt: "2026-11-16T09:30:00Z",
    items: [
      {
        id: "item-38-1",
        sku: "MF-001",
        productName: "Indigo Block Print Cotton Kurti",
        quantity: 300,
        colorNotes: "Traditional Indigo (all sizes XS to XL split)",
        isSampleRequest: false
      },
      {
        id: "item-38-2",
        sku: "MF-006",
        productName: "Linen Co-ord Set (Top and Pant)",
        quantity: 300,
        colorNotes: "Natural Oatmeal",
        isSampleRequest: false
      }
    ]
  },
  {
    id: "inq-0039",
    inquiryNumber: "MF-INQ-0039",
    fullName: "Rajesh Mehta",
    businessEmail: "rajesh@mehtagarments.in",
    phone: "+91 98200 12345",
    companyName: "Mehta Garments",
    country: "India",
    buyerType: "Wholesaler",
    gstNumber: "08AABCM1234D1Z5",
    estimatedQuantity: 2000,
    message: "Bulk domestic wholesale order for regional store distribution. Looking for Ex-Factory or FOB dispatch within 25 days.",
    attachmentUrl: null,
    status: "Negotiation",
    isDemo: true,
    internalNotes: "Requested 4% volume rebate for 2000+ unit combined order. Awaiting owner sign-off.",
    createdAt: "2026-11-17T11:15:00Z",
    items: [
      {
        id: "item-39-1",
        sku: "MF-003",
        productName: "Straight-Fit Kurti with Pockets",
        quantity: 1000,
        colorNotes: "Terracotta and Charcoal Black (50/50 split)",
        isSampleRequest: false
      },
      {
        id: "item-39-2",
        sku: "MF-012",
        productName: "Cotton Palazzo Pants",
        quantity: 1000,
        colorNotes: "Off White and Jet Black",
        isSampleRequest: false
      }
    ]
  },
  {
    id: "inq-0040",
    inquiryNumber: "MF-INQ-0040",
    fullName: "Fatima Al-Sayed",
    businessEmail: "fatima@desertrosegulf.ae",
    phone: "+971 50 123 4567",
    companyName: "Desert Rose",
    country: "United Arab Emirates",
    buyerType: "Importer",
    gstNumber: null,
    estimatedQuantity: 1200,
    message: "Consignment for Dubai and Riyadh department stores. Seeking CIF Jebel Ali seaport quotation. Can you accommodate 2 inches added body length for modesty requirements?",
    attachmentUrl: null,
    status: "New",
    isDemo: true,
    internalNotes: "Pattern modification confirmed feasible (+USD 0.30/pc). Ready to prepare proforma quote.",
    createdAt: "2026-11-18T14:45:00Z",
    items: [
      {
        id: "item-40-1",
        sku: "MF-004",
        productName: "Floral Rayon Maxi Dress",
        quantity: 700,
        colorNotes: "Midnight Floral and Vintage Mustard",
        isSampleRequest: false
      },
      {
        id: "item-40-2",
        sku: "MF-008",
        productName: "Kurta, Pant and Dupatta Set",
        quantity: 500,
        colorNotes: "Antique Gold and Regal Emerald",
        isSampleRequest: false
      }
    ]
  },
  {
    id: "inq-0041",
    inquiryNumber: "MF-INQ-0041",
    fullName: "Claire Dubois",
    businessEmail: "c.dubois@maisonlotus.fr",
    phone: "+33 6 12 34 56 78",
    companyName: "Maison Lotus",
    country: "France",
    buyerType: "Brand",
    gstNumber: null,
    estimatedQuantity: 3,
    message: "Sample request for SS26 Paris showroom buyer review. Please dispatch 3 sample garments with full swatch cards via DHL Express to Paris.",
    attachmentUrl: null,
    status: "Sample Sent",
    isDemo: true,
    internalNotes: "Air courier DHL #48920193 dispatched 18 Nov. Tracking provided to client.",
    createdAt: "2026-11-18T16:20:00Z",
    items: [
      {
        id: "item-41-1",
        sku: "MF-005",
        productName: "Tiered Cotton Voile Midi Dress",
        quantity: 3,
        colorNotes: "Samples in Soft Sage (S), Warm Cream (M), Antique Rose (L)",
        isSampleRequest: true
      }
    ]
  },
  {
    id: "inq-0042",
    inquiryNumber: "MF-INQ-0042",
    fullName: "Priya Nair",
    businessEmail: "priya@kaayalabel.com",
    phone: "+91 99887 76655",
    companyName: "Kaaya Label",
    country: "India",
    buyerType: "Brand",
    gstNumber: "27AAECK4567F1Z8",
    estimatedQuantity: 400,
    message: "Private Label OEM consultation: Looking to develop an exclusive capsule line of block-printed festive tunics with custom brand woven neck labels.",
    attachmentUrl: null,
    status: "Contacted",
    isDemo: true,
    internalNotes: "Introductory phone call scheduled for tomorrow 3 PM to review custom block printing lead times.",
    createdAt: "2026-11-19T06:00:00Z",
    items: [
      {
        id: "item-42-1",
        sku: "MF-001",
        productName: "Indigo Block Print Cotton Kurti",
        quantity: 200,
        colorNotes: "Custom Madder Rust print variation",
        isSampleRequest: false
      },
      {
        id: "item-42-2",
        sku: "MF-002",
        productName: "Chikankari Embroidered Tunic",
        quantity: 200,
        colorNotes: "Pristine White with custom neck label",
        isSampleRequest: false
      }
    ]
  }
];
