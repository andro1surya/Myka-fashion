import { NextResponse } from 'next/server';
import { authenticateAdmin, AUTH_COOKIE_NAME } from '../../../../lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const token = authenticateAdmin(email, password);

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid admin credentials. Please verify your email and password.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true, message: 'Admin authenticated successfully.' });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json({ error: 'Server authentication error.' }, { status: 500 });
  }
}
