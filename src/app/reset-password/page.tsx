'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, AlertCircle, Check, Lock, RefreshCw } from 'lucide-react';

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { label: 'Weak', color: 'bg-red-500', width: '25%' };
  if (score <= 3) return { label: 'Moderate', color: 'bg-nb-yellow', width: '60%' };
  return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorMessage(null);

    if (!token) {
      setErrorMessage('Missing password reset token. Please request a new reset link.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to update password. Your reset link may have expired.');
        setLoading(false);
        return;
      }

      // Successful password reset: redirect to login with query flag
      router.push('/login?reset=success');
    } catch (err) {
      console.error('Reset password submit error:', err);
      setErrorMessage('Unable to connect to the authentication service. Please check your connection.');
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full max-w-md bg-white border-2 border-black p-7 sm:p-9 shadow-hard-lg relative">
        <div className="flex items-center gap-2.5 pb-6 border-b-2 border-black mb-6">
          <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
            <span className="font-cabinet font-black text-lg text-nb-yellow leading-none">N</span>
          </div>
          <span className="font-cabinet font-black text-lg tracking-tight text-nb-charcoal uppercase">
            NEXORA
          </span>
        </div>

        <div className="p-4 bg-red-50 border-2 border-black shadow-[3px_3px_0px_#000000] text-xs text-red-900 mb-6">
          <div className="font-cabinet font-black uppercase text-black mb-1">
            Missing Security Token
          </div>
          No reset token was detected in your URL. Reset links must be accessed directly from your password recovery instructions.
        </div>

        <Link
          href="/forgot-password"
          className="nb-btn w-full bg-black text-white py-3.5 border-2 border-black font-cabinet font-black text-xs uppercase tracking-wider shadow-hard flex items-center justify-center gap-2"
        >
          Request New Reset Link &rarr;
        </Link>
      </div>
    );
  }

  return (
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
          Create new password.
        </h1>
        <p className="font-satoshi text-xs sm:text-sm text-neutral-600 mt-1 font-medium leading-relaxed">
          Please enter and confirm your new secure password.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-5 p-3.5 bg-red-50 border-2 border-black shadow-[3px_3px_0px_#000000] flex items-start gap-2.5 text-xs text-red-900 font-medium">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="leading-snug">{errorMessage}</div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block font-cabinet font-bold text-xs uppercase tracking-wider text-nb-charcoal mb-1.5"
          >
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 chars"
              className="w-full bg-neutral-50 border-2 border-black pl-9 pr-9 py-2.5 text-sm text-nb-charcoal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-500 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-cabinet font-bold text-xs uppercase tracking-wider text-nb-charcoal mb-1.5"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              disabled={loading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              className="w-full bg-neutral-50 border-2 border-black pl-9 pr-9 py-2.5 text-sm text-nb-charcoal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-500 hover:text-black transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Strength Indicator */}
        {password.length > 0 && (
          <div className="p-3 bg-neutral-50 border-2 border-black/30">
            <div className="flex items-center justify-between text-[11px] font-cabinet font-bold uppercase mb-1.5">
              <span className="text-neutral-600">Password Strength:</span>
              <span className="text-black font-black">{strength.label}</span>
            </div>
            <div className="w-full h-2 bg-neutral-200 border border-black overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-200`}
                style={{ width: strength.width }}
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-2 text-[11px] text-neutral-600">
              <div className={`flex items-center gap-1 ${password.length >= 8 ? 'text-black font-bold' : ''}`}>
                <Check className={`w-3 h-3 ${password.length >= 8 ? 'text-green-600 stroke-[3]' : 'text-neutral-400'}`} />
                <span>8+ characters</span>
              </div>
              <div className={`flex items-center gap-1 ${/[0-9]/.test(password) ? 'text-black font-bold' : ''}`}>
                <Check className={`w-3 h-3 ${/[0-9]/.test(password) ? 'text-green-600 stroke-[3]' : 'text-neutral-400'}`} />
                <span>Includes number</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="nb-btn w-full bg-black text-white py-3.5 border-2 border-black font-cabinet font-black text-sm uppercase tracking-wider shadow-hard hover:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Updating Password...
              </span>
            ) : (
              <>
                <span>Update Password</span>
                <ArrowRight className="w-4 h-4 text-nb-yellow" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Footer Link */}
      <div className="mt-6 pt-5 border-t-2 border-black text-center">
        <p className="font-satoshi text-xs text-neutral-600 font-medium">
          Remember your credentials?{' '}
          <Link
            href="/login"
            className="font-bold text-black underline underline-offset-2 hover:text-neutral-800"
          >
            Log in instead
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-nb-yellow bg-dot-pattern flex flex-col justify-center items-center p-4 sm:p-6 antialiased selection:bg-black selection:text-nb-yellow">
      <Suspense fallback={<div className="font-cabinet font-black uppercase text-sm">Loading reset form...</div>}>
        <ResetPasswordForm />
      </Suspense>

      <div className="mt-6 text-center text-xs text-neutral-700 font-medium font-satoshi">
        <Link href="/" className="hover:underline">
          &larr; Back to NEXORA Homepage
        </Link>
      </div>
    </div>
  );
}
