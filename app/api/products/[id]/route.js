import { NextResponse } from 'next/server';
import { updateProduct, deleteProduct } from '../../../../lib/store';
import { checkAdminSession } from '../../../../lib/auth';

export async function PATCH(request, { params }) {
  if (!(await checkAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const updates = await request.json();
    const updated = await updateProduct(id, updates);

    if (!updated) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error('Product update error:', err);
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await checkAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { id } = params;
    await deleteProduct(id);
    return NextResponse.json({ success: true, message: 'Product deleted.' });
  } catch (err) {
    console.error('Product delete error:', err);
    return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
  }
}
