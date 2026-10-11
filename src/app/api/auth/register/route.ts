import { NextResponse } from 'next/server';
import { getUserByEmail, createUser, normalizeEmail } from '@/lib/db';
import { hashPassword, createSessionToken, getSessionCookieOptions } from '@/lib/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword } = body;

    // 1. Input presence validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid full name (at least 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters in length.' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    const normalized = normalizeEmail(email);

    // 2. Check for duplicate account safely
    const existing = await getUserByEmail(normalized);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists. Please log in.' },
        { status: 409 }
      );
    }

    // 3. Hash password with bcrypt
    const passwordHash = await hashPassword(password);

    // 4. Persist user in database
    const user = await createUser(name.trim(), normalized, passwordHash);

    // 5. Create secure session token
    const token = await createSessionToken(
      { id: user.id, email: user.email, name: user.name },
      false
    );

    // 6. Set secure HTTP-only cookie
    const response = NextResponse.json(
      {
        success: true,
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 }
    );

    const cookieOpts = getSessionCookieOptions(false);
    response.cookies.set(cookieOpts.name, token, cookieOpts);

    return response;
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred during account creation. Please try again.' },
      { status: 500 }
    );
  }
}
