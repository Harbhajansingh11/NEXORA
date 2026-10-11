import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProblemSolutionSection() {
  const problems = [
    {
      title: 'Context switching across 6+ tabs',
      desc: 'Checking calendar in Google, tracking todos in Todoist, snoozing emails in Gmail, and taking notes in Notion kills 40% of productive focus.',
    },
    {
      title: 'Reactive calendar chaos',
      desc: 'Meetings get accepted indiscriminately, leaving 15-minute fragmented gaps that are useless for deep work and problem solving.',
    },
    {
      title: 'Forgotten commitments & loose ends',
      desc: 'Tasks promised in emails or chat threads slip through the cracks without an automated safety net to catch them.',
    },
  ];

  const solutions = [
    {
      title: 'One unified operational command center',
      desc: 'NEXORA synthesizes your agenda, daily tasks, reminders, and incoming communication into a single, cohesive feed.',
    },
    {
      title: 'Autonomous schedule defense',
      desc: 'AI proactively blocks focus intervals, groups fragmented free time, and prepares contextual briefs before each meeting.',
    },
    {
      title: 'Zero manual bookkeeping',
      desc: 'Natural language capture extracts action items instantly. Say "Remind me tomorrow at 10 AM" and NEXORA handles the rest.',
    },
  ];

  return (
    <section className="bg-nb-sage py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest border border-black mb-4">
            THE PARADIGM SHIFT
          </div>
          <h2 className="font-cabinet text-3xl sm:text-4xl md:text-5xl font-black text-nb-charcoal uppercase tracking-tight leading-tight">
            Stop juggling fragmented productivity apps
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-neutral-800 mt-4 leading-relaxed font-medium">
            You don&apos;t need another complex project management suite. You need an intelligent personal co-pilot that keeps your entire day synchronized without administrative friction.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Problem Card */}
          <div className="bg-white border-2 border-black p-6 sm:p-8 shadow-hard flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b-2 border-black mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 border-2 border-black flex items-center justify-center font-black text-red-600 shadow-[2px_2px_0px_#000000]">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-cabinet font-black text-xl text-nb-charcoal uppercase tracking-tight">The Old Way</h3>
                    <p className="font-satoshi text-xs font-bold text-neutral-500 uppercase tracking-wider">Fragmented & Stressful</p>
                  </div>
                </div>
                <span className="bg-neutral-100 text-neutral-700 text-xs font-bold px-2.5 py-1 border border-black uppercase">
                  Before
                </span>
              </div>

              <div className="space-y-6">
                {problems.map((prob, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-none bg-red-50 border-2 border-black flex items-center justify-center shrink-0 mt-0.5 text-xs font-black text-red-600">
                      ✕
                    </div>
                    <div>
                      <h4 className="font-cabinet font-black text-base text-nb-charcoal leading-snug">{prob.title}</h4>
                      <p className="font-satoshi text-sm text-neutral-700 mt-1 leading-normal">{prob.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-black/10 bg-neutral-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 text-xs font-bold text-neutral-600 flex items-center justify-between">
              <span>Result: Mental exhaustion & missed deadlines</span>
              <span className="text-red-700 font-black">HIGH FRICTION</span>
            </div>
          </div>

          {/* Solution Card */}
          <div className="bg-nb-yellow border-2 border-black p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between relative">
            <div className="absolute -top-3.5 right-6 bg-black text-nb-yellow px-3 py-1 text-xs font-black uppercase tracking-wider border border-black">
              RECOMMENDED
            </div>

            <div>
              <div className="flex items-center justify-between pb-6 border-b-2 border-black mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center font-black text-nb-yellow shadow-[2px_2px_0px_#000000]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-cabinet font-black text-xl text-nb-charcoal uppercase tracking-tight">The NEXORA Way</h3>
                    <p className="font-satoshi text-xs font-bold text-neutral-800 uppercase tracking-wider">Synchronized & Calm</p>
                  </div>
                </div>
                <span className="bg-black text-white text-xs font-bold px-2.5 py-1 border border-black uppercase">
                  After
                </span>
              </div>

              <div className="space-y-6">
                {solutions.map((sol, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-none bg-black border-2 border-black flex items-center justify-center shrink-0 mt-0.5 text-xs font-black text-nb-yellow">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-cabinet font-black text-base text-nb-charcoal leading-snug">{sol.title}</h4>
                      <p className="font-satoshi text-sm text-neutral-900 mt-1 leading-normal font-medium">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-black flex items-center justify-between">
              <span className="font-satoshi text-xs font-black text-nb-charcoal uppercase tracking-wider">
                Result: Continuous focus & quiet clarity
              </span>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 font-cabinet font-black text-xs uppercase tracking-wider text-black hover:underline"
              >
                Experience Live <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
