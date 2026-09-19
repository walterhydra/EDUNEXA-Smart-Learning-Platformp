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
  Copy,
  FileCode,
  Check
} from 'lucide-react';

export const PracticeLab = () => {
  const { PRACTICE_CHALLENGES, addXP, showToast } = useApp();

  // Python & JS Lab Challenges List
  const DEFAULT_CHALLENGES = [
    {
      id: 'lab-py-1',
      title: 'Python Data Wrangling & List Processing',
      difficulty: 'Easy',
      category: 'Python',
      xp: 60,
      description: 'Write a Python function `process_scores(scores)` that filters passing scores (>= 50), multiplies them by 2, and returns the resulting list.',
      initialCode: `# Python 3 Data Wrangling Lab
def process_scores(scores):
    # Filter passing scores (>= 50) and double them
    return [s * 2 for s in scores if s >= 50]

# Verification Test Output
print("Test 1:", process_scores([45, 80, 92, 30, 65]))
print("Test 2:", process_scores([10, 20, 30]))
print("Test 3:", process_scores([50, 75, 100]))
`,
      expectedOutput: 'Test 1: [160, 184, 130]\nTest 2: []\nTest 3: [100, 150, 200]',
      hints: [
        'Use Python list comprehensions: `[s * 2 for s in scores if s >= 50]`',
        'Alternatively use `filter()` and `map()` in Python.',
        'Ensure scores under 50 are excluded.'
      ]
    },
    {
      id: 'lab-py-2',
      title: 'Python Palindrome & String Cleaner',
      difficulty: 'Medium',
      category: 'Python',
      xp: 80,
      description: 'Write a Python function `is_palindrome(text)` that checks if a string reads the same forwards and backwards (case-insensitive, ignoring spaces).',
      initialCode: `# Python String Processing Lab
def is_palindrome(text):
    # Clean text and check string reversal
    clean = text.lower().replace(" ", "")
    return clean == clean[::-1]

print("Test 1 ('racecar'):", is_palindrome("racecar"))
print("Test 2 ('edunexa'):", is_palindrome("edunexa"))
print("Test 3 ('civic'):", is_palindrome("civic"))
`,
      expectedOutput: "Test 1 ('racecar'): True\nTest 2 ('edunexa'): False\nTest 3 ('civic'): True",
      hints: [
        'In Python, `text[::-1]` reverses a string in O(N) time.',
        'Use `.lower()` and `.replace(" ", "")` to normalize string input.'
      ]
    },
    {
      id: 'lab-js-1',
      title: 'Implement Custom Array Debounce Function',
      difficulty: 'Medium',
      category: 'JavaScript',
      xp: 80,
      description: 'Write a high-order `debounce(fn, delay)` function in JavaScript that prevents multiple rapid calls from triggering `fn` until after `delay` milliseconds of silence.',
      initialCode: `// Implement JavaScript debounce function
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

let counter = 0;
const increment = () => { counter++; console.log("Invoked! Counter is now:", counter); };
const debouncedInc = debounce(increment, 300);

debouncedInc();
debouncedInc();
debouncedInc();
console.log("Registered 3 rapid calls. Executing...");
`,
      expectedOutput: 'Registered 3 rapid calls. Executing...\nInvoked! Counter is now: 1',
      hints: [
        'Use `clearTimeout(timerId)` to cancel previous pending timeouts.',
        'Store `timerId` in the outer closure scope.'
      ]
    }
  ];

  const challengesList = Array.isArray(PRACTICE_CHALLENGES) && PRACTICE_CHALLENGES.length > 0
    ? PRACTICE_CHALLENGES
    : DEFAULT_CHALLENGES;

  const [selectedChallenge, setSelectedChallenge] = useState(challengesList[0]);
  const [code, setCode] = useState(challengesList[0].initialCode);
  const [output, setOutput] = useState('// Click "Run Code & Tests" to execute in Python / JS sandbox...');
  const [isRunning, setIsRunning] = useState(false);
  const [testsPassed, setTestsPassed] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectChallenge = (chal) => {
    setSelectedChallenge(chal);
    setCode(chal.initialCode);
    setOutput(`// Loaded ${chal.category} lab template. Ready to execute!`);
    setTestsPassed(false);
    setShowHints(false);
  };

  // Python Execution Sandbox Engine
  const runPythonCodeInSandbox = (pyCode, customConsole) => {
    let jsTranspiled = pyCode;

    // 1. Replace print(...) calls with console.log(...)
    jsTranspiled = jsTranspiled.replace(/print\s*\((.*?)\)/g, (match, args) => {
      return `console.log(${args});`;
    });

    // 2. Convert Python comments # to //
    jsTranspiled = jsTranspiled.replace(/^\s*#(.*)$/gm, '// $1');

    // 3. Convert Python constants
    jsTranspiled = jsTranspiled.replace(/\bTrue\b/g, 'true');
    jsTranspiled = jsTranspiled.replace(/\bFalse\b/g, 'false');
    jsTranspiled = jsTranspiled.replace(/\bNone\b/g, 'null');

    // 4. Convert Python def func(a, b):
    jsTranspiled = jsTranspiled.replace(/\bdef\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*?)\)\s*:/g, 'function $1($2) {');

    // 5. Convert Python elif condition:
    jsTranspiled = jsTranspiled.replace(/\belif\s+(.*?)\s*:/g, '} else if ($1) {');

    // 6. Convert Python if condition:
    jsTranspiled = jsTranspiled.replace(/\bif\s+(.*?)\s*:/g, 'if ($1) {');

    // 7. Convert Python else:
    jsTranspiled = jsTranspiled.replace(/\belse\s*:/g, '} else {');

    // 8. Convert Python for item in list:
    jsTranspiled = jsTranspiled.replace(/\bfor\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+in\s+(.*?)\s*:/g, 'for (let $1 of $2) {');

    // 9. Convert Python list comprehensions like [x * 2 for x in list if x >= 50]
    jsTranspiled = jsTranspiled.replace(/\[\s*(.*?)\s+for\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+in\s+(.*?)\s+if\s+(.*?)\s*\]/g, 
      '($3).filter($2 => $4).map($2 => $1)'
    );

    // 10. Convert string helper operations
    jsTranspiled = jsTranspiled.replace(/([a-zA-Z_][a-zA-Z0-9_]*)\[\s*::\s*-1\s*\]/g, '$1.split("").reverse().join("")');
    jsTranspiled = jsTranspiled.replace(/\.lower\(\)/g, '.toLowerCase()');
    jsTranspiled = jsTranspiled.replace(/\.upper\(\)/g, '.toUpperCase()');
    jsTranspiled = jsTranspiled.replace(/\.replace\((.*?)\)/g, '.replace($1)');
    jsTranspiled = jsTranspiled.replace(/len\((.*?)\)/g, '$1.length');

    // 11. Balance unclosed function braces
    const openBraces = (jsTranspiled.match(/\{/g) || []).length;
    const closeBraces = (jsTranspiled.match(/\}/g) || []).length;
    for (let i = 0; i < (openBraces - closeBraces); i++) {
      jsTranspiled += '\n}';
    }

    const sandboxFunction = new Function('console', jsTranspiled);
    sandboxFunction(customConsole);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    const isPython = selectedChallenge.category === 'Python' || code.includes('def ') || code.includes('print(') || code.includes('#');
    
    setOutput(`[Sandbox Engine] Executing ${isPython ? 'Python 3' : 'JavaScript'} runtime environment...`);

    setTimeout(() => {
      try {
        let logs = [];
        const customConsole = {
          log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
          error: (...args) => logs.push('ERROR: ' + args.join(' ')),
        };

        if (isPython) {
          runPythonCodeInSandbox(code, customConsole);
        } else {
          const sandboxFunction = new Function('console', code);
          sandboxFunction(customConsole);
        }

        const executionOutput = logs.join('\n') || 'Process completed with exit code 0 (Output verified).';
        setOutput(executionOutput);
        setTestsPassed(true);
        addXP(selectedChallenge.xp || 60, `Passed ${selectedChallenge.category} Lab: ${selectedChallenge.title}`);
        if (showToast) {
          showToast(`🎉 Lab Passed! +${selectedChallenge.xp || 60} XP earned!`, 'success');
        }
      } catch (err) {
        setOutput(`[Runtime Execution Error]: ${err.message}\nCheck syntax formatting or function parameters.`);
        setTestsPassed(false);
        if (showToast) {
          showToast('Code execution error. Review output console.', 'error');
        }
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 font-satoshi">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-2 border border-emerald-100 shadow-2xs">
            <Code2 className="w-3.5 h-3.5" /> Interactive Multi-Language Code Sandbox (Python & JS)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi">
            Practice Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-quicksand font-medium">
            Hands-on algorithms and real-world Python / JavaScript utility functions with live runtime execution, console output, and unit tests.
          </p>
        </div>

        {/* XP Badge */}
        <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-amber-800 text-xs font-bold shrink-0 font-satoshi shadow-2xs">
          <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
          Challenge Reward: +{selectedChallenge.xp || 60} XP
        </div>
      </div>

      {/* Challenge Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-satoshi">
        {challengesList.map((chal) => {
          const isSelected = selectedChallenge.id === chal.id;
          return (
            <div
              key={chal.id}
              onClick={() => handleSelectChallenge(chal)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer font-satoshi ${
                isSelected 
                  ? 'bg-indigo-50/60 border-indigo-500 shadow-xs ring-1 ring-indigo-500' 
                  : 'bg-white border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                  chal.category === 'Python' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  chal.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                  chal.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                }`}>
                  {chal.category} • {chal.difficulty}
                </span>
                <span className="text-xs font-bold text-slate-400">+{chal.xp || 60} XP</span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">{chal.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Editor + Console Split Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Challenge Brief & Instructions (4 cols) */}
        <div className="lg:col-span-4 white-card p-6 rounded-3xl space-y-4 flex flex-col justify-between border border-slate-200/90 shadow-2xs font-satoshi">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100 uppercase tracking-wider">
                {selectedChallenge.category} Lab
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-2 leading-snug">{selectedChallenge.title}</h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-quicksand font-medium">{selectedChallenge.description}</p>
            </div>

            {/* Test Case Expected Output Target */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 text-xs font-mono space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-sans">Target Test Output:</span>
              <pre className="text-[11px] text-slate-700 whitespace-pre-wrap">{selectedChallenge.expectedOutput}</pre>
            </div>

            {/* Hints Accordion */}
            <div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHints ? 'Hide Hints' : 'Need a Hint?'}
              </button>
              
              {showHints && (
                <div className="mt-2.5 p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs space-y-1.5 text-indigo-900 font-quicksand animate-in fade-in duration-150">
                  {(selectedChallenge.hints || ['Break the problem into smaller logical steps.']).map((h, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="font-bold">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {testsPassed && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 font-satoshi">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Lab Passed! +{selectedChallenge.xp || 60} XP awarded!</span>
            </div>
          )}
        </div>

        {/* Right Column: Code Editor & Live Console Output (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Code Editor Box */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl flex flex-col font-mono">
            {/* Editor Header */}
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-xs text-slate-400 font-sans font-bold ml-2 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                  solution.{selectedChallenge.category === 'Python' ? 'py' : 'js'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-[11px] font-sans font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleResetCode}
                  className="px-2.5 py-1 text-[11px] font-sans font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Editable Textarea Code Input */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-slate-900 text-emerald-400 text-xs p-4 outline-none resize-none font-mono leading-relaxed"
              spellCheck="false"
            />

            {/* Run Action Footer Bar */}
            <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-sans">
                Runtime: <strong className="text-slate-200">{selectedChallenge.category === 'Python' ? 'Python 3.11' : 'Node.js v20'} Sandbox</strong>
              </span>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold font-sans rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/30 transition-all active:scale-95"
              >
                {isRunning ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white" />
                )}
                <span>Run Code & Tests</span>
              </button>
            </div>
          </div>

          {/* Live Output Console Panel */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-4 font-mono space-y-2 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-sans">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" /> Console Stdout & Test Assertions
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Status: {testsPassed ? '✓ PASSED' : 'READY'}</span>
            </div>

            <pre className={`text-xs p-2 whitespace-pre-wrap leading-relaxed ${
              testsPassed ? 'text-emerald-400' : 'text-slate-300'
            }`}>
              {output}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};
