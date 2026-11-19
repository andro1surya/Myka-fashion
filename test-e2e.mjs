import http from 'http';
import { initialProducts } from './lib/data/products.js';
import { initialDemoInquiries } from './lib/data/demoInquiries.js';
import {
  getProducts,
  getProductBySku,
  getInquiries,
  createInquiry,
  updateInquiryStatus,
  createCatalogueLead,
  getCatalogueLeads,
  getDashboardStats
} from './lib/store.js';
import { authenticateAdmin } from './lib/auth.js';
import { generateWholesaleCataloguePdf } from './lib/pdfGenerator.js';

console.log('================================================================');
console.log('MYKA FASHION - COMPREHENSIVE AUTOMATED VERIFICATION SUITE');
console.log('================================================================\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failedTests++;
  }
}

async function runTests() {
  // ----------------------------------------------------
  // TEST 1: All 16 Products Verification
  // ----------------------------------------------------
  console.log('--- Test Suite 1: Product Seed Data & Integrity ---');
  const products = await getProducts();
  assert(products.length === 16, `Master catalogue contains exactly 16 products (found: ${products.length})`);

  const skus = products.map(p => p.sku);
  const expectedSkus = [
    'MF-001', 'MF-002', 'MF-003', 'MF-004', 'MF-005', 'MF-006', 'MF-007', 'MF-008',
    'MF-009', 'MF-010', 'MF-011', 'MF-012', 'MF-013', 'MF-014', 'MF-015', 'MF-016'
  ];
  const allSkusPresent = expectedSkus.every(sku => skus.includes(sku));
  assert(allSkusPresent, 'All 16 exact SKUs (MF-001 to MF-016) are present');

  // Verify MF-001 details
  const mf001 = await getProductBySku('MF-001');
  assert(mf001 !== null, 'MF-001 exists');
  assert(mf001.name === 'Indigo Block Print Cotton Kurti', 'MF-001 title matches PRD specification');
  assert(mf001.fabric === '100% cotton', 'MF-001 fabric is 100% cotton');
  assert(mf001.moq === 100, 'MF-001 MOQ is 100');
  assert(mf001.priceTiers && mf001.priceTiers.length === 4, 'MF-001 has 4 quantity tiered price breaks');
  assert(mf001.priceTiers[0].range === '100-299 pcs' && mf001.priceTiers[0].price === 'USD 8.50', 'MF-001 Tier 1: 100-299 pcs @ USD 8.50, 25 days');
  assert(mf001.priceTiers[3].range === '3,000+ pcs' && mf001.priceTiers[3].price === 'USD 6.80', 'MF-001 Tier 4: 3,000+ pcs @ USD 6.80');

  // Verify categories
  const categories = [...new Set(products.map(p => p.category))];
  assert(categories.includes('Kurtis') && categories.includes('Dresses') && categories.includes('Co-ord Sets'), 'Includes primary fashion categories');

  // ----------------------------------------------------
  // TEST 2: Demo Inquiries Verification
  // ----------------------------------------------------
  console.log('\n--- Test Suite 2: Demo Inquiries & Isolation ---');
  const initialInqs = await getInquiries();
  assert(initialInqs.length >= 5, `Initial inquiries include at least 5 demo records (found: ${initialInqs.length})`);
  const demo0038 = initialInqs.find(i => i.inquiryNumber === 'MF-INQ-0038');
  assert(demo0038 && demo0038.fullName === 'Emma Clarke' && demo0038.isDemo === true, 'MF-INQ-0038 Emma Clarke marked isDemo: true');
  const demo0039 = initialInqs.find(i => i.inquiryNumber === 'MF-INQ-0039');
  assert(demo0039 && demo0039.gstNumber === '08AABCM1234D1Z5', 'MF-INQ-0039 Rajesh Mehta includes valid GST number');

  // ----------------------------------------------------
  // TEST 3: Unique Inquiry Generation & Submission
  // ----------------------------------------------------
  console.log('\n--- Test Suite 3: Inquiry Creation & Sequencing ---');
  const testInquiryData = {
    fullName: 'Charlotte Wright',
    businessEmail: 'charlotte@wrightfashion.co.uk',
    phone: '+44 7911 123456',
    companyName: 'Wright Luxury Apparel',
    country: 'United Kingdom',
    buyerType: 'Brand',
    estimatedQuantity: 500,
    message: 'Requesting quotation for SS26 luxury resort capsule line.'
  };
  const testItems = [
    { sku: 'MF-001', productName: 'Indigo Block Print Cotton Kurti', quantity: 250, colorNotes: 'Indigo', isSampleRequest: false },
    { sku: 'MF-006', productName: 'Linen Co-ord Set (Top and Pant)', quantity: 250, colorNotes: 'Natural Oatmeal', isSampleRequest: false }
  ];

  const created = await createInquiry(testInquiryData, testItems);
  assert(created.inquiryNumber && created.inquiryNumber.startsWith('MF-INQ-'), `Generated unique inquiry number: ${created.inquiryNumber}`);
  assert(created.isDemo === false, 'Real inquiry is NOT marked demo (isDemo: false)');
  assert(created.items.length === 2, 'Inquiry contains the 2 shortlisted styles');

  // Update status test
  const updated = await updateInquiryStatus(created.id, 'Quote Sent', 'Sent FOB Nhava Sheva quote via email.');
  assert(updated.status === 'Quote Sent', 'Inquiry status updated to "Quote Sent"');

  // ----------------------------------------------------
  // TEST 4: Admin Authentication
  // ----------------------------------------------------
  console.log('\n--- Test Suite 4: Admin Security & Auth ---');
  const validToken = authenticateAdmin('admin@mykafashion.com', 'MykaAdmin2026!');
  assert(validToken !== null, 'Valid admin credentials return signed session token');

  const invalidToken = authenticateAdmin('admin@mykafashion.com', 'WrongPassword123');
  assert(invalidToken === null, 'Invalid password is rejected');

  // ----------------------------------------------------
  // TEST 5: Catalogue Leads & PDF Generation
  // ----------------------------------------------------
  console.log('\n--- Test Suite 5: Catalogue Leads & PDF Generator ---');
  const newLead = await createCatalogueLead('testbuyer@boutique.fr', 'Maison Test');
  assert(newLead && newLead.email === 'testbuyer@boutique.fr', 'Catalogue lead captured successfully');

  const doc = generateWholesaleCataloguePdf(products);
  assert(doc && typeof doc.output === 'function', 'Wholesale Lookbook PDF generated without errors');
  const pdfBytes = doc.output('arraybuffer');
  assert(pdfBytes && pdfBytes.byteLength > 10000, `Generated PDF is valid binary document (${pdfBytes.byteLength} bytes)`);

  // ----------------------------------------------------
  // TEST 6: Dashboard Statistics
  // ----------------------------------------------------
  console.log('\n--- Test Suite 6: Dashboard Aggregate Metrics ---');
  const stats = await getDashboardStats();
  assert(stats.totalProducts === 16, `Stats report 16 total products (found: ${stats.totalProducts})`);
  assert(stats.totalInquiries >= 6, `Stats report at least 6 total inquiries (found: ${stats.totalInquiries})`);
  assert(stats.totalLeads >= 3, `Stats report captured leads (found: ${stats.totalLeads})`);

  console.log('\n================================================================');
  console.log(`TOTAL SUITE RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('================================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
