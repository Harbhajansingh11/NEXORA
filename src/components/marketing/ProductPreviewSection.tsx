'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Calendar, 
  CheckSquare, 
  Send, 
  Clock, 
  Check, 
  Flame, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useHydratedDate } from '@/lib/dateUtils';

export function ProductPreviewSection() {
  const [activeTab, setActiveTab] = useState<'assistant' | 'calendar' | 'tasks'>('assistant');
  const { weekday } = useHydratedDate();

  return (
    <section className="bg-nb-sage py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest border border-black mb-4">
            INTERFACE ARCHITECTURE
          </div>
          <h2 className="font-cabinet text-3xl sm:text-4xl md:text-5xl font-black text-nb-charcoal uppercase tracking-tight leading-none">
            Designed for execution, not distraction
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-neutral-800 mt-4 leading-relaxed font-medium">
            Explore how NEXORA handles your real day-to-day workflow with precision and speed.
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('assistant')}
            className={`px-5 py-2.5 font-cabinet font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-black transition-all flex items-center gap-2 ${
              activeTab === 'assistant'
                ? 'bg-black text-nb-yellow shadow-[4px_4px_0px_#000000]'
                : 'bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000000]'
            }`}
          >
            <Bot className="w-4 h-4" />
            AI Command Center
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-5 py-2.5 font-cabinet font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-black transition-all flex items-center gap-2 ${
              activeTab === 'calendar'
                ? 'bg-black text-nb-yellow shadow-[4px_4px_0px_#000000]'
                : 'bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000000]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Agenda & Time Blocking
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-5 py-2.5 font-cabinet font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-black transition-all flex items-center gap-2 ${
              activeTab === 'tasks'
                ? 'bg-black text-nb-yellow shadow-[4px_4px_0px_#000000]'
                : 'bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000000]'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            Priority Task Matrix
          </button>
        </div>

        {/* Window Shell Container */}
        <div className="max-w-5xl mx-auto bg-white border-2 border-black shadow-hard-lg overflow-hidden">
          {/* Window Chrome Header */}
          <div className="bg-nb-charcoal px-4 py-3 border-b-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 border border-black inline-block" />
              <span className="ml-3 font-mono text-xs text-neutral-400 hidden sm:inline">
                nexora.internal / {activeTab}-engine
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-nb-yellow bg-black px-2 py-0.5 border border-neutral-700">
                ACTIVE STATE
              </span>
            </div>
          </div>

          {/* Window Content */}
          <div className="p-6 sm:p-8 bg-neutral-50 min-h-[380px]">
            {activeTab === 'assistant' && (
              <div className="space-y-6">
                <div className="bg-white border-2 border-black p-4 sm:p-5 shadow-hard">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-nb-yellow border-2 border-black flex items-center justify-center font-black text-xs shrink-0">
                      U
                    </div>
                    <div className="flex-1">
                      <p className="font-satoshi text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">User Command</p>
                      <p className="font-satoshi text-sm sm:text-base font-medium text-nb-charcoal">
                        &quot;Plan my morning tomorrow: block 2 hours for drafting the system spec, and remind me at 11 AM to check in with Sarah.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-nb-yellow/20 border-2 border-black p-5 shadow-hard">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-black text-nb-yellow border-2 border-black flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-cabinet font-black text-xs uppercase tracking-wider text-black">
                          NEXORA Planner Response
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-black text-white px-1.5 py-0.5">
                          PARSED IN 140ms
                        </span>
                      </div>
                      <p className="font-satoshi text-sm text-neutral-800 font-medium">
                        I&apos;ve organized your morning tomorrow around your peak focus hours:
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="bg-white border-2 border-black p-3 text-xs shadow-[2px_2px_0px_#000000]">
                          <span className="font-bold text-black flex items-center gap-1.5 mb-1">
                            <Clock className="w-3.5 h-3.5 text-neutral-600" /> Focus Block Locked
                          </span>
                          <span className="text-neutral-700">09:00 AM – 11:00 AM · Draft System Spec</span>
                        </div>
                        <div className="bg-white border-2 border-black p-3 text-xs shadow-[2px_2px_0px_#000000]">
                          <span className="font-bold text-black flex items-center gap-1.5 mb-1">
                            <Check className="w-3.5 h-3.5 text-green-700" /> Reminder Scheduled
                          </span>
                          <span className="text-neutral-700">11:00 AM · Check in with Sarah regarding spec</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Input Bar */}
                <div className="relative">
                  <div className="bg-white border-2 border-black p-3 flex items-center justify-between shadow-[3px_3px_0px_#000000]">
                    <span className="font-satoshi text-sm text-neutral-400 font-medium pl-2">
                      Type another request or try &quot;Show my priorities for this week&quot;...
                    </span>
                    <button className="bg-black text-nb-yellow p-2 border-2 border-black shadow-[2px_2px_0px_#000000]">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <div className="flex items-center gap-2">
                    <span className="font-cabinet font-black text-base uppercase text-nb-charcoal">{weekday} Schedule</span>
                    <span className="bg-nb-yellow border border-black text-xs font-bold px-2 py-0.5">3 Meetings · 4.5h Focus</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-500 uppercase">Auto-defense Active</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white border-2 border-black p-3 sm:p-4 shadow-hard flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-16 text-center py-1 bg-neutral-100 border border-black font-mono text-xs font-bold">
                        09:00 AM
                      </div>
                      <div>
                        <h4 className="font-cabinet font-black text-sm uppercase text-nb-charcoal">Design Architecture Review</h4>
                        <p className="font-satoshi text-xs text-neutral-600">Sync with Engineering & Product</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-neutral-200 border border-black px-2 py-0.5 uppercase">
                      45m
                    </span>
                  </div>

                  <div className="bg-nb-yellow border-2 border-black p-3 sm:p-4 shadow-hard flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-16 text-center py-1 bg-black text-nb-yellow border border-black font-mono text-xs font-bold">
                        10:00 AM
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                          <h4 className="font-cabinet font-black text-sm uppercase text-nb-charcoal">Deep Focus Block (Protected)</h4>
                        </div>
                        <p className="font-satoshi text-xs text-neutral-800 font-medium">Notifications silenced · High-focus coding session</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-black text-white px-2 py-0.5 uppercase">
                      2h 00m
                    </span>
                  </div>

                  <div className="bg-white border-2 border-black p-3 sm:p-4 shadow-hard flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-16 text-center py-1 bg-neutral-100 border border-black font-mono text-xs font-bold">
                        01:30 PM
                      </div>
                      <div>
                        <h4 className="font-cabinet font-black text-sm uppercase text-nb-charcoal">Weekly Sprint Alignment</h4>
                        <p className="font-satoshi text-xs text-neutral-600">Core Team · 4 attendees</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-neutral-200 border border-black px-2 py-0.5 uppercase">
                      30m
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <div className="flex items-center gap-2">
                    <span className="font-cabinet font-black text-base uppercase text-nb-charcoal">Today&apos;s Priority Matrix</span>
                    <span className="bg-black text-white text-xs font-bold px-2 py-0.5">3 Pending · 1 Completed</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-500 uppercase">Sorted by Urgency</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white border-2 border-black p-3 sm:p-4 shadow-hard flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-black bg-white flex items-center justify-center font-black text-xs cursor-pointer">
                        
                      </div>
                      <div>
                        <h4 className="font-cabinet font-black text-sm text-nb-charcoal">Finalize Neo-Brutalist design tokens</h4>
                        <p className="font-satoshi text-xs text-neutral-600">Tailwind palette & font scales</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold bg-red-100 text-red-700 border border-black px-2 py-0.5 flex items-center gap-1 uppercase">
                        <Flame className="w-3 h-3" /> High
                      </span>
                      <span className="text-[11px] font-mono text-neutral-600 hidden sm:inline">Due 12:00 PM</span>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-black p-3 sm:p-4 shadow-hard flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-black bg-white flex items-center justify-center font-black text-xs cursor-pointer">
                        
                      </div>
                      <div>
                        <h4 className="font-cabinet font-black text-sm text-nb-charcoal">Review pull request: Responsive Header</h4>
                        <p className="font-satoshi text-xs text-neutral-600">GitHub #412 · Navigation refactor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold bg-nb-yellow text-black border border-black px-2 py-0.5 uppercase">
                        Medium
                      </span>
                      <span className="text-[11px] font-mono text-neutral-600 hidden sm:inline">Due 03:00 PM</span>
                    </div>
                  </div>

                  <div className="bg-neutral-100 border-2 border-black/60 p-3 sm:p-4 shadow-sm flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-black bg-black text-white flex items-center justify-center font-black text-xs">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-cabinet font-black text-sm text-neutral-500 line-through">Draft morning executive summary</h4>
                        <p className="font-satoshi text-xs text-neutral-400">Completed at 08:45 AM</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-neutral-200 text-neutral-600 border border-neutral-400 px-2 py-0.5 uppercase">
                      Done
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-white px-6 py-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-satoshi text-xs text-neutral-600 font-medium">
              Live interactive components powered by NEXORA App Engine.
            </span>
            <Link
              href="/dashboard"
              className="nb-btn inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 border-2 border-black font-cabinet font-black text-xs uppercase tracking-wider shadow-hard"
            >
              Launch Full Dashboard <ArrowRight className="w-3.5 h-3.5 text-nb-yellow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
