import { NextResponse } from 'next/server';
import { getProducts, createProduct } from '../../../lib/store';
import { checkAdminSession } from '../../../lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const adminMode = searchParams.get('all') === 'true';

  // If not admin, only show active products
  const isAdmin = await checkAdminSession();
  const activeOnly = !(adminMode && isAdmin);

  try {
    const products = await getProducts({ category, search, activeOnly });
    return NextResponse.json({ success: true, data: products });
  } catch (err) {
    console.error('Products fetch error:', err);
    return NextResponse.json({ error: 'Failed to retrieve products.' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await checkAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.sku || !body.name || !body.category || !body.fabric) {
      return NextResponse.json(
        { error: 'SKU, Name, Category, and Fabric are required fields.' },
        { status: 400 }
      );
    }

    const created = await createProduct(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    console.error('Product creation error:', err);
    return NextResponse.json({ error: 'Failed to create product.' }, { status: 500 });
  }
}
