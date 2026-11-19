import * as jsPDFPkg from 'jspdf';
import { initialProducts } from './data/products.js';

const jsPDF = jsPDFPkg.jsPDF || jsPDFPkg.default || jsPDFPkg;

/**
 * Generate a luxury B2B Wholesale Catalogue PDF
 */
export function generateWholesaleCataloguePdf(products = initialProducts) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper colors
  const navy = [20, 33, 61];     // #14213D
  const gold = [184, 137, 59];   // #B8893B
  const ivory = [244, 239, 230]; // #F4EFE6
  const charcoal = [43, 43, 43]; // #2B2B2B
  const gray = [100, 100, 100];

  // ----------------------------------------------------
  // COVER PAGE (Page 1)
  // ----------------------------------------------------
  // Navy background
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative gold double border
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.6);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);
  doc.setLineWidth(0.2);
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

  // Brand Name
  doc.setTextColor(...ivory);
  doc.setFont('times', 'bold');
  doc.setFontSize(36);
  doc.text('MYKA FASHION', pageWidth / 2, 85, { align: 'center' });

  // Gold rule
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.8);
  doc.line(pageWidth / 2 - 35, 95, pageWidth / 2 + 35, 95);

  // Subtitle
  doc.setTextColor(...gold);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('PREMIUM B2B WHOLESALE & EXPORT LOOKBOOK', pageWidth / 2, 105, { align: 'center' });

  // Season & Edition
  doc.setTextColor(220, 220, 220);
  doc.setFontSize(10);
  doc.text('SPRING / SUMMER COLLECTION • GLOBAL EXPORT EDITION', pageWidth / 2, 114, { align: 'center' });

  // Value Proposition Box
  doc.setFillColor(30, 48, 86);
  doc.rect(25, 145, pageWidth - 50, 65, 'F');
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.rect(25, 145, pageWidth - 50, 65);

  doc.setTextColor(...gold);
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.text('EXPORT ADVANTAGES & CAPABILITIES', pageWidth / 2, 160, { align: 'center' });

  doc.setTextColor(240, 240, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text('• Low MOQ Starting from 50 - 100 Pieces per Style', 35, 172);
  doc.text('• Pure Natural Fabrics: Cambric Cotton, French Flax Linen, Mulmul, Georgette', 35, 180);
  doc.text('• Heritage Hand-Block Printing (Bagru/Sanganer) & Lucknow Chikankari', 35, 188);
  doc.text('• Full OEM / Private Label Services (Custom Woven Labels, Tags, Packaging)', 35, 196);
  doc.text('• Global Seaport/Airport Dispatch (Ex-Works, FOB Nhava Sheva/Mundra, CIF)', 35, 204);

  // Footer notes on cover
  doc.setFontSize(8.5);
  doc.setTextColor(170, 185, 205);
  doc.text('INQUIRY-BASED WHOLESALE CATALOGUE • CONFIDENTIAL TRADE SPECIFICATIONS', pageWidth / 2, 255, { align: 'center' });
  doc.text('Email: wholesale@mykafashion.com  •  Website: https://mykafashion.com', pageWidth / 2, 262, { align: 'center' });

  // ----------------------------------------------------
  // CATALOGUE PAGES (Products in structured tables)
  // ----------------------------------------------------
  const activeProducts = products.filter(p => p.isActive !== false);

  let currentPage = 2;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(activeProducts.length / itemsPerPage) + 1; // +1 for cover

  for (let i = 0; i < activeProducts.length; i += itemsPerPage) {
    doc.addPage();
    const batch = activeProducts.slice(i, i + itemsPerPage);

    // Header strip
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageWidth, 24, 'F');

    doc.setTextColor(...ivory);
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.text('MYKA FASHION', 14, 15);

    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('WHOLESALE GARMENT CATALOGUE', pageWidth - 14, 15, { align: 'right' });

    // Gold divider
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.5);
    doc.line(14, 25, pageWidth - 14, 25);

    let startY = 32;

    batch.forEach((prod, idx) => {
      // Product container box
      doc.setFillColor(250, 248, 244);
      doc.rect(14, startY, pageWidth - 28, 56, 'F');
      doc.setDrawColor(225, 218, 206);
      doc.setLineWidth(0.3);
      doc.rect(14, startY, pageWidth - 28, 56);

      // SKU pill
      doc.setFillColor(...navy);
      doc.rect(18, startY + 5, 26, 6, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(prod.sku, 31, startY + 9.5, { align: 'center' });

      // Product Name
      doc.setTextColor(...charcoal);
      doc.setFont('times', 'bold');
      doc.setFontSize(12);
      doc.text(prod.name, 48, startY + 10);

      // Category badge
      doc.setTextColor(...gold);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(prod.category.toUpperCase(), pageWidth - 20, startY + 10, { align: 'right' });

      // Specifications Grid
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);

      // Col 1
      doc.setTextColor(...gray);
      doc.text('Fabric:', 18, startY + 20);
      doc.setTextColor(...charcoal);
      doc.text(prod.fabric, 38, startY + 20);

      doc.setTextColor(...gray);
      doc.text('Sizes:', 18, startY + 27);
      doc.setTextColor(...charcoal);
      doc.text(prod.sizes ? prod.sizes.join(', ') : 'Free Size', 38, startY + 27);

      doc.setTextColor(...gray);
      doc.text('MOQ:', 18, startY + 34);
      doc.setTextColor(...charcoal);
      doc.text(`${prod.moq} pieces`, 38, startY + 34);

      // Col 2
      doc.setTextColor(...gray);
      doc.text('Lead Time:', 95, startY + 20);
      doc.setTextColor(...charcoal);
      doc.text(prod.leadTime || '25-30 days', 115, startY + 20);

      doc.setTextColor(...gray);
      doc.text('Indicative FOB:', 95, startY + 27);
      doc.setTextColor(...gold);
      doc.setFont('helvetica', 'bold');
      doc.text(prod.priceDisplay || 'Price on Request', 122, startY + 27);
      doc.setFont('helvetica', 'normal');

      // Description
      doc.setTextColor(...charcoal);
      doc.setFontSize(8);
      const descLines = doc.splitTextToSize(prod.description || '', pageWidth - 40);
      doc.text(descLines.slice(0, 2), 18, startY + 43);

      startY += 62;
    });

    // Page footer
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.3);
    doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

    doc.setTextColor(...gray);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('MYKA FASHION • B2B Wholesale Inquiry Desk • inquiries@mykafashion.com', 14, pageHeight - 9);
    doc.text(`Page ${currentPage} of ${totalPages}`, pageWidth - 14, pageHeight - 9, { align: 'right' });

    currentPage++;
  }

  // Final Terms & Invoicing Page
  doc.addPage();
  // Header strip
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setTextColor(...ivory);
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.text('MYKA FASHION', 14, 15);
  doc.setTextColor(...gold);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('EXPORT WORKFLOW & COMMERCIAL TERMS', pageWidth - 14, 15, { align: 'right' });

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.5);
  doc.line(14, 25, pageWidth - 14, 25);

  doc.setTextColor(...navy);
  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.text('How to Place a Wholesale / Export Order', 14, 38);

  const steps = [
    { title: 'Step 1: Style Selection & Shortlist', text: 'Select desired SKUs, enter target quantities and color requirements via https://mykafashion.com or email wholesale@mykafashion.com.' },
    { title: 'Step 2: Proforma Quote & Sample Dispatch', text: 'We prepare an indicative FOB/CIF proforma quote. Physical showroom samples and fabric swatches can be dispatched via DHL/FedEx.' },
    { title: 'Step 3: Private Label & Tech Pack Approval', text: 'Buyers submit label artwork, care tags, and custom packaging specs. Pre-production sample (PPS) is confirmed before bulk cutting.' },
    { title: 'Step 4: Bulk Production & Stringent AQL 2.5 QC', text: 'Production takes 20-35 days depending on fabric weaving and artisanal embroidery. Full inline and end-of-line quality inspection.' },
    { title: 'Step 5: Export Dispatch & Documentation', text: 'Customs clearance, Certificate of Origin, Bill of Lading / Airway Bill provided for seamless import clearance in UK, EU, UAE, USA & Australia.' }
  ];

  let stepY = 48;
  steps.forEach((s, idx) => {
    doc.setFillColor(...navy);
    doc.circle(20, stepY + 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(String(idx + 1), 20, stepY + 4.5, { align: 'center' });

    doc.setTextColor(...charcoal);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(s.title, 26, stepY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    const lines = doc.splitTextToSize(s.text, pageWidth - 42);
    doc.text(lines, 26, stepY + 9);

    stepY += 21;
  });

  // Incoterms Box
  doc.setFillColor(...ivory);
  doc.rect(14, stepY + 5, pageWidth - 28, 48, 'F');
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.rect(14, stepY + 5, pageWidth - 28, 48);

  doc.setTextColor(...navy);
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text('Standard Commercial Incoterms Offered', 20, stepY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...charcoal);
  doc.text('• FOB (Free On Board): Goods cleared for export and delivered to Indian port (Nhava Sheva / Mundra / Delhi Air).', 20, stepY + 23);
  doc.text('• CIF (Cost, Insurance & Freight): Ocean or air shipping and insurance covered up to destination port.', 20, stepY + 31);
  doc.text('• EXW (Ex-Works): Dispatch directly from manufacturing warehouse in India for buyer-nominated freight forwarders.', 20, stepY + 39);
  doc.text('• Payment Terms: Standard B2B wire transfer (T/T) 40% advance, balance against Bill of Lading inspection.', 20, stepY + 47);

  // Footer
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);
  doc.setTextColor(...gray);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('MYKA FASHION • B2B Wholesale Inquiry Desk • inquiries@mykafashion.com', 14, pageHeight - 9);
  doc.text(`Page ${totalPages} of ${totalPages}`, pageWidth - 14, pageHeight - 9, { align: 'right' });

  // Return generated blob or trigger download
  return doc;
}
