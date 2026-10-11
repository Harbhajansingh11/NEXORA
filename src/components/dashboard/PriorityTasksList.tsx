'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Circle, Clock, Plus, Trash2, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const PriorityTasksList: React.FC = () => {
  const { tasks, toggleTask, deleteTask, addTask } = useApp();
  const [isAddingInline, setIsAddingInline] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');

  const completedCount = tasks.filter((t) => t.completed).length;

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(newTitle, newCategory, 'high');
    setNewTitle('');
    setIsAddingInline(false);
  };

  return (
    <section aria-labelledby="today-focus-heading" className="rounded-xl bg-surface border border-border p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h2 id="today-focus-heading" className="text-sm sm:text-base font-semibold text-content-primary">
            Today&apos;s Focus
          </h2>
          <p className="text-[11px] sm:text-xs text-content-muted">
            {completedCount} of {tasks.length} commitments completed
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isAddingInline ? (
            <button
              onClick={() => setIsAddingInline(true)}
              className="text-xs text-brand-purple hover:text-brand-purple-hover font-medium flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-surface-elevated"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add task</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAddingInline(false)}
              className="text-xs text-content-muted hover:text-content-primary p-1 rounded"
              aria-label="Cancel adding task"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          <Link
            href="/tasks"
            className="text-xs text-content-muted hover:text-content-primary flex items-center gap-1 transition-colors px-1 py-0.5"
          >
            <span>Matrix</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Inline Quick Add Row */}
      {isAddingInline && (
        <form onSubmit={handleInlineSubmit} className="mt-3 p-2.5 rounded-lg bg-surface-elevated border border-border animate-dropdown flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Type priority task and press Enter..."
            autoFocus
            className="flex-1 h-8 px-2.5 text-xs bg-surface border border-border rounded-md text-content-primary placeholder:text-content-dim focus:outline-none focus:border-brand-purple"
          />

          <div className="flex items-center gap-1.5 justify-end">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="h-8 px-2 text-[11px] bg-surface border border-border rounded-md text-content-secondary focus:outline-none focus:border-brand-purple"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Architecture">Architecture</option>
              <option value="Accessibility">Accessibility</option>
            </select>

            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="h-8 px-3 rounded-md bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-40 text-white text-xs font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      )}

      {/* Task List (Clean rows, minimal styling) */}
      <div className="divide-y divide-border/60 mt-1">
        {tasks.length === 0 ? (
          <div className="py-8 text-center text-xs text-content-muted">
            No focus tasks scheduled for today.
          </div>
        ) : (
          tasks.map((task) => {
            const isDone = task.completed;
            return (
              <div
                key={task.id}
                className={`py-2.5 sm:py-3 flex items-start gap-3 group transition-colors duration-150 px-1 -mx-1 rounded-lg ${
                  isDone ? 'opacity-60' : 'hover:bg-surface-elevated/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={`Mark task "${task.title}" as ${isDone ? 'incomplete' : 'complete'}`}
                  className="mt-0.5 text-content-muted group-hover:text-brand-purple transition-colors p-0.5 flex-shrink-0"
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 animate-task-check" />
                  ) : (
                    <Circle className="h-4 w-4 text-content-muted group-hover:text-brand-purple" />
                  )}
                </button>

                <div
                  onClick={() => toggleTask(task.id)}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <div
                    className={`text-xs sm:text-sm leading-snug transition-all ${
                      isDone ? 'line-through text-content-muted' : 'text-content-primary'
                    }`}
                  >
                    {task.title}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-content-muted">
                    <span className="text-content-secondary font-medium">{task.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-content-dim" />
                      <span className="font-mono">{task.dueDate}</span>
                    </span>
                    {task.priority === 'urgent' && (
                      <>
                        <span>•</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
                          Urgent
                        </span>
                      </>
                    )}
                    {task.priority === 'high' && (
                      <>
                        <span>•</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                          High
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete task "${task.title}"`}
                  className="text-content-dim hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer link to dedicated tasks matrix */}
      <div className="pt-2.5 border-t border-border mt-2 flex justify-between items-center text-[11px] text-content-muted">
        <span>{tasks.filter(t => !t.completed).length} pending</span>
        <Link
          href="/tasks"
          className="text-content-secondary hover:text-content-primary flex items-center gap-1 group transition-colors"
        >
          <span>Open Full Matrix</span>
          <ArrowRight className="h-3 w-3 text-content-dim group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
};
