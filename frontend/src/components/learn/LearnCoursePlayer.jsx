import React, { useState, useRef, useEffect } from 'react';
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
  VolumeX,
  RotateCcw, 
  RotateCw,
  ArrowRight,
  Download,
  Bookmark,
  Video,
  Star,
  ThumbsUp,
  Heart,
  Maximize
} from 'lucide-react';
import demoVideo from '../../assets/b8bd4e4273cceae2889d9d259b04f732.mp4';

// Standard reliable sample video fallback URL in case of local asset browser codec limitations
const FALLBACK_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export const LearnCoursePlayer = () => {
  const { addXP, showToast, setActiveTab, user, markCourseCompleted } = useApp();
  const videoRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoSrc, setVideoSrc] = useState(demoVideo);
  const [hasError, setHasError] = useState(false);

  const [activeTab, setActiveLessonTab] = useState('notes');
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [teacherRating, setTeacherRating] = useState(null);
  const [personalNotes, setPersonalNotes] = useState(
    "Key Takeaway: Promises queue their callbacks in the Microtask Queue, which drains before the browser executes the next Macrotask (e.g., setTimeout)."
  );
  const [isCompleted, setIsCompleted] = useState(false);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Video play error:", err);
        if (videoSrc !== FALLBACK_VIDEO_URL) {
          setVideoSrc(FALLBACK_VIDEO_URL);
          showToast("Switching to standard HD stream...", "info");
        }
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    showToast(`Speed set to ${speed}x`, 'info');
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  const handleVideoError = () => {
    console.warn("Local video failed to load, switching to fallback sample video.");
    if (videoSrc !== FALLBACK_VIDEO_URL) {
      setVideoSrc(FALLBACK_VIDEO_URL);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec) || timeInSec === 0) return "00:00";
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleCompleteLesson = () => {
    setIsCompleted(true);
    if (markCourseCompleted) markCourseCompleted();
    addXP(100, 'Completed Lesson: Async JavaScript & Event Loop Mastery');
    showToast('🎉 Course Lesson completed! Verified Certificate unlocked in Achievements.', 'success');
  };

  const handleRateTeacher = (rating) => {
    setTeacherRating(rating);
    addXP(25, 'Evaluated Demo Class 1 Faculty');
    if (showToast) {
      showToast(`⭐ Recorded your faculty rating "${rating}". +25 XP awarded!`, 'success');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Demo Mode Selector Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-4 rounded-3xl border border-purple-700/50 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-500 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black font-satoshi text-white">
              {isDemoMode ? '📹 Demo Class - 1 Mode Active' : '📚 Full Course Lesson Mode'}
            </h3>
            <p className="text-xs text-purple-200 font-quicksand font-medium">
              {isDemoMode 
                ? 'Watching faculty sample video preview & teaching style evaluation.' 
                : 'Switch to Demo Class - 1 anytime to evaluate the teacher’s explanation style.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsDemoMode(!isDemoMode);
            setIsPlaying(false);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0 font-satoshi border ${
            isDemoMode
              ? 'bg-white text-purple-950 border-white hover:bg-slate-100'
              : 'bg-pink-500 hover:bg-pink-600 text-white border-pink-400'
          }`}
        >
          {isDemoMode ? 'Switch to Full Course' : '📹 Watch Demo Class - 1'}
        </button>
      </div>

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
            <span>{isDemoMode ? 'Demo Class - 1' : 'Phase 1: Foundation'}</span>
            <span>•</span>
            <span>{isDemoMode ? 'Faculty Sample Lesson' : 'Module 1.2'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {isDemoMode ? 'Demo Class - 1: Live Teaching & Faculty Sample Lesson' : 'Async JavaScript, Event Loop & Microtasks Mastery'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Instructor: Dr. Sarah Lin (Lead Systems Architect & Ex-Google Lead) • 15 mins</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => showToast('🔖 Lesson bookmarked to your Study Resources!', 'info')}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
            title="Bookmark"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleCompleteLesson}
            disabled={isCompleted}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer ${
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
      <div className="relative w-full aspect-video bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between p-2 sm:p-4 group">
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={handleVideoError}
          className="w-full h-full object-cover rounded-2xl cursor-pointer"
          onClick={togglePlay}
        />

        {/* Big Center Play Button Overlay (When Paused) */}
        {!isPlaying && (
          <div 
            onClick={togglePlay}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-all z-20 hover:bg-black/30"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl border border-white/20 transform transition-transform hover:scale-110 active:scale-95">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Top Floating Info Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white/90 text-xs pointer-events-none">
          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 font-mono font-bold shadow-md">
            {isDemoMode ? '📹 Demo Preview (Faculty Evaluation)' : '4K Ultra HD • AI Subtitles: English'}
          </span>
          <span className="px-3 py-1.5 bg-indigo-600/90 backdrop-blur-md text-white rounded-xl font-black shadow-md font-satoshi">
            EduNexa Video Player
          </span>
        </div>

        {/* Custom Video Control Dock */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 space-y-2.5 shadow-2xl">
          {/* Progress Slider */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 accent-indigo-500 rounded-lg cursor-pointer transition-all hover:h-2"
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs">
            {/* Left Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={togglePlay}
                className="p-2 bg-white text-slate-950 rounded-xl hover:bg-indigo-100 transition-all cursor-pointer font-bold shadow-sm"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
              </button>

              <button
                onClick={() => handleSkip(-10)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer hidden sm:block"
                title="Rewind 10s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSkip(10)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer hidden sm:block"
                title="Forward 10s"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs text-white/90 font-semibold tracking-wide">
                {formatTime(currentTime)} / {formatTime(duration || 1500)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3 text-white/90">
              <button
                onClick={toggleMute}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Speed Buttons */}
              <div className="flex items-center bg-white/10 rounded-xl p-0.5 border border-white/10">
                {[1, 1.25, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => handleSpeedChange(spd)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                      playbackSpeed === spd 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={handleFullscreen}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TEACHER EVALUATION FEEDBACK CARD */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 text-white p-5 rounded-3xl border border-purple-700/50 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold font-satoshi text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-bounce" /> Faculty Teaching Method Evaluator
            </h4>
            <span className="text-[10px] font-bold px-2.5 py-1 bg-pink-500/20 text-pink-300 border border-pink-500/30 rounded-full font-satoshi">
              +25 XP Reward
            </span>
          </div>

          <p className="text-xs text-purple-200 font-quicksand font-medium">
            Did you enjoy the explanation style & pace of Dr. Sarah Lin in this Demo Class - 1 video?
          </p>

          {teacherRating ? (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-2 font-satoshi">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Feedback recorded ("{teacherRating}")! Saved to your learning preferences (+25 XP).</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {[
                { label: '😍 Loved It! (100% Match)', val: 'Loved It' },
                { label: '👍 Clear & Good Pace', val: 'Clear & Good Pace' },
                { label: '👌 Satisfactory', val: 'Satisfactory' },
                { label: '👎 Needs Slower Pace', val: 'Needs Slower Pace' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleRateTeacher(opt.val)}
                  className="p-2.5 bg-white/10 hover:bg-pink-600/80 text-white rounded-xl text-xs font-bold transition-all border border-white/10 hover:border-pink-400 cursor-pointer text-center font-satoshi active:scale-95"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

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
