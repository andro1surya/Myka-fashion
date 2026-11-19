import { NextResponse } from 'next/server';
import { createInquiry, getInquiries } from '../../../lib/store';
import { sendBuyerConfirmation, sendSalesNotification } from '../../../lib/email';
import { checkAdminSession } from '../../../lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validation
    const { fullName, businessEmail, phone, companyName, country, buyerType, gstNumber } = body;

    if (!fullName || !businessEmail || !phone || !companyName || !country || !buyerType) {
      return NextResponse.json(
        { error: 'Please provide all mandatory fields (Name, Business Email, Phone, Company, Country, and Buyer Type).' },
        { status: 400 }
      );
    }

    if (country === 'India' && !gstNumber) {
      return NextResponse.json(
        { error: 'GSTIN number is required for Indian wholesale trade transactions.' },
        { status: 400 }
      );
    }

    // Save inquiry to database / resilient store
    const inquiry = await createInquiry(body, body.items || []);

    // Transactional emails (buyer acknowledgment + sales notification)
    try {
      await Promise.all([
        sendBuyerConfirmation(inquiry),
        sendSalesNotification(inquiry)
      ]);
    } catch (emailErr) {
      console.warn('Email dispatch warning (logged for administrator):', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully.',
      data: inquiry
    });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    return NextResponse.json(
      { error: 'Internal server error while processing your inquiry.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  // Protect inquiry list from public access as required by RLS / core rules
  if (!(await checkAdminSession())) {
    return NextResponse.json(
      { error: 'Unauthorized access. Admin credentials required to view inquiries.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || undefined;
  const country = searchParams.get('country') || undefined;
  const search = searchParams.get('search') || undefined;

  try {
    const data = await getInquiries({ status, country, search });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    return NextResponse.json({ error: 'Failed to retrieve inquiries.' }, { status: 500 });
  }
}
