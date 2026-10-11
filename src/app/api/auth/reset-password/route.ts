import { NextResponse } from 'next/server';
import { getResetToken, consumeResetToken, updateUserPassword } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password, confirmPassword } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'A valid password reset token is required.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters in length.' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    // 1. Validate token record
    const resetRecord = await getResetToken(token);
    if (!resetRecord) {
      return NextResponse.json(
        { error: 'This reset link is invalid or has expired. Please request a new link.' },
        { status: 400 }
      );
    }

    if (resetRecord.used) {
      return NextResponse.json(
        { error: 'This reset link has already been used. Please request a new link.' },
        { status: 400 }
      );
    }

    if (Date.now() > resetRecord.expiresAt) {
      return NextResponse.json(
        { error: 'This reset link has expired. Reset links are valid for 1 hour.' },
        { status: 400 }
      );
    }

    // 2. Consume single-use token atomically
    const consumed = await consumeResetToken(token);
    if (!consumed) {
      return NextResponse.json(
        { error: 'Could not process token. It may have already been used or expired.' },
        { status: 400 }
      );
    }

    // 3. Hash and update password
    const newHash = await hashPassword(password);
    const updated = await updateUserPassword(resetRecord.userId, newHash);

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update account password. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your password has been reset successfully. You can now log in with your new credentials.',
    });
  } catch (err) {
    console.error('Password reset error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while resetting your password. Please try again.' },
      { status: 500 }
    );
  }
}
