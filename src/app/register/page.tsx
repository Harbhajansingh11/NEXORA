'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, AlertCircle, Check, User, Mail, Lock } from 'lucide-react';

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

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorMessage(null);

    // Client-side validations
    if (name.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
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

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms of Service to continue.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: trimmedEmail,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to create account. Please check your information.');
        setLoading(false);
        return;
      }

      // Successful registration: redirected directly to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Registration submit error:', err);
      setErrorMessage('Unable to connect to the authentication service. Please check your connection.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nb-yellow bg-dot-pattern flex flex-col justify-center items-center p-4 sm:p-6 antialiased selection:bg-black selection:text-nb-yellow">
      <div className="w-full max-w-lg bg-white border-2 border-black p-7 sm:p-9 shadow-hard-lg relative my-8">
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
            Create your account.
          </h1>
          <p className="font-satoshi text-xs sm:text-sm text-neutral-600 mt-1 font-medium leading-relaxed">
            Your tasks, reminders, calendar, and daily plans — organized in one intelligent personal assistant.
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
              htmlFor="name"
              className="block font-cabinet font-bold text-xs uppercase tracking-wider text-nb-charcoal mb-1.5"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full bg-neutral-50 border-2 border-black pl-9 pr-3.5 py-2.5 text-sm text-nb-charcoal placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-60"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block font-cabinet font-bold text-xs uppercase tracking-wider text-nb-charcoal mb-1.5"
              >
                Password
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
                Confirm Password
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
                  placeholder="Repeat password"
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
          </div>

          {/* Password Strength Indicator */}
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

          {/* Terms & Privacy Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 border-2 border-black rounded-none text-black focus:ring-0 cursor-pointer accent-black shrink-0"
              />
              <span className="font-satoshi text-xs text-neutral-700 font-medium leading-snug">
                I agree to the terms of service, privacy policy, and acceptable use guidelines.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="nb-btn w-full bg-black text-white py-3.5 border-2 border-black font-cabinet font-black text-sm uppercase tracking-wider shadow-hard hover:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Creating account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 text-nb-yellow" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Login Link */}
        <div className="mt-6 pt-5 border-t-2 border-black text-center">
          <p className="font-satoshi text-xs text-neutral-600 font-medium">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-black underline underline-offset-2 hover:text-neutral-800"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-neutral-700 font-medium font-satoshi mb-8">
        <Link href="/" className="hover:underline">
          &larr; Back to NEXORA Homepage
        </Link>
      </div>
    </div>
  );
}
