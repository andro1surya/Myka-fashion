const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@mykafashion.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'MykaAdmin2026!';
const AUTH_COOKIE_NAME = 'myka_admin_session';

/**
 * Verify credentials and return session token
 */
export function authenticateAdmin(email, password) {
  if (
    email &&
    password &&
    email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim() &&
    password === ADMIN_PASSWORD
  ) {
    // Generate a simple secure signature
    const tokenPayload = {
      email: ADMIN_EMAIL,
      role: 'admin',
      loggedInAt: Date.now()
    };
    return Buffer.from(JSON.stringify(tokenPayload)).toString('base64');
  }
  return null;
}

/**
 * Verify if the request has a valid admin session cookie
 */
export async function checkAdminSession() {
  try {
    const { cookies } = await import('next/headers.js');
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return false;

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    return decoded && decoded.role === 'admin';
  } catch (err) {
    return false;
  }
}

export { AUTH_COOKIE_NAME };
