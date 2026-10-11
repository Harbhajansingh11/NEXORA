import { NextResponse } from 'next/server';
import { getUserByEmail, normalizeEmail } from '@/lib/db';
import { verifyPassword, createSessionToken, getSessionCookieOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, rememberMe } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalized = normalizeEmail(email);
    const user = await getUserByEmail(normalized);

    // Generic error to prevent account enumeration
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isRememberMe = Boolean(rememberMe);
    const token = await createSessionToken(
      { id: user.id, email: user.email, name: user.name },
      isRememberMe
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    const cookieOpts = getSessionCookieOptions(isRememberMe);
    response.cookies.set(cookieOpts.name, token, cookieOpts);

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
