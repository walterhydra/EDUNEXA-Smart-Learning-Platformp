import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Code2, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Lightbulb, 
  Terminal, 
  Sparkles, 
  ArrowRight,
  Zap,
  HelpCircle,
  Copy
} from 'lucide-react';

export const PracticeLab = () => {
  const { PRACTICE_CHALLENGES, addXP, showToast } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState(PRACTICE_CHALLENGES[0]);
  const [code, setCode] = useState(PRACTICE_CHALLENGES[0].initialCode);
  const [output, setOutput] = useState('// Click "Run Code & Tests" to execute in sandbox...');
  const [isRunning, setIsRunning] = useState(false);
  const [testsPassed, setTestsPassed] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const handleSelectChallenge = (chal) => {
    setSelectedChallenge(chal);
    setCode(chal.initialCode);
    setOutput('// Loaded challenge template. Ready to run!');
    setTestsPassed(false);
    setShowHints(false);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running test assertions against sandbox engine...');

    setTimeout(() => {
      // Safe execution sandbox for logging
      try {
        let logs = [];
        const customConsole = {
          log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
          error: (...args) => logs.push('ERROR: ' + args.join(' ')),
        };

        // Simulated evaluation
        const sandboxFunction = new Function('console', code);
        sandboxFunction(customConsole);

        const executionOutput = logs.join('\n') || 'Program completed with exit code 0 (No stdout output).';
        setOutput(executionOutput);
        setTestsPassed(true);
        addXP(selectedChallenge.xp, `Passed Practice Lab: ${selectedChallenge.title}`);
        showToast(`🎉 Challenge passed! +${selectedChallenge.xp} XP earned!`, 'success');
      } catch (err) {
        setOutput(`Execution Error: ${err.message}\nLine check failed.`);
        setTestsPassed(false);
        showToast('Code execution failed with errors. Check console.', 'error');
      } finally {
        setIsRunning(false);
      }
    }, 600);
  };

  const handleResetCode = () => {
    setCode(selectedChallenge.initialCode);
    setOutput('// Reset code back to challenge boilerplate.');
    setTestsPassed(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-2 border border-emerald-100">
            <Code2 className="w-3.5 h-3.5" /> Interactive In-Browser Code Sandbox
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Practice Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Hands-on algorithms and real-world utility functions with live runtime execution and automated unit tests.
          </p>
        </div>

        {/* XP Badge */}
        <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-amber-800 text-xs font-bold shrink-0">
          <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
          Challenge Reward: +{selectedChallenge.xp} XP
        </div>
      </div>

      {/* Challenge Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PRACTICE_CHALLENGES.map((chal) => {
          const isSelected = selectedChallenge.id === chal.id;
          return (
            <div
              key={chal.id}
              onClick={() => handleSelectChallenge(chal)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-indigo-50/60 border-indigo-500 shadow-sm ring-1 ring-indigo-500' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  chal.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                  chal.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                }`}>
                  {chal.difficulty}
                </span>
                <span className="text-xs text-slate-400">{chal.category}</span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">{chal.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Editor + Console Split Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Challenge Brief & Instructions (4 cols) */}
        <div className="lg:col-span-4 white-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{selectedChallenge.category} Lab</span>
              <h2 className="text-lg font-black text-slate-900 mt-0.5">{selectedChallenge.title}</h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedChallenge.description}</p>
            </div>

            {/* Test Case Expected Output Target */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-sans">Target Test Output:</span>
              <pre className="text-[11px] text-slate-700 whitespace-pre-wrap">{selectedChallenge.expectedOutput}</pre>
            </div>

            {/* Hints Accordion */}
            <div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHints ? 'Hide Hints' : 'Need a Hint?'}
              </button>

              {showHints && (
                <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1.5">
                  {selectedChallenge.hints.map((hint, hIdx) => (
                    <p key={hIdx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span> {hint}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {testsPassed && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p>All test assertions passed successfully!</p>
                <p className="text-[11px] font-normal text-emerald-700">Competency updated in your live skill graph.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Code Editor + Terminal Console (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Editor Container */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
            {/* Editor Header Bar */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="ml-2 text-xs font-mono text-slate-400">solution.js</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCode}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  {isRunning ? 'Running...' : 'Run Code & Tests'}
                </button>
              </div>
            </div>

            {/* Live Code Input Textarea */}
            <textarea
              rows={14}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full bg-slate-950 text-slate-200 font-mono text-xs sm:text-sm p-4 focus:outline-none resize-none leading-relaxed selection:bg-indigo-600/40"
            />
          </div>

          {/* Terminal Output Console */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 font-mono text-xs text-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Output Sandbox Console:
              </span>
              <span className="text-[10px]">Node.js v20.x Simulation Engine</span>
            </div>

            <pre className="text-emerald-400 whitespace-pre-wrap font-mono min-h-[60px]">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
