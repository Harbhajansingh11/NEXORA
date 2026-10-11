'use client';

import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  Search
} from 'lucide-react';
import { FocusTask } from '@/types/dashboard';
import { useApp } from '@/context/AppContext';

export default function TasksPage() {
  const { tasks, toggleTask, deleteTask, addTask } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [taskSearch, setTaskSearch] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Frontend');
  const [newTaskPriority, setNewTaskPriority] = useState<FocusTask['priority']>('high');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask(newTaskTitle, newTaskCategory, newTaskPriority, 'Today, 7:00 PM');
    setNewTaskTitle('');
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
    if (taskSearch.trim() && !t.title.toLowerCase().includes(taskSearch.toLowerCase())) return false;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3.5">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary">
            Tasks Matrix
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            {completedCount} of {tasks.length} commitments completed
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-border self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-surface-elevated text-content-primary font-semibold'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-surface-elevated text-content-primary font-semibold'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            Pending ({tasks.length - completedCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-surface-elevated text-content-primary font-semibold'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {/* Add New Task Inline Input */}
      <div className="rounded-xl bg-surface border border-border p-3 sm:p-4">
        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task commitment..."
            className="flex-1 h-9 px-3.5 text-xs sm:text-sm bg-surface-elevated border border-border rounded-lg text-content-primary placeholder:text-content-dim focus:outline-none focus:border-brand-purple"
          />

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="h-9 px-2 text-xs bg-surface-elevated border border-border rounded-lg text-content-secondary focus:outline-none focus:border-brand-purple"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Accessibility">Accessibility</option>
              <option value="AI Workflow">AI Workflow</option>
              <option value="Architecture">Architecture</option>
            </select>

            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as FocusTask['priority'])}
              className="h-9 px-2 text-xs bg-surface-elevated border border-border rounded-lg text-content-secondary focus:outline-none focus:border-brand-purple"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <button
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="h-9 px-3.5 rounded-lg bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-40 text-white text-xs font-medium flex items-center gap-1 transition-colors flex-shrink-0"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-content-muted" />
          <input
            type="text"
            value={taskSearch}
            onChange={(e) => setTaskSearch(e.target.value)}
            placeholder="Filter matrix tasks..."
            className="w-full h-8 pl-8 pr-3 text-xs bg-surface border border-border rounded-lg text-content-primary placeholder:text-content-dim focus:outline-none focus:border-brand-purple"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-content-muted">
          <span>Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-8 px-2 text-xs bg-surface border border-border rounded-lg text-content-secondary focus:outline-none focus:border-brand-purple"
          >
            <option value="all">All Categories</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Accessibility">Accessibility</option>
            <option value="AI Workflow">AI Workflow</option>
            <option value="Architecture">Architecture</option>
          </select>
        </div>
      </div>

      {/* Tasks List (Clean rows) */}
      <div className="rounded-xl bg-surface border border-border divide-y divide-border/60">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-content-muted text-xs">
            No tasks found in this view.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.completed;
            return (
              <div
                key={task.id}
                className={`p-3.5 flex items-center justify-between gap-3 transition-colors ${
                  isDone ? 'opacity-60' : 'hover:bg-surface-elevated/40'
                }`}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
                >
                  <button
                    type="button"
                    aria-label={`Toggle task completion`}
                    className="mt-0.5 flex-shrink-0 text-content-muted hover:text-brand-purple transition-colors p-0.5"
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 animate-task-check" />
                    ) : (
                      <Circle className="h-4 w-4 text-content-muted" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <span
                      className={`text-xs sm:text-sm ${
                        isDone ? 'line-through text-content-muted' : 'text-content-primary'
                      }`}
                    >
                      {task.title}
                    </span>

                    <div className="flex flex-wrap items-center gap-2.5 mt-1 text-[11px] text-content-muted">
                      <span className="text-content-secondary font-medium">
                        {task.category}
                      </span>
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
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                  className="text-content-dim hover:text-rose-400 p-1.5 rounded-lg hover:bg-surface-subtle transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
