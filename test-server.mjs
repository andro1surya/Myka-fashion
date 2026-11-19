import http from 'http';
import { spawn } from 'child_process';

const PORT = 3001;
const HOST = '127.0.0.1';

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port,
        path: u.pathname + u.search,
        method: options.method || 'GET',
        headers: options.headers || {}
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
      }
    );
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function run() {
  console.log(`Starting Next.js production server on ${HOST}:${PORT}...`);
  const serverProc = spawn(
    'node',
    ['./node_modules/next/dist/bin/next', 'start', '-p', String(PORT), '-H', HOST],
    {
      env: { ...process.env, PORT: String(PORT), HOST },
      stdio: ['ignore', 'pipe', 'pipe']
    }
  );

  serverProc.stdout.on('data', (d) => process.stdout.write(`[SERVER] ${d}`));
  serverProc.stderr.on('data', (d) => process.stderr.write(`[SERVER ERR] ${d}`));

  // Wait for server to boot
  let ready = false;
  for (let i = 0; i < 25; i++) {
    try {
      await new Promise((r) => setTimeout(r, 600));
      const res = await fetchUrl(`http://${HOST}:${PORT}/robots.txt`);
      if (res.status === 200) {
        ready = true;
        break;
      }
    } catch (e) {}
  }

  if (!ready) {
    console.error('Server failed to start within timeout');
    serverProc.kill();
    process.exit(1);
  }

  console.log('Server is responding! Running HTTP route assertions...\n');
  let failures = 0;

  async function check(desc, fn) {
    try {
      const ok = await fn();
      if (ok) console.log(`[PASS] ${desc}`);
      else {
        console.error(`[FAIL] ${desc}`);
        failures++;
      }
    } catch (err) {
      console.error(`[FAIL] ${desc} - Exception: ${err.message}`);
      failures++;
    }
  }

  // 1. Home page
  await check('Page 1: Home (/) returns 200 and renders brand headline', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/`);
    return res.status === 200 && res.body.includes('MYKA') && res.body.includes('Indian Craftsmanship');
  });

  // 2. Collections page
  await check('Page 2: Collections (/collections) returns 200 and renders catalogue or suspense shell', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/collections`);
    return res.status === 200 && (res.body.includes('Collections') || res.body.includes('Loading Collections Catalogue'));
  });

  // 3. About page
  await check('Page 3: About & Export (/about) returns 200 and covers Incoterms', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/about`);
    return res.status === 200 && res.body.includes('Incoterms') && res.body.includes('FOB');
  });

  // 4. Contact page
  await check('Page 4: Inquiry & Contact (/contact) returns 200 and renders wholesale form', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/contact`);
    return res.status === 200 && res.body.includes('Wholesale Inquiry Form');
  });

  // 5. Privacy Policy
  await check('Compliance: Privacy Policy (/privacy) returns 200', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/privacy`);
    return res.status === 200 && res.body.includes('Privacy Policy');
  });

  // 6. Admin Login
  await check('Admin Login (/admin/login) returns 200', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/admin/login`);
    return res.status === 200 && res.body.includes('Merchant Management Portal');
  });

  // 7. Sitemap.xml & Robots.txt
  await check('SEO: /sitemap.xml returns 200 with XML content', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/sitemap.xml`);
    return res.status === 200 && res.body.includes('http');
  });

  await check('SEO: /robots.txt returns 200 with Disallow: /admin', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/robots.txt`);
    return res.status === 200 && res.body.includes('Disallow: /admin');
  });

  // 8. API: Inquiries submission
  await check('API: POST /api/inquiries saves inquiry and returns unique MF-INQ number', async () => {
    const payload = JSON.stringify({
      fullName: 'Arabella Vance',
      businessEmail: 'arabella@vancecouture.co.uk',
      phone: '+44 20 7946 0991',
      companyName: 'Vance Couture London',
      country: 'United Kingdom',
      buyerType: 'Boutique',
      estimatedQuantity: 200,
      message: 'Looking for 100 pcs MF-001 and 100 pcs MF-002 for May delivery.',
      items: [
        { sku: 'MF-001', productName: 'Indigo Block Print Cotton Kurti', quantity: 100, colorNotes: 'Indigo' },
        { sku: 'MF-002', productName: 'Chikankari Embroidered Tunic', quantity: 100, colorNotes: 'Pristine White' }
      ]
    });

    const res = await fetchUrl(`http://${HOST}:${PORT}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });

    const json = JSON.parse(res.body);
    return res.status === 200 && json.success === true && json.data.inquiryNumber.startsWith('MF-INQ-');
  });

  // 9. API: Catalogue lead capture
  await check('API: POST /api/catalogue-download captures lead email', async () => {
    const payload = JSON.stringify({
      email: 'buyer@parisboutique.fr',
      companyName: 'Parisian Resale'
    });

    const res = await fetchUrl(`http://${HOST}:${PORT}/api/catalogue-download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });

    const json = JSON.parse(res.body);
    return res.status === 200 && json.success === true;
  });

  // 10. API: Admin unauthorized block
  await check('Security: GET /api/inquiries rejects unauthenticated request with 401', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/api/inquiries`);
    return res.status === 401;
  });

  // 11. API: Admin login sets session cookie
  let sessionCookie = '';
  await check('Security: POST /api/admin/login authenticates and returns session cookie', async () => {
    const payload = JSON.stringify({
      email: 'admin@mykafashion.com',
      password: 'MykaAdmin2026!'
    });

    const res = await fetchUrl(`http://${HOST}:${PORT}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });

    const cookieHeader = res.headers['set-cookie'];
    if (cookieHeader && cookieHeader.length > 0) {
      sessionCookie = cookieHeader[0].split(';')[0];
    }
    return res.status === 200 && sessionCookie.includes('myka_admin_session');
  });

  // 12. API: Authenticated admin can view inquiries & export CSV
  await check('Admin Access: GET /api/inquiries succeeds with valid session cookie', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/api/inquiries`, {
      headers: { Cookie: sessionCookie }
    });
    const json = JSON.parse(res.body);
    return res.status === 200 && Array.isArray(json.data) && json.data.length > 0;
  });

  await check('Admin Access: GET /api/inquiries/export returns CSV file attachment', async () => {
    const res = await fetchUrl(`http://${HOST}:${PORT}/api/inquiries/export`, {
      headers: { Cookie: sessionCookie }
    });
    return res.status === 200 && res.headers['content-type'].includes('text/csv') && res.body.includes('Inquiry Number');
  });

  console.log('\n----------------------------------------------------------------');
  if (failures === 0) {
    console.log('ALL HTTP SERVER ROUTE & API TESTS PASSED SUCCESSFULLY! (12/12)');
  } else {
    console.error(`${failures} HTTP tests failed.`);
  }
  console.log('----------------------------------------------------------------\n');

  serverProc.kill();
  process.exit(failures > 0 ? 1 : 0);
}

run();
