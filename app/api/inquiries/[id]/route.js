import { NextResponse } from 'next/server';
import { updateInquiryStatus, deleteInquiry } from '../../../../lib/store';
import { checkAdminSession } from '../../../../lib/auth';

export async function PATCH(request, { params }) {
  if (!(await checkAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const { status, internalNotes } = body;

    const updated = await updateInquiryStatus(id, status, internalNotes);
    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error('Inquiry update error:', err);
    return NextResponse.json({ error: 'Failed to update inquiry.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await checkAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { id } = params;
    await deleteInquiry(id);
    return NextResponse.json({ success: true, message: 'Inquiry deleted.' });
  } catch (err) {
    console.error('Inquiry delete error:', err);
    return NextResponse.json({ error: 'Failed to delete inquiry.' }, { status: 500 });
  }
}
