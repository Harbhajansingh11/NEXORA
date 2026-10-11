import React from 'react';
import Link from 'next/link';

export function MarketingFooter() {
  return (
    <footer className="bg-nb-charcoal text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t-2 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-black border-2 border-nb-yellow flex items-center justify-center shadow-[2px_2px_0px_#ffe17c]">
                <span className="font-cabinet font-black text-xl text-nb-yellow leading-none">N</span>
              </div>
              <span className="font-cabinet font-black text-xl tracking-tight text-white uppercase">
                NEXORA
              </span>
            </Link>
            <p className="font-satoshi text-xs text-neutral-400 leading-relaxed font-medium">
              Your Life. In Sync. AI-powered personal productivity assistant for tasks, reminders, calendar scheduling, and daily planning.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-900 border border-neutral-700 text-[11px] font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-cabinet font-black text-xs uppercase tracking-widest text-nb-yellow mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-neutral-300">
              <li>
                <a href="#features" className="hover:text-white transition-colors">Core Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Transparent Pricing</a>
              </li>
            </ul>
          </div>

          {/* Live App Routes */}
          <div>
            <h4 className="font-cabinet font-black text-xs uppercase tracking-widest text-nb-sage mb-4">
              Product Suite
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-neutral-300">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">Command Dashboard</Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-white transition-colors">AI Assistant</Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-white transition-colors">Focus Calendar</Link>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-white transition-colors">Priority Tasks</Link>
              </li>
              <li>
                <Link href="/reminders" className="hover:text-white transition-colors">Smart Reminders</Link>
              </li>
              <li>
                <Link href="/email" className="hover:text-white transition-colors">Email Assistant</Link>
              </li>
            </ul>
          </div>

          {/* Company & Philosophy */}
          <div>
            <h4 className="font-cabinet font-black text-xs uppercase tracking-widest text-white mb-4">
              Philosophy
            </h4>
            <p className="font-satoshi text-xs text-neutral-400 leading-relaxed mb-4">
              Designed against the grain of noisy, bloated software. High contrast, sharp edges, zero clutter, and uncompromising respect for your attention.
            </p>
            <div className="bg-neutral-900 border border-neutral-800 p-3 text-xs font-mono text-neutral-300">
              <span className="text-nb-yellow font-bold">Privacy First:</span> Local state priority, zero third-party data tracking.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} NEXORA Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-neutral-500">Built with Cabinet Grotesk &amp; Satoshi</span>
            <span>•</span>
            <Link href="/dashboard" className="text-nb-yellow hover:underline">
              Launch Web App
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
