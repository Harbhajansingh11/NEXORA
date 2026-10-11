'use client';

import React, { useState } from 'react';
import { Archive, Trash2, Search, Send, Sparkles, Reply } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function EmailPage() {
  const { emails, markEmailAsRead, archiveEmail, deleteEmail, sendEmailReply } = useApp();
  const [selectedEmailId, setSelectedEmailId] = useState<string>(emails[0]?.id || '');
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [draftReplyText, setDraftReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || emails[0];

  const filteredEmails = emails.filter((e) => {
    if (filter === 'unread' && !e.unread) return false;
    if (filter === 'high' && e.priority !== 'high') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return e.subject.toLowerCase().includes(q) || e.sender.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q);
    }
    return true;
  });

  const unreadCount = emails.filter((e) => e.unread).length;

  const quickSnippets = [
    "Approved. Proceed with the Monday rollout staging schedule.",
    "Acknowledged. Thanks for keeping latency within threshold.",
    "Please share the updated benchmark telemetry report before sync."
  ];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftReplyText.trim() || !selectedEmail) return;

    sendEmailReply(selectedEmail.id, draftReplyText);
    setDraftReplyText('');
    setIsReplying(false);
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3.5">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary">
            Executive Email Stream
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            {unreadCount} unread prioritized threads distilled by NEXORA
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-border self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-surface-elevated text-content-primary font-semibold'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            All ({emails.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-surface-elevated text-content-primary font-semibold'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === 'high'
                ? 'bg-surface-elevated text-content-primary font-semibold'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            High Priority
          </button>
        </div>
      </div>

      {/* Main Mail Viewer (Split List / Reader Pane) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Email Stream List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-content-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search executive inbox..."
              className="w-full h-8 pl-8 pr-3 text-xs bg-surface border border-border rounded-lg text-content-primary placeholder:text-content-dim focus:outline-none focus:border-brand-purple"
            />
          </div>

          <div className="rounded-xl bg-surface border border-border divide-y divide-border/60 overflow-hidden">
            {filteredEmails.length === 0 ? (
              <div className="py-12 text-center text-xs text-content-muted">
                No email threads match criteria.
              </div>
            ) : (
              filteredEmails.map((email) => {
                const isSelected = selectedEmail?.id === email.id;
                return (
                  <div
                    key={email.id}
                    onClick={() => {
                      setSelectedEmailId(email.id);
                      markEmailAsRead(email.id);
                      setIsReplying(false);
                    }}
                    className={`p-3.5 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-surface-elevated border-l-2 border-l-brand-purple'
                        : 'hover:bg-surface-elevated/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        {email.unread && (
                          <span className="h-2 w-2 rounded-full bg-brand-cyan flex-shrink-0" title="Unread" />
                        )}
                        <span className="text-xs font-medium text-content-primary truncate">
                          {email.sender}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-content-dim flex-shrink-0">
                        {email.time}
                      </span>
                    </div>

                    <h2 className="text-xs font-normal text-content-primary truncate mb-1">
                      {email.subject}
                    </h2>

                    <p className="text-[11px] text-content-muted line-clamp-2 leading-relaxed">
                      {email.summary}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Email Detailed View (7 cols) */}
        <div className="lg:col-span-7 rounded-xl bg-surface border border-border p-4 sm:p-5 space-y-4">
          {selectedEmail ? (
            <>
              <div className="flex items-start justify-between pb-3.5 border-b border-border">
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-semibold text-content-primary mb-1 leading-snug">
                    {selectedEmail.subject}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-content-secondary">
                    <span className="font-medium text-content-primary">{selectedEmail.sender}</span>
                    <span className="text-content-dim font-mono text-[11px]">&lt;{selectedEmail.senderEmail}&gt;</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-content-dim flex-shrink-0 ml-2">{selectedEmail.time}</span>
              </div>

              {/* Distilled Summary Callout */}
              <div className="p-3 rounded-lg bg-surface-elevated border border-border text-xs text-content-primary leading-relaxed">
                <div className="flex items-center gap-1.5 font-medium text-brand-purple mb-1">
                  <Sparkles className="h-3 w-3" />
                  <span>NEXORA AI Distillation</span>
                </div>
                <p className="text-content-secondary text-[11px] sm:text-xs">
                  {selectedEmail.summary}
                </p>
              </div>

              {/* Email Body */}
              <div className="text-xs sm:text-sm text-content-secondary leading-relaxed space-y-3 pt-1">
                <p>Hello Alexander,</p>
                <p>
                  Following up on our discussions regarding the architectural updates, we have incorporated all the feedback from your previous review session. The proposed topology meets all redundancy criteria and stays within the allocated budget thresholds.
                </p>
                <p>
                  Please let us know if you require any additional benchmark reports ahead of Monday’s staging rollout.
                </p>
                <p className="pt-2 text-content-dim text-xs">
                  Best regards,<br />
                  <strong className="text-content-secondary font-medium">{selectedEmail.sender}</strong>
                </p>
              </div>

              {/* Interactive Reply Draft Box */}
              {isReplying ? (
                <form onSubmit={handleSendReply} className="pt-2 space-y-2.5 animate-dropdown">
                  <div className="text-[11px] text-content-muted flex items-center justify-between">
                    <span>Drafting response to {selectedEmail.sender}</span>
                    <span>Press Send when ready</span>
                  </div>

                  {/* AI Quick Reply Snippets */}
                  <div className="flex flex-wrap gap-1.5">
                    {quickSnippets.map((snippet, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setDraftReplyText(snippet)}
                        className="text-[11px] px-2 py-1 rounded bg-surface-elevated border border-border text-content-secondary hover:text-content-primary hover:border-brand-purple/40 text-left transition-colors"
                      >
                        {snippet}
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={draftReplyText}
                    onChange={(e) => setDraftReplyText(e.target.value)}
                    placeholder="Type response or select a quick snippet above..."
                    rows={3}
                    autoFocus
                    className="w-full p-2.5 text-xs bg-surface-elevated border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple placeholder:text-content-dim"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsReplying(false)}
                      className="px-3 py-1 rounded-md text-xs text-content-muted hover:text-content-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!draftReplyText.trim()}
                      className="px-3.5 py-1 rounded-md bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-40 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="h-3 w-3" />
                      <span>Send Reply</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Action Buttons */
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <button
                    onClick={() => setIsReplying(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Reply className="h-3.5 w-3.5" />
                    <span>Reply</span>
                  </button>

                  <div className="flex gap-1 text-content-dim">
                    <button
                      onClick={() => archiveEmail(selectedEmail.id)}
                      className="p-1.5 rounded-lg hover:bg-surface-elevated hover:text-content-primary transition-colors"
                      aria-label="Archive thread"
                      title="Archive thread"
                    >
                      <Archive className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteEmail(selectedEmail.id)}
                      className="p-1.5 rounded-lg hover:bg-surface-elevated hover:text-rose-400 transition-colors"
                      aria-label="Delete thread"
                      title="Delete thread"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-content-muted text-xs">
              Select an email thread to inspect.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
