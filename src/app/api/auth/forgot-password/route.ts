import { NextResponse } from 'next/server';
import { getUserByEmail, createResetToken, normalizeEmail } from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const normalized = normalizeEmail(email);
    const user = await getUserByEmail(normalized);

    let devResetUrl: string | undefined = undefined;

    if (user) {
      const resetRecord = await createResetToken(user.id, user.email);

      // Check if SMTP configuration exists
      const isSmtpConfigured = Boolean(
        process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
      );

      if (!isSmtpConfigured) {
        // In local development/preview without configured SMTP, surface the secure reset URL
        // for testing convenience and display a note regarding SMTP configuration.
        devResetUrl = `/reset-password?token=${resetRecord.token}`;
        console.log(`\n[NEXORA AUTH] Password reset token generated for ${user.email}`);
        console.log(`[NEXORA AUTH] Reset link: ${devResetUrl}\n`);
      } else {
        // If SMTP is configured in the environment, email would be dispatched here
        console.log(`[NEXORA AUTH] SMTP dispatch configured for ${user.email}`);
      }
    }

    // Generic response to prevent account enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists with that email address, password reset instructions have been sent.',
      devResetUrl: process.env.NODE_ENV !== 'production' ? devResetUrl : undefined,
      smtpConfigured: Boolean(process.env.SMTP_HOST),
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
