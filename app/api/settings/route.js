import { NextResponse } from 'next/server';
import { getSettings, updateSettings, getDashboardStats } from '../../../lib/store';
import { checkAdminSession } from '../../../lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const includeStats = searchParams.get('stats') === 'true';

  try {
    const settings = await getSettings();

    if (includeStats) {
      if (!(await checkAdminSession())) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
      }
      const stats = await getDashboardStats();
      return NextResponse.json({ success: true, settings, stats });
    }

    return NextResponse.json({ success: true, settings });
  } catch (err) {
    console.error('Settings error:', err);
    return NextResponse.json({ error: 'Failed to retrieve settings.' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await checkAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const newSettings = await request.json();
    const updated = await updateSettings(newSettings);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    console.error('Settings update error:', err);
    return NextResponse.json({ error: 'Failed to update settings.' }, { status: 500 });
  }
}
