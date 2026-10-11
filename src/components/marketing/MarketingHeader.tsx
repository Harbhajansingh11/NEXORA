'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

export const MarketingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#ffe17c] border-b-2 border-black select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Geometric Logo + Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          {/* Black Square with Yellow Lightning Geometric N */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#171e19] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 4.5V19.5M5 4.5L19 19.5M19 4.5V19.5"
                stroke="#ffe17c"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="5" cy="4.5" r="2" fill="#ffe17c" />
              <circle cx="19" cy="19.5" r="2" fill="#ffe17c" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-cabinet font-black text-xl tracking-tight text-[#171e19] leading-none">
              NEXORA
            </span>
            <span className="font-satoshi text-[10px] font-bold text-[#171e19]/70 tracking-widest uppercase">
              Your Life. In Sync.
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-satoshi font-bold text-sm text-[#171e19]">
          <a
            href="#features"
            className="hover:underline hover:decoration-2 decoration-black underline-offset-4 transition-all"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:underline hover:decoration-2 decoration-black underline-offset-4 transition-all"
          >
            How It Works
          </a>
          <a
            href="#use-cases"
            className="hover:underline hover:decoration-2 decoration-black underline-offset-4 transition-all"
          >
            Use Cases
          </a>
          <a
            href="#pricing"
            className="hover:underline hover:decoration-2 decoration-black underline-offset-4 transition-all"
          >
            Pricing
          </a>
        </nav>

        {/* Right: Auth Actions */}
        <div className="hidden sm:flex items-center gap-3 font-satoshi">
          <Link
            href="/login"
            className="px-3.5 py-1.5 border-2 border-black bg-white text-[#171e19] font-bold text-xs shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] transition-all"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="px-4 py-1.5 border-2 border-black bg-[#171e19] text-white font-bold text-xs shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000000] transition-all flex items-center gap-1.5"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 bg-white border-2 border-black text-[#171e19] shadow-[2px_2px_0px_#000000]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t-2 border-black bg-[#ffe17c] px-4 py-4 space-y-3 font-satoshi animate-dropdown">
          <div className="flex flex-col space-y-2 font-bold text-sm text-[#171e19]">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:underline decoration-2"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:underline decoration-2"
            >
              How It Works
            </a>
            <a
              href="#use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:underline decoration-2"
            >
              Use Cases
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:underline decoration-2"
            >
              Pricing
            </a>
          </div>

          <div className="pt-2 border-t-2 border-black flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 border-2 border-black bg-white text-[#171e19] font-bold text-xs shadow-[2px_2px_0px_#000000]"
            >
              Log In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 border-2 border-black bg-[#171e19] text-white font-bold text-xs shadow-[2px_2px_0px_#000000] flex items-center justify-center gap-1.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
