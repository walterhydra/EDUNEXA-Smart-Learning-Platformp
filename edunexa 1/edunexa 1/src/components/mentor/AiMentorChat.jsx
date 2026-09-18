import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Trash2, 
  Code, 
  BookOpen, 
  Target, 
  RotateCcw,
  Copy,
  Check,
  Zap,
  Volume2
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  { label: "Explain React useEffect dependencies simply", category: "Concept" },
  { label: "How to fix 'Cannot read properties of undefined'?", category: "Debugging" },
  { label: "Give me a 7-day preparation schedule for Full Stack interviews", category: "Career" },
  { label: "Conduct a 3-question quick mock interview on JavaScript", category: "Interview" },
  { label: "Explain SQL Indexing B-Trees vs Hash Indexes", category: "Database" },
];

export const AiMentorChat = () => {
  const { user, addXP, showToast } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user.name?.split(' ')[0] || 'Aarav'}! I'm **NexaAI**, your dedicated technical mentor and skill development guide. 

I'm aware that your target role is **${user.careerGoal || 'Full Stack Developer'}** and you're currently mastering **Phase 1: JavaScript & Async paradigms**.

How can I accelerate your learning today? Ask a conceptual doubt, paste code to debug, or request a mock interview!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend = inputText) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Generative reply simulator
    setTimeout(() => {
      let aiResponseText = "";

      if (text.toLowerCase().includes('useeffect') || text.toLowerCase().includes('react')) {
        aiResponseText = `### React \`useEffect\` & Dependency Array Explained

In React, \`useEffect\` handles side effects (data fetching, subscriptions, timers). The dependency array tells React **when** to re-execute the effect:

1. **No dependency array:** Runs on *every single render*.
\`\`\`javascript
useEffect(() => {
  console.log("Runs every render");
});
\`\`\`

2. **Empty array \`[]\`:** Runs *only once* when the component mounts.
\`\`\`javascript
useEffect(() => {
  fetchUserData();
}, []);
\`\`\`

3. **With dependencies \`[userId]\`:** Runs on mount and *whenever \`userId\` changes*.
\`\`\`javascript
useEffect(() => {
  fetchProfile(userId);
}, [userId]);
\`\`\`

> **Pro Tip for Full Stack Devs:** Always include every reactive variable (props/state) read inside the effect in the dependency array, or use \`useCallback\` if passing helper functions!`;
      } else if (text.toLowerCase().includes('mock interview') || text.toLowerCase().includes('interview')) {
        aiResponseText = `### 🎯 Quick Full Stack Mock Interview - Question 1

**Question:** What is the difference between \`==\` (loose equality) and \`===\` (strict equality) in JavaScript, and what is type coercion?

*Take a moment to type your answer, and I will evaluate your technical precision!*`;
      } else if (text.toLowerCase().includes('cannot read properties') || text.toLowerCase().includes('debug')) {
        aiResponseText = `### 🛠 Debugging "Cannot read properties of undefined"

This common error happens when you attempt to access a property on a variable that evaluated to \`undefined\` (e.g. before an API payload arrived).

**Solution 1: Optional Chaining (\`?.\`)**
\`\`\`javascript
// Safe access:
const userName = user?.profile?.name ?? "Anonymous";
\`\`\`

**Solution 2: Guard Clauses / Default Values**
\`\`\`javascript
if (!data) return <LoadingSpinner />;
return <div>{data.title}</div>;
\`\`\``;
      } else {
        aiResponseText = `### NexaAI Analysis on: "${text}"

Here is a structured breakdown based on industry standards for **${user.careerGoal || 'Full Stack Developer'}**:

1. **Core Concept:** Break the problem down into input, state transformations, and output.
2. **Best Practice:** Maintain pure functions wherever possible and handle edge cases (nullish values, network delays).
3. **Action Step:** Try implementing this logic in our **Practice Lab** to verify runtime behavior!

Would you like me to generate a live code sandbox challenge around this topic?`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      addXP(20, 'Consulted NexaAI Mentor');
    }, 1100);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast('Copied to clipboard!', 'info');
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: `Chat cleared. Ready for your next coding challenge or questions, ${user.name?.split(' ')[0] || 'Aarav'}!`,
        timestamp: 'Just now'
      }
    ]);
    showToast('Chat history cleared.', 'info');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
      
      {/* Chat Header */}
      <div className="p-4 sm:px-6 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">NexaAI Mentor</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">Online</span>
            </div>
            <p className="text-[11px] text-slate-500">Fine-tuned for {user.careerGoal || 'Full Stack'} Curriculum</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-all"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2.5 bg-slate-50/40 border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-500" /> Prompts:
        </span>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt.label)}
            className="text-xs px-3 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-xl border border-slate-200 hover:border-indigo-200 font-medium whitespace-nowrap transition-all shadow-sm"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div 
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {isAI ? (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              ) : (
                <img 
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"} 
                  alt="User"
                  className="w-8 h-8 rounded-xl object-cover shrink-0 mt-1 border border-slate-200"
                />
              )}

              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isAI 
                    ? 'bg-slate-50 border border-slate-200 text-slate-800' 
                    : 'bg-indigo-600 text-white shadow-sm'
                }`}>
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>
                </div>

                <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${isAI ? 'justify-start' : 'justify-end'}`}>
                  <span>{msg.timestamp}</span>
                  {isAI && (
                    <button 
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-slate-600 flex items-center gap-0.5"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3 mr-auto">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box Footer */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask NexaAI a technical concept, paste error code, or study advice..."
            className="flex-1 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-2xl shadow-md shadow-indigo-600/20 transition-all active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
