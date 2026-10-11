'use client';

import React, { useState } from 'react';
import { Play, Pause, Clock, RotateCw, Plus, X, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AutomationsPage() {
  const { automations, toggleAutomation, runAutomation, showToast } = useApp();
  const [runningId, setRunningId] = useState<string | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleRunNow = (id: string) => {
    setRunningId(id);
    setTimeout(() => {
      runAutomation(id);
      setRunningId(null);
    }, 400);
  };

  const activeCount = automations.filter((a) => a.status === 'active').length;

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3.5">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary">
            Autonomous Workflows
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            {activeCount} active background routines guarding your schedule and focus
          </p>
        </div>

        <button
          onClick={() => setShowTemplateModal(true)}
          className="h-8 px-3 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Workflow</span>
        </button>
      </div>

      {/* Automations List (Clean cards with subtle borders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map((item) => {
          const isActive = item.status === 'active';
          const isRunning = runningId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-xl bg-surface border border-border p-4 flex flex-col justify-between transition-colors hover:border-border-strong"
            >
              <div>
                <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-border mb-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full flex-shrink-0 ${
                        isActive ? 'bg-emerald-400' : 'bg-content-dim'
                      }`}
                    />
                    <h2 className="text-xs sm:text-sm font-semibold text-content-primary leading-tight">
                      {item.name}
                    </h2>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border capitalize flex-shrink-0 ${
                      isActive
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium'
                        : 'border-border bg-surface-elevated text-content-muted'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-content-secondary leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-border flex items-center justify-between text-xs text-content-muted">
                <span className="flex items-center gap-1 font-mono text-[11px] text-content-dim">
                  <Clock className="h-3 w-3" />
                  <span>{item.lastTriggered}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleRunNow(item.id)}
                    disabled={isRunning}
                    className="px-2.5 py-1 rounded-md border border-border hover:bg-surface-elevated text-content-secondary hover:text-content-primary text-xs font-medium flex items-center gap-1 transition-colors"
                    title="Execute workflow immediately"
                  >
                    <RotateCw className={`h-3 w-3 ${isRunning ? 'animate-spin text-brand-purple' : ''}`} />
                    <span>Run</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleAutomation(item.id)}
                    className={`px-2.5 py-1 rounded-md border text-xs font-medium flex items-center gap-1 transition-colors ${
                      isActive
                        ? 'bg-surface-elevated hover:bg-surface-hover text-content-secondary border-border'
                        : 'bg-brand-purple hover:bg-brand-purple-hover text-white border-brand-purple'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Pause className="h-3 w-3" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="rounded-xl bg-surface-elevated border border-border p-5 max-w-md w-full shadow-modal">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-semibold text-content-primary">Workflow Templates</h3>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-content-muted hover:text-content-primary p-1"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-content-secondary mb-3">
              Select an autonomous routine to enable in your NEXORA workspace:
            </p>

            <div className="space-y-2 text-xs">
              <div
                onClick={() => {
                  showToast('Added: Weekly Focus Retrospective');
                  setShowTemplateModal(false);
                }}
                className="p-3 rounded-lg bg-surface border border-border hover:border-brand-purple/40 cursor-pointer transition-colors"
              >
                <div className="font-medium text-content-primary flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-brand-purple" />
                  <span>Weekly Focus Retrospective</span>
                </div>
                <div className="text-[11px] text-content-muted mt-1">
                  Computes defended hours vs meeting interruptions every Friday at 5:00 PM.
                </div>
              </div>

              <div
                onClick={() => {
                  showToast('Added: Staging Health Sentinel');
                  setShowTemplateModal(false);
                }}
                className="p-3 rounded-lg bg-surface border border-border hover:border-brand-purple/40 cursor-pointer transition-colors"
              >
                <div className="font-medium text-content-primary flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-brand-cyan" />
                  <span>Staging Deploy Health Sentinel</span>
                </div>
                <div className="text-[11px] text-content-muted mt-1">
                  Polls telemetry canaries for latency deviations after production merges.
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-border mt-4">
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="px-3 py-1.5 rounded-lg border border-border text-xs text-content-secondary hover:text-content-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
