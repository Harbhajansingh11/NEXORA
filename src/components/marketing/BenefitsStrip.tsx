'use client';

import React from 'react';

export const BenefitsStrip: React.FC = () => {
  const benefits = [
    "UNIFIED CALENDAR & TASKS",
    "CONTEXTUAL AI COPILOT",
    "HARD SCHEDULE DEFENSE",
    "ZERO FABRICATED METRICS",
    "AUTONOMOUS 7 AM BRIEFINGS",
    "LOCAL-FIRST EXECUTION",
    "EXECUTIVE INBOX DISTILLATION"
  ];

  return (
    <div className="bg-[#171e19] text-white border-b-2 border-black py-3.5 px-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-6 text-xs sm:text-sm font-cabinet font-black tracking-wider uppercase">
        {benefits.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-[#ffe17c] text-xs">✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
