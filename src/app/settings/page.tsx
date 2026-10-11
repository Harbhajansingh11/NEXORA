'use client';

import React, { useState } from 'react';
import { User, Sparkles, Moon, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function SettingsPage() {
  const { userProfile, updateUserProfile, showToast } = useApp();

  const [userName, setUserName] = useState(userProfile.name);
  const [userEmail, setUserEmail] = useState(userProfile.email);
  const [userTitle, setUserTitle] = useState(userProfile.title);
  const [timezone, setTimezone] = useState('America/Los_Angeles (PST)');
  const [emailBriefsEnabled, setEmailBriefsEnabled] = useState(true);
  const [calendarDefenseEnabled, setCalendarDefenseEnabled] = useState(true);
  const [defenseLevel, setDefenseLevel] = useState<'strict' | 'balanced' | 'relaxed'>('strict');
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: userName,
      email: userEmail,
      title: userTitle
    });
    setSavedBanner(true);
    showToast('Preferences saved successfully');
    setTimeout(() => {
      setSavedBanner(false);
    }, 2800);
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3.5">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            Manage your account identity, AI autonomy, and local workspace options
          </p>
        </div>

        {savedBanner && (
          <div className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-1.5 animate-dropdown">
            <Check className="h-3.5 w-3.5" />
            <span>Preferences saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Profile Details Section */}
        <div className="rounded-xl bg-surface border border-border p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <User className="h-4 w-4 text-brand-purple" />
            <h2 className="text-sm font-semibold text-content-primary">Profile Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-content-secondary mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full h-9 px-3 text-xs sm:text-sm bg-surface-elevated border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-content-secondary mb-1">
                Primary Email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full h-9 px-3 text-xs sm:text-sm bg-surface-elevated border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-content-secondary mb-1">
                Role / Title
              </label>
              <input
                type="text"
                value={userTitle}
                onChange={(e) => setUserTitle(e.target.value)}
                className="w-full h-9 px-3 text-xs sm:text-sm bg-surface-elevated border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-content-secondary mb-1">
                Workspace Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-surface-elevated border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
              >
                <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Autonomy & Scheduling Preferences */}
        <div className="rounded-xl bg-surface border border-border p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Sparkles className="h-4 w-4 text-brand-purple" />
            <h2 className="text-sm font-semibold text-content-primary">Autonomous Behavior</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated/40 border border-border">
              <div>
                <div className="text-xs sm:text-sm font-medium text-content-primary">Daily Morning Briefings</div>
                <div className="text-[11px] text-content-muted">Pre-synthesizes schedule, tasks, and priority messages at 7:00 AM</div>
              </div>
              <button
                type="button"
                onClick={() => setEmailBriefsEnabled(!emailBriefsEnabled)}
                className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${
                  emailBriefsEnabled ? 'bg-brand-purple' : 'bg-surface border border-border'
                }`}
                aria-label="Toggle daily briefings"
              >
                <div
                  className={`h-3.5 w-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                    emailBriefsEnabled ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated/40 border border-border">
              <div>
                <div className="text-xs sm:text-sm font-medium text-content-primary">Calendar Focus Defense</div>
                <div className="text-[11px] text-content-muted">Guards scheduled deep-work blocks against conflicting incoming meeting invites</div>
              </div>
              <button
                type="button"
                onClick={() => setCalendarDefenseEnabled(!calendarDefenseEnabled)}
                className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${
                  calendarDefenseEnabled ? 'bg-brand-purple' : 'bg-surface border border-border'
                }`}
                aria-label="Toggle calendar defense"
              >
                <div
                  className={`h-3.5 w-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                    calendarDefenseEnabled ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {calendarDefenseEnabled && (
              <div className="p-3 rounded-lg bg-surface-elevated/20 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-medium text-content-primary">Defense Sensitivity</div>
                  <div className="text-[11px] text-content-muted">How strictly NEXORA defends 2+ hour focus blocks</div>
                </div>

                <div className="flex items-center gap-1">
                  {(['strict', 'balanced', 'relaxed'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDefenseLevel(lvl)}
                      className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                        defenseLevel === lvl
                          ? 'bg-brand-purple text-white font-medium'
                          : 'bg-surface-elevated text-content-muted hover:text-content-primary'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Workspace Appearance */}
        <div className="rounded-xl bg-surface border border-border p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Moon className="h-4 w-4 text-brand-cyan" />
            <h2 className="text-sm font-semibold text-content-primary">Appearance & Motion</h2>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-surface-elevated/40 border border-border flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm font-medium text-content-primary">Color Theme</div>
                <div className="text-[11px] text-content-muted">NEXORA dark navy identity with restrained purple accents</div>
              </div>
              <span className="text-xs font-mono text-content-muted bg-surface-elevated px-2 py-0.5 rounded border border-border">
                Dark Navy (Default)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-surface-elevated/40 border border-border flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm font-medium text-content-primary">Reduced Motion</div>
                <div className="text-[11px] text-content-muted">Transitions adapt automatically to your operating system preferences</div>
              </div>
              <span className="text-xs font-mono text-content-muted bg-surface-elevated px-2 py-0.5 rounded border border-border">
                System Default
              </span>
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
