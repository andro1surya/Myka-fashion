import { NextResponse } from 'next/server';
import { createCatalogueLead, getCatalogueLeads } from '../../../lib/store';
import { checkAdminSession } from '../../../lib/auth';

export async function POST(request) {
  try {
    const { email, companyName } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid business email is required.' }, { status: 400 });
    }

    const lead = await createCatalogueLead(email, companyName || '');
    return NextResponse.json({ success: true, data: lead });
  } catch (err) {
    console.error('Catalogue lead capture error:', err);
    return NextResponse.json({ error: 'Failed to record lead.' }, { status: 500 });
  }
}

export async function GET() {
  if (!(await checkAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const leads = await getCatalogueLeads();
    return NextResponse.json({ success: true, data: leads });
  } catch (err) {
    console.error('Leads fetch error:', err);
    return NextResponse.json({ error: 'Failed to retrieve leads.' }, { status: 500 });
  }
}
