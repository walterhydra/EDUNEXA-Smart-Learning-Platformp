import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Sparkles, 
  BrainCircuit, 
  Code2, 
  Database, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Tv,
  HelpCircle,
  Zap,
  BookOpen,
  Sliders,
  Maximize2
} from 'lucide-react';

export const AnimationStudy = () => {
  const { addXP, showToast } = useApp();

  const [activeModule, setActiveModule] = useState('sorting');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // 1. DATA STRUCTURES & ALGORITHMS ANIMATION STATE (QuickSort Array)
  const [sortArray, setSortArray] = useState([45, 12, 89, 34, 67, 23, 91, 56]);
  const [highlightIndices, setHighlightIndices] = useState([0, 1]);

  // ANIMATION STUDY MODULES DEFINITION
  const STUDY_MODULES = [
    {
      id: 'sorting',
      title: 'QuickSort & Array Motion',
      category: 'Data Structures & Algorithms',
      icon: Code2,
      color: 'from-indigo-600 to-blue-600',
      totalSteps: 6,
      description: 'Visualize recursive array partitioning, pivot selection, and element swapping in real-time motion.',
      codeSnippet: `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high); // Pivot Index
    quickSort(arr, low, pi - 1);        // Left Subarray
    quickSort(arr, pi + 1, high);       // Right Subarray
  }
}`
    },
    {
      id: 'neural',
      title: 'Neural Network Tensor Flow',
      category: 'Artificial Intelligence & Deep Learning',
      icon: BrainCircuit,
      color: 'from-purple-600 to-pink-600',
      totalSteps: 5,
      description: 'Observe forward propagation impulse pulses through input, hidden, and activation layers.',
      codeSnippet: `def forward_pass(X, W1, W2):
  Z1 = np.dot(X, W1) + b1
  A1 = relu(Z1)                 # Hidden Layer Activation
  Z2 = np.dot(A1, W2) + b2
  return softmax(Z2)             # Output Class Probabilities`
    },
    {
      id: 'eventloop',
      title: 'JS Event Loop & Async Motion',
      category: 'Web Architecture & Runtimes',
      icon: Layers,
      color: 'from-amber-600 to-orange-600',
      totalSteps: 6,
      description: 'Trace non-blocking async execution between Call Stack, Web API timers, Microtasks, and Event Loop.',
      codeSnippet: `console.log('Start');
setTimeout(() => console.log('Timeout Task'), 0);
Promise.resolve().then(() => console.log('Microtask'));
console.log('End');
// Output Order: Start -> End -> Microtask -> Timeout Task`
    },
    {
      id: 'btree',
      title: 'B-Tree Index Query Motion',
      category: 'Database Architecture',
      icon: Database,
      color: 'from-emerald-600 to-teal-600',
      totalSteps: 5,
      description: 'Compare O(log N) indexed B-Tree search vs O(N) sequential table scan motion.',
      codeSnippet: `EXPLAIN ANALYZE 
SELECT * FROM users 
WHERE email = 'rahul@edunexa.edu';
-- Uses Index Scan on idx_users_email (Cost 0.15..8.17, 1 Row)`
    }
  ];

  // Automatic Step Advancement Timer
  useEffect(() => {
    let interval = null;
    const currentModObj = STUDY_MODULES.find(m => m.id === activeModule);

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % currentModObj.totalSteps;
          if (next === 0 && prev === currentModObj.totalSteps - 1) {
            if (!sessionCompleted) {
              setSessionCompleted(true);
              addXP(50, `Completed Animation Study: ${currentModObj.title}`);
              if (showToast) {
                showToast(`🎉 +50 XP! Animation Study session completed for ${currentModObj.title}!`, 'success');
              }
            }
          }
          return next;
        });

        // Mutate array indices for visual sorting motion
        if (activeModule === 'sorting') {
          setHighlightIndices([(currentStep * 2) % 8, (currentStep * 2 + 1) % 8]);
        }
      }, 2000 / speed);
    }

    return () => clearInterval(interval);
  }, [isPlaying, activeModule, currentStep, speed]);

  const handleModuleSelect = (modId) => {
    setActiveModule(modId);
    setCurrentStep(0);
    setIsPlaying(true);
    setSessionCompleted(false);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const activeModObj = STUDY_MODULES.find(m => m.id === activeModule);

  return (
    <div className="space-y-6 font-sans">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-400/30 font-satoshi">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>Interactive Visual Learning Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-satoshi tracking-tight">
            Animation Study Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-quicksand leading-relaxed">
            Understand complex computer science concepts, algorithms, neural networks, and event loops through step-by-step interactive 2D/3D motion visualization.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
            <div className="text-xs text-indigo-300 font-semibold font-satoshi">Session Reward</div>
            <div className="text-lg font-black text-amber-400 font-satoshi flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 fill-amber-400" /> +50 XP
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* MODULE SELECTION TABS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-satoshi">
        {STUDY_MODULES.map((mod) => {
          const IconComp = mod.icon;
          const isSelected = mod.id === activeModule;
          return (
            <button
              key={mod.id}
              onClick={() => handleModuleSelect(mod.id)}
              className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-white text-slate-900 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-r ${mod.color} shadow-xs`}>
                  <IconComp className="w-4 h-4" />
                </div>
                {isSelected && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                    Active Motion
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  {mod.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-satoshi leading-snug mt-0.5">
                  {mod.title}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* MAIN INTERACTIVE ANIMATION CANVAS AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT CANVAS (8 cols): Interactive Animation Screen */}
        <div className="lg:col-span-8 white-card p-6 rounded-3xl space-y-5 flex flex-col justify-between">
          
          {/* Canvas Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 font-satoshi">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                <Tv className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {activeModObj.title} Canvas
                </h3>
                <p className="text-[11px] text-slate-500 font-quicksand font-medium">
                  Step {currentStep + 1} of {activeModObj.totalSteps} • Motion Cycle Active
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                  isPlaying
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                title={isPlaying ? 'Pause Motion' : 'Play Motion'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                title="Restart Animation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Speed Selector */}
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="px-2.5 py-1.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 outline-none cursor-pointer"
              >
                <option value={0.5}>0.5x Speed</option>
                <option value={1}>1.0x Speed</option>
                <option value={1.5}>1.5x Speed</option>
                <option value={2}>2.0x Speed</option>
              </select>
            </div>
          </div>

          {/* VISUAL MOTION DISPLAY BOX */}
          <div className="relative min-h-[300px] bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-inner flex items-center justify-center overflow-hidden">
            
            {/* GRID BACKGROUND EFFECT */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* 1. QUICKSORT MOTION VISUALIZER */}
            {activeModule === 'sorting' && (
              <div className="w-full space-y-6 z-10">
                <div className="text-center text-xs text-indigo-300 font-mono">
                  Pivot Element: <span className="font-bold text-amber-400">Array[High] = {sortArray[sortArray.length - 1]}</span>
                </div>
                
                <div className="flex items-end justify-center gap-3 h-48 px-4">
                  {sortArray.map((val, idx) => {
                    const isHighlighted = highlightIndices.includes(idx);
                    const isPivot = idx === sortArray.length - 1;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[48px] group">
                        <span className="text-[10px] font-mono text-slate-400">{val}</span>
                        <div
                          style={{ height: `${val * 1.8}px` }}
                          className={`w-full rounded-t-xl transition-all duration-500 shadow-md ${
                            isPivot
                              ? 'bg-amber-400 ring-2 ring-amber-300 animate-pulse'
                              : isHighlighted
                              ? 'bg-indigo-500 ring-2 ring-indigo-300 scale-105'
                              : 'bg-slate-700'
                          }`}
                        />
                        <span className={`text-[9px] font-mono ${isHighlighted ? 'text-indigo-300 font-bold' : 'text-slate-500'}`}>
                          [{idx}]
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center text-xs font-mono text-indigo-200">
                  Step {currentStep + 1}: Comparing Array[{highlightIndices[0] || 0}] with Pivot ({sortArray[sortArray.length - 1]}). {highlightIndices[0] < 4 ? 'Element <= Pivot, Swap to Left Partition.' : 'Element > Pivot, Keep in Right Partition.'}
                </div>
              </div>
            )}

            {/* 2. NEURAL NETWORK IMPULSE VISUALIZER */}
            {activeModule === 'neural' && (
              <div className="w-full flex flex-col items-center gap-6 z-10 py-4">
                <div className="text-xs font-mono text-pink-300">
                  Forward Pass Impulse: Layer {currentStep % 3 + 1} Processing Activation...
                </div>

                <div className="flex items-center justify-between w-full max-w-lg">
                  {/* Input Layer */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-400 block text-center">Inputs</span>
                    {[1, 2, 3].map((node) => (
                      <div
                        key={node}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                          currentStep === 0
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg ring-4 ring-indigo-500/30 animate-pulse'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        X{node}
                      </div>
                    ))}
                  </div>

                  {/* Synapse Lines */}
                  <div className="flex-1 flex justify-center">
                    <div className="w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-pulse opacity-70" />
                  </div>

                  {/* Hidden Layer */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-slate-400 block text-center">Hidden (ReLU)</span>
                    {[1, 2, 3, 4].map((node) => (
                      <div
                        key={node}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                          currentStep === 1 || currentStep === 2
                            ? 'bg-purple-600 border-purple-400 text-white shadow-lg ring-4 ring-purple-500/30 animate-pulse'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        H{node}
                      </div>
                    ))}
                  </div>

                  {/* Synapse Lines */}
                  <div className="flex-1 flex justify-center">
                    <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse opacity-70" />
                  </div>

                  {/* Output Layer */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-400 block text-center">Output</span>
                    {[1, 2].map((node) => (
                      <div
                        key={node}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                          currentStep >= 3
                            ? 'bg-pink-600 border-pink-400 text-white shadow-lg ring-4 ring-pink-500/30 animate-pulse'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        Y{node}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center text-xs font-mono text-purple-200">
                  Step {currentStep + 1}: Computing Softmax Class Probabilities → [Y1: 0.89, Y2: 0.11]
                </div>
              </div>
            )}

            {/* 3. EVENT LOOP & CALL STACK VISUALIZER */}
            {activeModule === 'eventloop' && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 z-10 font-mono text-xs">
                
                {/* Call Stack */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-indigo-400 border-b border-slate-800 pb-1">
                    Call Stack (LIFO)
                  </div>
                  <div className="space-y-1.5 min-h-[90px] flex flex-col justify-end">
                    {currentStep === 0 && <div className="p-2 bg-indigo-600/80 text-white rounded-lg text-[10px]">main()</div>}
                    {currentStep === 1 && <div className="p-2 bg-amber-600/80 text-white rounded-lg text-[10px]">setTimeout(fn, 0)</div>}
                    {currentStep === 2 && <div className="p-2 bg-purple-600/80 text-white rounded-lg text-[10px]">Promise.then(fn)</div>}
                    {currentStep >= 3 && <div className="p-2 bg-emerald-600/80 text-white rounded-lg text-[10px]">console.log('Done')</div>}
                  </div>
                </div>

                {/* Web APIs & Task Queue */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-amber-400 border-b border-slate-800 pb-1">
                    Web APIs & Microtasks
                  </div>
                  <div className="space-y-1.5 min-h-[90px] flex flex-col justify-end">
                    {currentStep >= 1 && <div className="p-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-[10px]">Timer API (0ms)</div>}
                    {currentStep >= 2 && <div className="p-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-[10px]">Microtask: Promise</div>}
                  </div>
                </div>

                {/* Event Loop Queue */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400 border-b border-slate-800 pb-1">
                    Callback Queue (FIFO)
                  </div>
                  <div className="space-y-1.5 min-h-[90px] flex flex-col justify-end">
                    {currentStep >= 3 && <div className="p-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-[10px]">cb() -> Timeout</div>}
                  </div>
                </div>
              </div>
            )}

            {/* 4. DATABASE B-TREE INDEX QUERY VISUALIZER */}
            {activeModule === 'btree' && (
              <div className="w-full space-y-4 z-10 font-mono text-xs">
                <div className="text-center text-xs text-emerald-300">
                  B-Tree Root Node → Searching Key: <span className="font-bold text-amber-400">email = 'rahul@edunexa.edu'</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                  {/* Root Node */}
                  <div className="px-6 py-2 bg-emerald-700/80 text-white rounded-xl border border-emerald-400 font-bold shadow-lg animate-pulse">
                    Root Node [ID: 50]
                  </div>

                  {/* Branch Nodes */}
                  <div className="flex items-center gap-8">
                    <div className={`px-4 py-2 rounded-xl border ${currentStep >= 1 ? 'bg-indigo-600 border-indigo-400 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                      Left Branch (&lt; 50)
                    </div>
                    <div className={`px-4 py-2 rounded-xl border ${currentStep >= 2 ? 'bg-emerald-600 border-emerald-400 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                      Right Branch (&gt;= 50)
                    </div>
                  </div>

                  {/* Leaf Target */}
                  <div className={`p-3 rounded-xl border text-center ${currentStep >= 3 ? 'bg-amber-500 text-slate-950 font-black border-amber-300 shadow-xl' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                    🎯 Target Record Found! (Cost: 0.15ms, 1 Row)
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Canvas Bottom Timeline Stepper */}
          <div className="space-y-2 font-satoshi">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Animation Timeline</span>
              <span>{Math.round(((currentStep + 1) / activeModObj.totalSteps) * 100)}% Progress</span>
            </div>
            
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
              {Array.from({ length: activeModObj.totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-full flex-1 transition-all border-r border-white ${
                    idx <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (4 cols): Synchronized Code & Concept Study Notes */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Synchronized Code Box */}
          <div className="white-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-satoshi">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-600" /> Synchronized Code
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                Live Motion
              </span>
            </div>

            <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800 shadow-xs">
              <pre>{activeModObj.codeSnippet}</pre>
            </div>
          </div>

          {/* Interactive Study Notes Card */}
          <div className="white-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-satoshi">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" /> Study Concept Notes
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                +50 XP Session
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-600 font-quicksand leading-relaxed">
              <p className="font-bold text-slate-900 font-satoshi">
                {activeModObj.title}:
              </p>
              <p>{activeModObj.description}</p>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-1 text-[11px] font-medium text-indigo-900">
                <span className="font-bold font-satoshi block">💡 Key Takeaway:</span>
                <span>Visualizing concepts via motion enhances memory retention by up to 68% compared to static reading.</span>
              </div>
            </div>

            {sessionCompleted ? (
              <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl font-satoshi font-bold text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Session Completed (+50 XP)
                </span>
                <span className="text-amber-600 font-black">⭐ Done</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSessionCompleted(true);
                  addXP(50, `Completed Animation Study: ${activeModObj.title}`);
                  if (showToast) {
                    showToast(`🎉 +50 XP awarded for completing ${activeModObj.title}!`, 'success');
                  }
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-satoshi font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Claim +50 XP Reward</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
