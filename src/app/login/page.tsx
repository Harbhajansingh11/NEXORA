'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, Lock, Mail } from 'lucide-react';

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const resetSuccess = searchParams.get('reset') === 'success';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    resetSuccess ? 'Your password has been reset. Please log in with your new credentials.' : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    // Client-side validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          password,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Invalid email or password.');
        setLoading(false);
        return;
      }

      // Successful login
      // Safe redirect validation: ensure callbackUrl starts with / and not //
      let targetUrl = '/dashboard';
      if (
        callbackUrl &&
        callbackUrl.startsWith('/') &&
        !callbackUrl.startsWith('//') &&
        !callbackUrl.startsWith('/\\') &&
        !callbackUrl.includes(':')
      ) {
        targetUrl = callbackUrl;
      }

      // Hard refresh to refresh server session and cookie context
      window.location.href = targetUrl;
    } catch (err) {
      console.error('Login submit error:', err);
      setErrorMessage('Unable to connect to the authentication server. Please check your connection.');
      setLoading(false);
    }
  };

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
          Welcome back.
        </h1>
        <p className="font-satoshi text-xs sm:text-sm text-neutral-600 mt-1 font-medium">
          Your day, back in sync. Enter your credentials to access your workspace.
        </p>
      </div>

      {/* Alert Messages */}
      {errorMessage && (
        <div className="mb-5 p-3.5 bg-red-50 border-2 border-black shadow-[3px_3px_0px_#000000] flex items-start gap-2.5 text-xs text-red-900 font-medium">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="leading-snug">{errorMessage}</div>
        </div>
      )}

      {successMessage && (
        <div className="mb-5 p-3.5 bg-emerald-50 border-2 border-black shadow-[3px_3px_0px_#000000] flex items-start gap-2.5 text-xs text-emerald-900 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-snug">{successMessage}</div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block font-cabinet font-bold text-xs uppercase tracking-wider text-nb-charcoal mb-1.5"
          >
            Email Address
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block font-cabinet font-bold text-xs uppercase tracking-wider text-nb-charcoal"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="font-satoshi text-xs font-bold text-neutral-600 hover:text-black hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-50 border-2 border-black pl-9 pr-10 py-2.5 text-sm text-nb-charcoal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
              className="w-4 h-4 border-2 border-black rounded-none text-black focus:ring-0 cursor-pointer accent-black"
            />
            <span className="font-satoshi text-xs text-neutral-700 font-medium">
              Remember this device for 30 days
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="nb-btn w-full bg-black text-white py-3.5 border-2 border-black font-cabinet font-black text-sm uppercase tracking-wider shadow-hard hover:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight className="w-4 h-4 text-nb-yellow" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Footer Registration Link */}
      <div className="mt-6 pt-5 border-t-2 border-black text-center">
        <p className="font-satoshi text-xs text-neutral-600 font-medium">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-bold text-black underline underline-offset-2 hover:text-neutral-800"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-nb-yellow bg-dot-pattern flex flex-col justify-center items-center p-4 sm:p-6 antialiased selection:bg-black selection:text-nb-yellow">
      <Suspense fallback={<div className="font-cabinet font-black uppercase text-sm">Loading login...</div>}>
        <LoginForm />
      </Suspense>

      <div className="mt-6 text-center text-xs text-neutral-700 font-medium font-satoshi">
        <Link href="/" className="hover:underline">
          &larr; Back to NEXORA Homepage
        </Link>
      </div>
    </div>
  );
}
