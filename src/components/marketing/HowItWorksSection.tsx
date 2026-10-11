import React from 'react';
import { Layers, MessageSquareCode, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Sync your daily inputs',
      tagline: 'Integration & Setup',
      desc: 'Connect your active calendars, import existing priority todos, or simply draft your obligations directly into NEXORA.',
      icon: Layers,
      highlight: '30-second setup',
      mockupSnippet: 'Calendars synced: Work (Google) · Personal · Tasks active',
    },
    {
      num: '02',
      title: 'Command in natural speech',
      tagline: 'Intelligent Orchestration',
      desc: 'Type or speak: "Schedule deep work before 2 PM" or "Remind me to review design specs on Friday". NEXORA resolves conflicts autonomously.',
      icon: MessageSquareCode,
      highlight: 'Context aware',
      mockupSnippet: 'Parsed: Deep Work Block [10:00 - 12:30 PM] locked.',
    },
    {
      num: '03',
      title: 'Execute with locked focus',
      tagline: 'Frictionless Execution',
      desc: 'Wake up to a calm, prioritized agenda. Work through your tasks systematically with zero notification anxiety or tab overload.',
      icon: CheckCircle,
      highlight: 'Zero distraction',
      mockupSnippet: 'Today\'s agenda: 4 focused outcomes · 0 missed alerts.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-nb-yellow bg-dot-pattern py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-black scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest border border-black mb-4">
            SIMPLE THREE-STEP WORKFLOW
          </div>
          <h2 className="font-cabinet text-3xl sm:text-4xl md:text-5xl font-black text-nb-charcoal uppercase tracking-tight leading-none">
            How NEXORA puts your day in sync
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-neutral-800 mt-4 leading-relaxed font-medium">
            No steep learning curve. No tedious manual tagging or complex database setup. Just straightforward execution.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white border-2 border-black p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between relative"
              >
                {/* Number Badge Top Right */}
                <div className="absolute -top-4 right-6 bg-nb-charcoal text-white font-cabinet font-black text-lg px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000000]">
                  {step.num}
                </div>

                <div>
                  <div className="w-12 h-12 bg-nb-sage border-2 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000000]">
                    <Icon className="w-6 h-6 text-black" />
                  </div>

                  <span className="font-satoshi text-xs font-black text-neutral-500 uppercase tracking-widest block mb-1">
                    {step.tagline}
                  </span>
                  <h3 className="font-cabinet font-black text-2xl text-nb-charcoal mb-3 uppercase tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-satoshi text-sm text-neutral-700 leading-relaxed font-medium mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Micro preview snippet */}
                <div className="pt-4 border-t-2 border-black bg-neutral-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-5 mt-4">
                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-600 mb-1.5 uppercase tracking-wider">
                    <span>Engine Telemetry</span>
                    <span className="text-black font-black">{step.highlight}</span>
                  </div>
                  <div className="bg-white border border-black p-2 text-xs font-mono text-neutral-900 truncate">
                    &gt; {step.mockupSnippet}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 text-center">
          <Link
            href="/register"
            className="nb-btn inline-flex items-center gap-2 bg-black text-white px-7 py-3.5 border-2 border-black font-cabinet font-black text-sm uppercase tracking-wider shadow-hard"
          >
            Start In 30 Seconds <ArrowRight className="w-4 h-4 text-nb-yellow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
