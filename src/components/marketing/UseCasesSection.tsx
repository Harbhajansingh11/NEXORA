import React from 'react';
import { Briefcase, GraduationCap, Laptop, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function UseCasesSection() {
  const useCases = [
    {
      role: 'Professionals & Leaders',
      tagline: 'High Meeting Density',
      description: 'Executives, project leads, and engineers who manage packed calendars and need time-blocking defense against meeting creep.',
      icon: Briefcase,
      accentBg: 'bg-nb-yellow',
      benefits: [
        'Automatic focus block reservations',
        'Concise meeting agenda dossier generation',
        'Follow-up task extraction from emails',
        'Priority day planning without administrative toil'
      ],
      sampleCommand: '"Synthesize my 3 PM client sync notes and add follow-ups."'
    },
    {
      role: 'Students & Researchers',
      tagline: 'Deadlines & Coursework',
      description: 'Undergrads, PhD candidates, and lifelong learners balancing multiple assignment deadlines, study blocks, and reading schedules.',
      icon: GraduationCap,
      accentBg: 'bg-nb-sage',
      benefits: [
        'Syllabus & assignment milestone tracking',
        'Spaced repetition reminder scheduling',
        'Uninterrupted deep study time carving',
        'Morning daily brief of upcoming academic commitments'
      ],
      sampleCommand: '"Remind me 48h before the Machine Learning thesis deadline."'
    },
    {
      role: 'Freelancers & Consultants',
      tagline: 'Multi-Client Autonomy',
      description: 'Independent operators managing multiple client commitments, asynchronous deliverables, and flexible independent billing hours.',
      icon: Laptop,
      accentBg: 'bg-white',
      benefits: [
        'Clear separation of concurrent client commitments',
        'Zero forgotten deliverable promises or handoffs',
        'Unified view across disparate client calendars',
        'Instant task capture on the fly'
      ],
      sampleCommand: '"Block 3 hours tomorrow morning for client prototype sprint."'
    },
  ];

  return (
    <section id="use-cases" className="bg-nb-charcoal py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-black scroll-mt-16 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800 gap-6">
          <div>
            <div className="inline-block bg-nb-yellow text-black px-3 py-1 text-xs font-black uppercase tracking-widest border border-black mb-4">
              TAILORED FOR HIGH ACHIEVERS
            </div>
            <h2 className="font-cabinet text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
              Built for how you actually work
            </h2>
            <p className="font-satoshi text-base sm:text-lg text-neutral-300 mt-4 max-w-2xl leading-relaxed">
              Whether running engineering initiatives, researching complex topics, or billing clients independently — NEXORA adapts to your cognitive tempo.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/register"
              className="nb-btn inline-flex items-center gap-2 bg-nb-yellow text-black px-5 py-3 border-2 border-black font-cabinet font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#ffffff]"
            >
              Try For Your Workflow <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Use-Case Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div
                key={i}
                className="bg-neutral-900 border-2 border-black p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_#ffe17c] hover:shadow-[8px_8px_0px_#ffe17c] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 ${uc.accentBg} border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]`}>
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <span className="font-cabinet text-[11px] font-black uppercase px-2.5 py-1 bg-neutral-800 border border-neutral-700 text-neutral-300 tracking-wider">
                      {uc.tagline}
                    </span>
                  </div>

                  <h3 className="font-cabinet font-black text-2xl text-white mb-2 uppercase tracking-tight">
                    {uc.role}
                  </h3>
                  <p className="font-satoshi text-sm text-neutral-300 leading-relaxed font-medium mb-6">
                    {uc.description}
                  </p>

                  <div className="space-y-3 mb-6 pt-4 border-t border-neutral-800">
                    {uc.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <Check className="w-4 h-4 text-nb-yellow shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Prompt Container */}
                <div className="pt-4 border-t border-neutral-800 bg-black/60 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-5 mt-4">
                  <span className="font-satoshi text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                    Example Command:
                  </span>
                  <p className="font-mono text-xs text-nb-yellow italic leading-relaxed">
                    {uc.sampleCommand}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
