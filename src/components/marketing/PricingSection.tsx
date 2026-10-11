import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
  const plans = [
    {
      name: 'Personal Free',
      badge: 'Core Essentials',
      price: '$0',
      period: 'forever',
      description: 'Ideal for individuals looking to eliminate daily chaos and establish a calm, organized workflow.',
      highlighted: false,
      buttonText: 'Get Started Free',
      features: [
        'Full personal productivity dashboard',
        'Unlimited tasks, checklists & tags',
        'Google & Outlook calendar sync',
        'Time & location smart reminders',
        '25 AI planner commands per day',
        'Keyboard shortcuts & command palette',
        'Standard community support',
      ],
    },
    {
      name: 'Pro Autonomous',
      badge: 'Most Popular',
      price: '$12',
      period: 'per month',
      description: 'For busy professionals and high-output builders who require continuous proactive calendar defense and unbounded AI power.',
      highlighted: true,
      buttonText: 'Start 14-Day Free Trial',
      features: [
        'Everything in Personal Free',
        'Unlimited AI planner & command operations',
        'Autonomous calendar defense & time-blocking',
        'Email action extraction & draft synthesis',
        'Proactive morning dossier & daily retro',
        'Multi-account calendar conflict resolution',
        'Priority high-speed model execution',
        'Direct founder & engineer support',
      ],
    },
  ];

  return (
    <section id="pricing" className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-black scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-nb-yellow border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 shadow-[2px_2px_0px_#000000]">
            TRANSPARENT PRICING
          </div>
          <h2 className="font-cabinet text-3xl sm:text-4xl md:text-5xl font-black text-nb-charcoal uppercase tracking-tight leading-none">
            Honest plans. Zero hidden traps.
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-neutral-700 mt-4 leading-relaxed font-medium">
            Start completely free to organize your daily schedule. Upgrade only when you want autonomous calendar defense and unlimited AI capabilities.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`border-2 border-black p-8 sm:p-10 flex flex-col justify-between relative ${
                plan.highlighted
                  ? 'bg-nb-yellow shadow-hard-lg'
                  : 'bg-neutral-50 shadow-hard'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 right-8 bg-black text-nb-yellow px-3 py-1 text-xs font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000000]">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-cabinet font-black text-2xl text-nb-charcoal uppercase tracking-tight">
                    {plan.name}
                  </h3>
                  {!plan.highlighted && (
                    <span className="font-cabinet text-xs font-bold px-2 py-0.5 bg-neutral-200 border border-black uppercase text-neutral-700">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="font-satoshi text-sm text-neutral-700 font-medium mb-6 min-h-[40px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 pb-6 border-b-2 border-black mb-6">
                  <span className="font-cabinet font-black text-5xl text-black">
                    {plan.price}
                  </span>
                  <span className="font-satoshi text-sm font-bold text-neutral-600 uppercase tracking-wider">
                    / {plan.period}
                  </span>
                </div>

                {/* Feature List */}
                <div className="space-y-3.5 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-sm font-medium text-neutral-900">
                      <div className={`w-4 h-4 rounded-none border border-black flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlighted ? 'bg-black text-nb-yellow' : 'bg-neutral-200 text-black'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t-2 border-black/20">
                <Link
                  href="/register"
                  className={`nb-btn w-full py-4 text-center font-cabinet font-black text-sm uppercase tracking-wider border-2 border-black shadow-hard flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-black text-white hover:bg-neutral-900'
                      : 'bg-white text-black hover:bg-neutral-100'
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="font-satoshi text-center text-xs text-neutral-600 font-medium mt-3">
                  {plan.highlighted ? '14-day free trial · Cancel anytime' : 'No credit card required'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
