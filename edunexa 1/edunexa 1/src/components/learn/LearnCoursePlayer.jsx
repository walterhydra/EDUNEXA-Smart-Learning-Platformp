import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Play, 
  Pause, 
  CheckCircle2, 
  Sparkles, 
  Code, 
  FileText, 
  HelpCircle, 
  Volume2, 
  RotateCcw, 
  ArrowRight,
  Download,
  Bookmark
} from 'lucide-react';

export const LearnCoursePlayer = () => {
  const { addXP, showToast, setActiveTab } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveLessonTab] = useState('notes');
  const [personalNotes, setPersonalNotes] = useState(
    "Key Takeaway: Promises queue their callbacks in the Microtask Queue, which drains before the browser executes the next Macrotask (e.g., setTimeout)."
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteLesson = () => {
    setIsCompleted(true);
    addXP(100, 'Completed Lesson: Async JavaScript & Event Loop Mastery');
    showToast('🎉 Lesson completed! +100 XP added to your profile.', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
            <span>Phase 1: Foundation</span>
            <span>•</span>
            <span>Module 1.2</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Async JavaScript, Event Loop & Microtasks Mastery
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Instructor: Dr. Sarah Lin (Lead Systems Architect) • 25 mins</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => showToast('🔖 Lesson bookmarked to your Study Resources!', 'info')}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
            title="Bookmark"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleCompleteLesson}
            disabled={isCompleted}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
              isCompleted 
                ? 'bg-emerald-600 text-white cursor-default' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Completed (XP Earned)' : 'Mark as Complete (+100 XP)'}
          </button>
        </div>
      </div>

      {/* Main Video Simulation & Media Player Container */}
      <div className="relative w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between p-6">
        {/* Animated Visual Canvas simulation */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-indigo-950/60 to-slate-900 flex items-center justify-center">
          <div className="text-center space-y-3 p-6 max-w-lg">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-300">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">
              Visualizing Call Stack vs Microtask Queue
            </h3>
            <p className="text-xs text-indigo-200/80 font-mono">
              [V8 Engine] Call Stack ➔ Web API ➔ Microtask Queue (Promise.then) ➔ Macrotask Queue (setTimeout)
            </p>
          </div>
        </div>

        {/* Top Floating Controls */}
        <div className="relative z-10 flex items-center justify-between text-white/80 text-xs">
          <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 font-mono">
            4K Ultra HD • AI Subtitles: English
          </span>
          <span className="px-2.5 py-1 bg-indigo-600/80 backdrop-blur-md text-white rounded-lg font-bold">
            Interactive Video
          </span>
        </div>

        {/* Bottom Floating Playback Bar */}
        <div className="relative z-10 space-y-2 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }}></div>
          </div>

          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 bg-white text-slate-900 rounded-lg hover:bg-indigo-50"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-900" />}
              </button>
              <span className="font-mono text-xs text-white/80">11:15 / 25:00</span>
            </div>

            <div className="flex items-center gap-2 text-white/80">
              <Volume2 className="w-4 h-4 cursor-pointer hover:text-white" />
              <span className="text-[11px] font-bold px-2 py-0.5 bg-white/10 rounded-md">1.0x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Interactive Workstation Tabs */}
      <div className="white-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          {[
            { id: 'notes', label: '📖 Comprehensive Lesson Notes', icon: FileText },
            { id: 'code', label: '💻 Interactive Code Examples', icon: Code },
            { id: 'quiz', label: '❓ Concept Check', icon: HelpCircle },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveLessonTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Comprehensive Notes */}
        {activeTab === 'notes' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900">Understanding Microtasks vs Macrotasks</h3>
            <p>
              In JavaScript, the Event Loop coordinates between the single-threaded Call Stack, Web APIs, and task queues. When asynchronous operations finish, their callbacks are routed based on priority:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Microtask Queue:</strong> Handles <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">Promise.then()</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">async/await</code> continuations, and <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">queueMicrotask()</code>. Runs immediately after the current call stack clears before any browser repaint.</li>
              <li><strong>Macrotask (Task) Queue:</strong> Handles <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">setTimeout</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">setInterval</code>, and DOM events. Executes one task per event loop tick.</li>
            </ul>

            {/* Student Notepad */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-bold text-slate-800">Your Personal AI-Synced Notes:</label>
              <textarea
                rows={3}
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Type your notes here..."
              />
              <p className="text-[11px] text-slate-400">Notes automatically save to your EduNexa cloud notebook.</p>
            </div>
          </div>
        )}

        {/* Tab 2: Code Snippets */}
        {activeTab === 'code' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600">Analyze the execution order in the code snippet below:</p>
            <pre className="p-4 bg-slate-900 text-indigo-200 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed">
{`console.log('1: Synchronous Script Start');

setTimeout(() => {
  console.log('4: Macrotask Callback (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Microtask Callback (Promise)');
});

console.log('2: Synchronous Script End');

// Expected Console Output Order:
// 1: Synchronous Script Start
// 2: Synchronous Script End
// 3: Microtask Callback (Promise)
// 4: Macrotask Callback (setTimeout)`}
            </pre>

            <button
              onClick={() => setActiveTab('practice-lab')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              Open in Live Practice Lab Sandbox <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab 3: Concept Check */}
        {activeTab === 'quiz' && (
          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
            <h4 className="text-xs font-bold text-indigo-900">Quick Check: Which runs first after the synchronous stack empties?</h4>
            <div className="space-y-2">
              {["setTimeout(() => {}, 0)", "Promise.resolve().then(() => {})", "requestAnimationFrame()"].map((ans, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === 1) {
                      addXP(25, 'Correct quick check answer');
                      showToast('✓ Exactly right! Microtasks always preempt macrotasks (+25 XP)', 'success');
                    } else {
                      showToast('Incorrect. Remember Promise callbacks reside in the high-priority Microtask queue.', 'error');
                    }
                  }}
                  className="w-full text-left p-2.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-xl text-xs font-medium text-slate-800 transition-colors"
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
