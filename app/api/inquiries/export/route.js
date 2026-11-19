import { NextResponse } from 'next/server';
import { getInquiries } from '../../../../lib/store';
import { checkAdminSession } from '../../../../lib/auth';

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  if (!(await checkAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const inquiries = await getInquiries();

    const headers = [
      'Inquiry Number',
      'Created Date',
      'Status',
      'Buyer Name',
      'Company Name',
      'Business Email',
      'Phone',
      'Country',
      'Buyer Type',
      'GST Number',
      'Estimated Quantity',
      'Shortlisted Items',
      'Buyer Message',
      'Internal Notes',
      'Is Demo'
    ];

    const rows = inquiries.map((inq) => {
      const itemsSummary = (inq.items || [])
        .map((it) => `${it.sku} (${it.quantity} pcs${it.colorNotes ? ` - ${it.colorNotes}` : ''})`)
        .join('; ');

      return [
        escapeCsv(inq.inquiryNumber),
        escapeCsv(new Date(inq.createdAt).toISOString()),
        escapeCsv(inq.status),
        escapeCsv(inq.fullName),
        escapeCsv(inq.companyName),
        escapeCsv(inq.businessEmail),
        escapeCsv(inq.phone),
        escapeCsv(inq.country),
        escapeCsv(inq.buyerType),
        escapeCsv(inq.gstNumber || 'N/A'),
        escapeCsv(inq.estimatedQuantity),
        escapeCsv(itemsSummary),
        escapeCsv(inq.message || ''),
        escapeCsv(inq.internalNotes || ''),
        escapeCsv(inq.isDemo ? 'DEMO' : 'LIVE')
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="myka-fashion-inquiries-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  } catch (err) {
    console.error('CSV export error:', err);
    return NextResponse.json({ error: 'Failed to export CSV.' }, { status: 500 });
  }
}
