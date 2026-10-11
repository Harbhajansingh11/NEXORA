'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Bot,
  Bell,
  Sparkles,
  Check
} from 'lucide-react';
import { useHydratedDate } from '@/lib/dateUtils';

export const HeroSection: React.FC = () => {
  const { compactBadge } = useHydratedDate();
  return (
    <section className="relative bg-[#ffe17c] bg-dot-pattern border-b-2 border-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Heading, Copy, and Actions */}
        <div className="lg:col-span-6 space-y-6 animate-fade-in">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000000]">
            <Sparkles className="w-3.5 h-3.5 text-[#171e19]" />
            <span className="font-satoshi font-black text-xs tracking-wider text-[#171e19] uppercase">
              YOUR LIFE. IN SYNC.
            </span>
          </div>

          {/* Neo-Brutalist Giant Headline */}
          <div className="space-y-1">
            <h1 className="font-cabinet font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.92] tracking-tighter text-[#171e19] uppercase">
              LESS CHAOS.
              <br />
              MORE <span className="stroke-heading inline-block">CONTROL.</span>
            </h1>
          </div>

          {/* Subtitle Description */}
          <p className="font-satoshi font-medium text-base sm:text-lg text-[#171e19]/90 max-w-lg leading-relaxed">
            Your tasks, reminders, calendar, and daily plans — organized in one intelligent personal assistant.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
            <Link
              href="/register"
              className="nb-btn px-6 py-3.5 bg-[#171e19] text-white border-2 border-black font-cabinet font-black text-sm sm:text-base tracking-wide shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-2 hover:bg-black transition-all"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#features"
              className="nb-btn px-6 py-3.5 bg-white text-[#171e19] border-2 border-black font-cabinet font-black text-sm sm:text-base tracking-wide shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-2 hover:bg-[#b7c6c2] transition-all"
            >
              <span>Explore Nexora</span>
            </a>
          </div>

          {/* Small Reassurance Line */}
          <div className="flex items-center gap-2 text-xs font-satoshi font-bold text-[#171e19]/75 pt-1">
            <Check className="w-3.5 h-3.5 text-[#171e19]" />
            <span>Start free · No credit card required</span>
          </div>
        </div>

        {/* Right Column: HTML/CSS Browser-Window Product Mockup */}
        <div className="lg:col-span-6 animate-fade-in">
          <div className="relative mx-auto max-w-xl">
            {/* The Main Browser Frame */}
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden transition-all duration-200 hover:shadow-[10px_10px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px]">
              {/* Dark Window Header */}
              <div className="bg-[#171e19] border-b-2 border-black px-4 py-2.5 flex items-center justify-between">
                {/* 3 Control Circles */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff6b6b] border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#ffe17c] border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#b7c6c2] border border-black inline-block" />
                </div>

                {/* Center URL Address */}
                <div className="font-mono text-[11px] text-white/90 font-bold tracking-wider bg-black/40 px-3 py-0.5 border border-white/20">
                  nexora.cloud/today
                </div>

                {/* Right Status Pill */}
                <span className="font-satoshi text-[10px] font-black uppercase tracking-wider bg-[#ffe17c] text-[#171e19] px-2 py-0.5 border border-black">
                  IN SYNC
                </span>
              </div>

              {/* Window Interior Workspace */}
              <div className="p-4 sm:p-5 space-y-4 bg-white font-satoshi text-[#171e19]">
                {/* Internal App Navigation Banner */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#171e19] border border-black flex items-center justify-center">
                      <span className="text-[#ffe17c] font-black text-xs">N</span>
                    </div>
                    <span className="font-cabinet font-black text-sm tracking-tight">WORKSPACE // TODAY</span>
                  </div>

                  <span className="font-mono text-[11px] font-bold bg-[#b7c6c2] border border-black px-2 py-0.5">
                    {compactBadge}
                  </span>
                </div>

                {/* AI Assistant Command Input Mockup */}
                <div className="bg-[#ffe17c] border-2 border-black p-3 shadow-[3px_3px_0px_#000000] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#171e19] min-w-0">
                      <Bot className="w-4 h-4 text-[#171e19] flex-shrink-0" />
                      <span className="truncate font-mono">&gt; &quot;Plan my day around deep focus blocks&quot;</span>
                    </div>

                    <span className="bg-[#171e19] text-white text-[10px] font-bold px-2 py-0.5 border border-black uppercase flex-shrink-0">
                      EXECUTED
                    </span>
                  </div>

                  {/* Assistant Synthesis Response */}
                  <div className="bg-white border-2 border-black p-2.5 text-xs text-[#171e19] leading-snug">
                    <span className="font-cabinet font-black text-[11px] uppercase tracking-wider block text-[#171e19] mb-1">
                      ⚡ NEXORA PLANNER:
                    </span>
                    Defending <strong>2.5h morning focus block</strong> (09:00 AM – 11:30 AM). Next commitment is Platform Review at 12:00 PM. 3 priority tasks queued.
                  </div>
                </div>

                {/* Two Sub-panels: Schedule (Left) & Tasks (Right) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Left: Schedule Agenda */}
                  <div className="bg-[#b7c6c2] border-2 border-black p-3 shadow-[3px_3px_0px_#000000] space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-black">
                      <span className="font-cabinet font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>SCHEDULE</span>
                      </span>
                      <span className="font-mono text-[10px] font-bold bg-white px-1.5 py-0.2 border border-black">
                        3 BLOCKS
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs font-bold">
                      <div className="bg-[#ffe17c] border border-black p-1.5 flex items-center justify-between">
                        <div className="truncate">
                          <span className="font-mono text-[10px] block text-black/70">09:00 - 11:30 AM</span>
                          <span className="truncate">Core Engine Deep Work</span>
                        </div>
                        <span className="text-[9px] bg-[#171e19] text-white px-1 py-0.2 border border-black ml-1 flex-shrink-0">DEFENDED</span>
                      </div>

                      <div className="bg-white border border-black p-1.5">
                        <span className="font-mono text-[10px] block text-black/70">12:00 - 01:00 PM</span>
                        <span className="truncate">Scalability Review</span>
                      </div>

                      <div className="bg-white border border-black p-1.5">
                        <span className="font-mono text-[10px] block text-black/70">02:30 - 03:30 PM</span>
                        <span className="truncate">Roadmap Stakeholder Sync</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Tasks & Reminders */}
                  <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000000] space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-black">
                      <span className="font-cabinet font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>PRIORITY FOCUS</span>
                      </span>
                      <span className="font-mono text-[10px] font-bold bg-[#ffe17c] px-1.5 py-0.2 border border-black">
                        2 OF 3
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs font-medium">
                      <div className="p-1.5 border border-black bg-[#ffe17c]/30 flex items-start gap-2">
                        <span className="font-mono font-bold text-[11px] text-emerald-700 mt-0.5">☑</span>
                        <div className="min-w-0">
                          <span className="line-through text-black/60 block text-[11px] truncate">Audit security token expiry</span>
                          <span className="text-[10px] text-black/50 font-mono">Frontend • Done</span>
                        </div>
                      </div>

                      <div className="p-1.5 border border-black bg-white flex items-start gap-2">
                        <span className="font-mono font-bold text-[11px] text-black mt-0.5">☐</span>
                        <div className="min-w-0">
                          <span className="font-bold block text-[11px] truncate text-black">Review Q4 design system tokens</span>
                          <span className="text-[10px] text-rose-700 font-bold font-mono">Urgent • Due 5 PM</span>
                        </div>
                      </div>
                    </div>

                    {/* Miniature Reminder Alert Box */}
                    <div className="bg-[#ffe17c] border border-black p-2 text-[11px] flex items-start gap-1.5 font-bold">
                      <Bell className="w-3.5 h-3.5 text-[#171e19] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="block leading-tight truncate">10:00 AM: Sync with Marcus</span>
                        <span className="text-[10px] text-black/70 font-mono font-normal">Dynamic token throttling notes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
