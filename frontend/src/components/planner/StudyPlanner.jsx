import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Sparkles, 
  Trash2, 
  Zap,
  Check,
  ChevronRight,
  Filter
} from 'lucide-react';

export const StudyPlanner = () => {
  const { user, plannerEvents, setPlannerEvents, togglePlannerEvent, showToast, addXP } = useApp();
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDay, setNewEventDay] = useState('Today');
  const [newEventTime, setNewEventTime] = useState('06:00 PM - 07:00 PM');
  const [newEventType, setNewEventType] = useState('Practice Lab');

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEvt = {
      id: `evt-${Date.now()}`,
      day: newEventDay,
      time: newEventTime,
      title: newEventTitle.trim(),
      type: newEventType,
      status: 'pending',
      color: 'border-l-indigo-500 bg-indigo-50/50'
    };

    setPlannerEvents(prev => [...prev, newEvt]);
    setNewEventTitle('');
    showToast('📅 Added new study event to your planner!', 'success');
  };

  const handleOptimizeAI = () => {
    showToast('✨ AI balanced your schedule to fit 1 hr/day study slots!', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2 border border-indigo-100">
            <Calendar className="w-3.5 h-3.5" /> AI Personalized Study Scheduler
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Study Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Paced for your <strong className="text-slate-900">{user.learningAvailability || '1 hour/day'}</strong> availability target. Complete tasks to earn consistency XP!
          </p>
        </div>

        <button
          onClick={handleOptimizeAI}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AI Auto-Reschedule
        </button>
      </div>

      {/* Main Grid: Schedule List + Add Event Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Scheduled Study Sessions (8 cols) */}
        <div className="lg:col-span-8 white-card p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Weekly Scheduled Sessions ({plannerEvents.length})</h2>
            <span className="text-xs text-slate-400">Click checkmark when completed</span>
          </div>

          <div className="space-y-3">
            {plannerEvents.map((evt) => {
              const isDone = evt.status === 'done';
              return (
                <div
                  key={evt.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isDone 
                      ? 'bg-slate-50 border-slate-200 opacity-60' 
                      : 'bg-white border-slate-200/90 hover:border-indigo-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => togglePlannerEvent(evt.id)}
                      className={`w-6 h-6 rounded-xl border flex items-center justify-center transition-colors ${
                        isDone 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'border-slate-300 hover:border-indigo-600 bg-white'
                      }`}
                    >
                      {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div>
                      <p className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {evt.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                        <span className="font-semibold text-indigo-600">{evt.day}</span>
                        <span>•</span>
                        <span>{evt.time}</span>
                        <span>•</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 text-[10px] font-medium">{evt.type}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {isDone ? 'Completed' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Quick Add Session Form (4 cols) */}
        <div className="lg:col-span-4 white-card p-6 rounded-3xl space-y-4 h-fit">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600" /> Add Custom Study Session
          </h3>

          <form onSubmit={handleAddEvent} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Session Title</label>
              <input
                type="text"
                required
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="e.g. Solve 3 LeetCode Mediums"
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Day of Week</label>
              <select
                value={newEventDay}
                onChange={(e) => setNewEventDay(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none"
              >
                <option>Today</option>
                <option>Tomorrow</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Time Window</label>
              <input
                type="text"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Activity Type</label>
              <select
                value={newEventType}
                onChange={(e) => setNewEventType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none"
              >
                <option>Practice Lab</option>
                <option>Course Video</option>
                <option>Skill Assessment</option>
                <option>Project Capstone</option>
                <option>AI Mentorship</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add to Study Schedule
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
