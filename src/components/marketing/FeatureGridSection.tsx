import React from 'react';
import { 
  Bot, 
  Bell, 
  Calendar, 
  CheckSquare, 
  Mail, 
  Compass, 
  ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

export function FeatureGridSection() {
  const features = [
    {
      id: 'assistant',
      title: 'Conversational Command Center',
      tagline: 'AI Assistant',
      description: 'Interact in natural language to query your day, dispatch actions, reschedule conflicts, and synthesize briefings without clicking through dozens of menus.',
      icon: Bot,
      color: 'bg-nb-yellow',
      actionUrl: '/assistant',
      badge: 'Autonomous',
      details: ['Natural language command entry', 'Context-aware reasoning', 'Direct action dispatch']
    },
    {
      id: 'reminders',
      title: 'Time & Context Triggers',
      tagline: 'Smart Reminders',
      description: 'Never drop a high-stakes promise. Set smart recurring or scheduled reminders that proactively notify you right when action is required.',
      icon: Bell,
      color: 'bg-nb-sage',
      actionUrl: '/reminders',
      badge: 'Precision',
      details: ['Snooze intelligence', 'Priority urgency tiering', 'Proactive push alerts']
    },
    {
      id: 'calendar',
      title: 'Adaptive Schedule Defense',
      tagline: 'Calendar Sync',
      description: 'Protect your peak creative hours. NEXORA analyzes meeting density, clusters appointments, and automatically carves out uninterrupted focus blocks.',
      icon: Calendar,
      color: 'bg-white',
      actionUrl: '/calendar',
      badge: 'Focus First',
      details: ['Multi-calendar integration', 'Automatic focus time allocation', 'Meeting prep dossiers']
    },
    {
      id: 'tasks',
      title: 'High-Impact Priority Matrix',
      tagline: 'Task Engine',
      description: 'Move past infinite backlog anxiety. Organize tasks by urgency and impact with quick status updates, subtasks, and deadline tracking.',
      icon: CheckSquare,
      color: 'bg-white',
      actionUrl: '/tasks',
      badge: 'Execution',
      details: ['Keyboard-driven workflow', 'Due date timeline view', 'One-click completion']
    },
    {
      id: 'email',
      title: 'Action Item Distillation',
      tagline: 'Email Assistant',
      description: 'Cut through unread noise. NEXORA extracts obligations, meeting invites, and pending approvals from your inbox into actionable tasks.',
      icon: Mail,
      color: 'bg-nb-yellow',
      actionUrl: '/email',
      badge: 'Zero Inbox',
      details: ['Thread action extraction', 'Fast draft generation', 'Sender priority scoring']
    },
    {
      id: 'planner',
      title: 'Morning Brief & Day Planner',
      tagline: 'Daily Planning',
      description: 'Start every morning with an intentional roadmap. Review energy demands, optimize task ordering, and achieve realistic daily closure.',
      icon: Compass,
      color: 'bg-nb-sage',
      actionUrl: '/dashboard',
      badge: 'Intentional',
      details: ['Daily agenda briefing', 'Energy allocation estimates', 'End-of-day retrospectives']
    },
  ];

  return (
    <section id="features" className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-black scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b-2 border-black gap-6">
          <div className="max-w-2xl">
            <div className="inline-block bg-nb-yellow border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 shadow-[2px_2px_0px_#000000]">
              CORE ARCHITECTURE
            </div>
            <h2 className="font-cabinet text-3xl sm:text-4xl md:text-5xl font-black text-nb-charcoal uppercase tracking-tight leading-none">
              Engineered for absolute personal clarity
            </h2>
            <p className="font-satoshi text-base sm:text-lg text-neutral-700 mt-4 leading-relaxed">
              Six dedicated productivity engines synchronized under one cohesive Neo-Brutalist interface. Zero clutter, zero fluff.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/dashboard"
              className="nb-btn inline-flex items-center gap-2 bg-black text-white px-5 py-3 border-2 border-black font-cabinet font-black text-sm uppercase tracking-wider shadow-hard"
            >
              Open Live App <ArrowUpRight className="w-4 h-4 text-nb-yellow" />
            </Link>
          </div>
        </div>

        {/* 6-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="group bg-white border-2 border-black p-6 sm:p-7 shadow-hard hover:shadow-hard-lg hover:-translate-y-1 transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 ${feat.color} border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]`}>
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <span className="font-cabinet text-[11px] font-black uppercase px-2.5 py-1 bg-neutral-100 border border-black text-neutral-800 tracking-wider">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Subtitle tag & Title */}
                  <div className="mb-3">
                    <span className="font-satoshi text-xs font-black text-neutral-500 uppercase tracking-widest block mb-1">
                      {feat.tagline}
                    </span>
                    <h3 className="font-cabinet font-black text-xl text-nb-charcoal leading-snug group-hover:text-black">
                      {feat.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-satoshi text-sm text-neutral-700 leading-relaxed mb-6 font-medium">
                    {feat.description}
                  </p>

                  {/* Checklist items */}
                  <div className="space-y-2 mb-6 pt-4 border-t-2 border-black/10">
                    {feat.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                        <span className="w-1.5 h-1.5 bg-black rounded-none shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t-2 border-black flex items-center justify-between">
                  <span className="font-cabinet text-xs font-black uppercase text-neutral-600">
                    Live Component
                  </span>
                  <Link
                    href={feat.actionUrl}
                    className="inline-flex items-center gap-1 font-cabinet font-black text-xs uppercase tracking-wider text-black group-hover:underline"
                  >
                    Launch <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
