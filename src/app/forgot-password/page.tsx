'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertCircle, CheckCircle2, Mail, Info } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);
  const [smtpConfigured, setSmtpConfigured] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to process request. Please try again.');
        setLoading(false);
        return;
      }

      setSubmitted(true);
      if (data.devResetUrl) {
        setDevResetUrl(data.devResetUrl);
      }
      setSmtpConfigured(Boolean(data.smtpConfigured));
      setLoading(false);
    } catch (err) {
      console.error('Forgot password submit error:', err);
      setErrorMessage('Unable to connect to the authentication service. Please check your connection.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nb-yellow bg-dot-pattern flex flex-col justify-center items-center p-4 sm:p-6 antialiased selection:bg-black selection:text-nb-yellow">
      <div className="w-full max-w-md bg-white border-2 border-black p-7 sm:p-9 shadow-hard-lg relative">
        {/* Top Header Logo */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-black mb-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <span className="font-cabinet font-black text-lg text-nb-yellow leading-none">N</span>
            </div>
            <span className="font-cabinet font-black text-lg tracking-tight text-nb-charcoal uppercase">
              NEXORA
            </span>
          </Link>
        </div>

        {/* Headings */}
        <div className="mb-6">
          <h1 className="font-cabinet font-black text-2xl sm:text-3xl text-nb-charcoal uppercase tracking-tight leading-tight">
            Reset password.
          </h1>
          <p className="font-satoshi text-xs sm:text-sm text-neutral-600 mt-1 font-medium leading-relaxed">
            Enter your account email and we&apos;ll send you instructions to set a new password.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-red-50 border-2 border-black shadow-[3px_3px_0px_#000000] flex items-start gap-2.5 text-xs text-red-900 font-medium">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="leading-snug">{errorMessage}</div>
          </div>
        )}

        {submitted ? (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 border-2 border-black shadow-[3px_3px_0px_#000000] flex items-start gap-3 text-xs text-emerald-950 font-medium leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-cabinet font-bold uppercase tracking-wider text-black mb-1">
                  Request Received
                </strong>
                If an account exists with that email address, password reset instructions have been generated.
              </div>
            </div>

            {/* Development / Environment telemetry */}
            {!smtpConfigured && devResetUrl && (
              <div className="p-4 bg-nb-yellow/30 border-2 border-black shadow-[3px_3px_0px_#000000] text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-cabinet font-black uppercase text-black">
                  <Info className="w-4 h-4 text-black" />
                  <span>Development Mode Notification</span>
                </div>
                <p className="font-satoshi text-neutral-800 leading-normal">
                  Outbound SMTP email is not configured in this environment. For immediate testing, you can proceed directly using the generated single-use token:
                </p>
                <div className="pt-2">
                  <Link
                    href={devResetUrl}
                    className="nb-btn inline-flex items-center gap-1.5 bg-black text-nb-yellow px-3.5 py-2 border-2 border-black font-cabinet font-black text-xs uppercase tracking-wider shadow-hard"
                  >
                    Open Reset Password Form &rarr;
                  </Link>
                </div>
              </div>
            )}

            <div className="pt-3">
              <Link
                href="/login"
                className="nb-btn w-full bg-white text-black py-3 border-2 border-black font-cabinet font-black text-xs uppercase tracking-wider shadow-hard hover:bg-neutral-100 flex items-center justify-center gap-2"
              >
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block font-cabinet font-bold text-xs uppercase tracking-wider text-nb-charcoal mb-1.5"
              >
                Account Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-neutral-50 border-2 border-black pl-9 pr-3.5 py-2.5 text-sm text-nb-charcoal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-60"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="nb-btn w-full bg-black text-white py-3.5 border-2 border-black font-cabinet font-black text-sm uppercase tracking-wider shadow-hard hover:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4 text-nb-yellow" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Footer Link */}
        <div className="mt-6 pt-5 border-t-2 border-black text-center">
          <p className="font-satoshi text-xs text-neutral-600 font-medium">
            Remember your credentials?{' '}
            <Link
              href="/login"
              className="font-bold text-black underline underline-offset-2 hover:text-neutral-800"
            >
              Back to log in
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-neutral-700 font-medium font-satoshi">
        <Link href="/" className="hover:underline">
          &larr; Back to NEXORA Homepage
        </Link>
      </div>
    </div>
  );
}
