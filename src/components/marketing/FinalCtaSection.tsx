import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function FinalCtaSection() {
  return (
    <section className="bg-nb-yellow bg-dot-pattern py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-black">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border-2 border-black p-8 sm:p-14 shadow-hard-2xl text-center relative overflow-hidden">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 bg-black text-nb-yellow font-mono text-[10px] px-3 py-1 font-bold border-b border-r border-black uppercase">
            NEXORA ENGINE v2.4
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-nb-sage border-2 border-black px-3.5 py-1 text-xs font-black uppercase tracking-widest mb-6 shadow-[2px_2px_0px_#000000]">
              <Sparkles className="w-3.5 h-3.5" />
              RESTORE CLARITY TODAY
            </div>

            <h2 className="font-cabinet text-3xl sm:text-5xl md:text-6xl font-black text-nb-charcoal uppercase tracking-tight leading-none mb-6">
              Less chaos. <br className="hidden sm:inline" />
              More control.
            </h2>

            <p className="font-satoshi text-base sm:text-xl text-neutral-700 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              Join thousands of engineers, researchers, and operators who start their mornings with intention instead of stress.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/register"
                className="nb-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 border-2 border-black font-cabinet font-black text-base uppercase tracking-wider shadow-hard hover:bg-neutral-900"
              >
                Get Started Free <ArrowRight className="w-5 h-5 text-nb-yellow" />
              </Link>
              <Link
                href="/dashboard"
                className="nb-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-nb-yellow text-black px-8 py-4 border-2 border-black font-cabinet font-black text-base uppercase tracking-wider shadow-hard hover:bg-amber-300"
              >
                Launch Live App <Zap className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-neutral-600 pt-6 border-t-2 border-black/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Zero setup friction</span>
              </div>
              <span>•</span>
              <div>No credit card required</div>
              <span>•</span>
              <div>Instant calendar sync</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
