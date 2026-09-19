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
  Volume2,
  Terminal,
  Cpu,
  Code2,
  Lightbulb,
  MessageSquare
} from 'lucide-react';

export const AiMentorChat = () => {
  const { user, studentDashboard, addXP, showToast } = useApp();

  const studentName = studentDashboard?.studentInfo?.name || user?.name || 'Learner';
  const studentEmail = studentDashboard?.studentInfo?.email || user?.email || '';
  const targetTrack = studentDashboard?.studentInfo?.targetTrack || user?.careerGoal || 'Full Stack Web Development';
  const assessmentScore = studentDashboard?.assessment?.score || 78;
  const assessmentLevel = studentDashboard?.assessment?.level || 'Intermediate';

  // Dynamic suggested prompts based on logged-in student's track
  const getSuggestedPrompts = () => {
    if (studentEmail.includes('python')) {
      return [
        { label: "Explain Python List Comprehensions vs Generator Expressions", category: "Python Core" },
        { label: "How to fix 'KeyError' & handle JSON File I/O in Python?", category: "Debugging" },
        { label: "Explain Pandas DataFrame indexing & loc vs iloc", category: "Data Science" },
        { label: "Conduct a 3-question Python Data Structures Mock Interview", category: "Mock Interview" },
      ];
    } else if (studentEmail.includes('ai')) {
      return [
        { label: "Explain RAG Dense Embeddings & Cosine Similarity in ChromaDB", category: "RAG & Vector DB" },
        { label: "How to write a multi-stage Dockerfile for PyTorch FastAPI?", category: "Cloud MLOps" },
        { label: "Explain Transformer Multi-Head Self-Attention mechanisms", category: "Deep Learning" },
        { label: "Conduct a 3-question AI Engineering & vLLM Mock Interview", category: "Mock Interview" },
      ];
    } else {
      return [
        { label: "Explain React useEffect dependency arrays & cleanup functions", category: "React Architecture" },
        { label: "How to fix 'Cannot read properties of undefined' in Express?", category: "Debugging" },
        { label: "Explain Prisma ORM Relational Schema Migrations & Indexes", category: "PostgreSQL" },
        { label: "Conduct a 3-question MERN Stack Mock Interview", category: "Mock Interview" },
      ];
    }
  };

  const promptsList = getSuggestedPrompts();

  // Initial welcome message customized for logged in student
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello **${studentName}**! 👋 I am **NexaAI**, your dedicated technical mentor & AI co-pilot.

I am synced with your **${targetTrack}** track on Neon DB:
• **Assessment Status:** Evaluated score of **${assessmentScore}/100 (${assessmentLevel})**
• **Current Focus:** Strengthening core competencies & custom assignments.

How can I assist your study session today? Ask a technical question, paste error logs to debug, or request a 1-on-1 mock interview!`,
      timestamp: 'Just now'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // NexaAI Intelligent Knowledge Engine
  const generateAiReply = (userQuery) => {
    const q = userQuery.toLowerCase();

    // 1. Python & Data Science Questions
    if (q.includes('python') || q.includes('pandas') || q.includes('comprehension') || q.includes('keyerror')) {
      return `### 🐍 NexaAI Python & Data Science Analysis

**1. Concept Breakdown:**
In Python, **List Comprehensions** provide a concise syntax to create lists from iterables:
\`\`\`python
# Squared even numbers:
squares = [x**2 for x in range(10) if x % 2 == 0]
print(squares) # Output: [0, 4, 16, 36, 64]
\`\`\`

**2. Pandas Data Wrangling Tip:**
To prevent \`KeyError\` during DataFrame slicing:
\`\`\`python
# Use .loc for label indexing and .iloc for positional indexing
df_filtered = df.loc[df['score'] > 60, ['student_name', 'score']]
\`\`\`

> **Adaptive Recommendation:** Try implementing this logic in your **Python Control Flow & Loops Lab** to earn +150 XP!`;
    }

    // 2. AI Engineering & Cloud MLOps Questions
    if (q.includes('rag') || q.includes('pytorch') || q.includes('vector') || q.includes('docker') || q.includes('transformer')) {
      return `### 🤖 NexaAI Deep Learning & Cloud MLOps Analysis

**1. RAG Vector Search & Cosine Similarity:**
Retrieval-Augmented Generation relies on embedding text chunks into high-dimensional vector spaces ($d=1536$):

$$\\text{Cosine Similarity} = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}$$

\`\`\`python
import chromadb
client = chromadb.Client()
collection = client.get_or_create_collection("tech_docs")

# Query top 3 matching chunks:
results = collection.query(
    query_texts=["How to containerize FastAPI with Docker?"],
    n_results=3
)
\`\`\`

**2. Multi-Stage Dockerfile Optimization:**
\`\`\`dockerfile
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

> **MLOps Best Practice:** Keeps production image size $<450\\text{MB}$ for fast cloud deployments!`;
    }

    // 3. Full Stack Web Development Questions
    if (q.includes('useeffect') || q.includes('react') || q.includes('express') || q.includes('prisma') || q.includes('jwt')) {
      return `### 💻 NexaAI Full Stack Architecture Analysis

**1. React \`useEffect\` & Dependency Array Lifecycle:**
\`\`\`javascript
// 1. Mount only ([]):
useEffect(() => {
  fetchStudentDashboard();
}, []);

// 2. Reactive dependencies ([userId]):
useEffect(() => {
  if (userId) loadAssignments(userId);
}, [userId]);
\`\`\`

**2. Express JWT Auth Middleware:**
\`\`\`javascript
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthenticated' });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalid' });
    req.user = user;
    next();
  });
};
\`\`\`

> **Pro Tip:** Always validate API request bodies with **Zod Schemas** before processing database queries!`;
    }

    // 4. Mock Interview Handler
    if (q.includes('interview') || q.includes('mock')) {
      return `### 🎯 NexaAI Technical Mock Interview - Round 1

**Question 1 for ${studentName} (${targetTrack}):**

> *"Walk me through how you optimize data structures and handle runtime errors or async state in your target stack."*

*Type your response below and I will evaluate your technical accuracy, edge-case coverage, and clarity!*`;
    }

    // 5. General Doubt & Debugging Handler
    return `### NexaAI Technical Guidance for ${studentName}

I evaluated your query regarding: **"${userQuery}"**

1. **Target Track Alignment:** Analyzed against your **${targetTrack}** learning roadmap.
2. **Best Practice:** Keep functions modular, handle nullish edge cases (\`?.\`), and log errors cleanly.
3. **Next Step:** You can run and test code snippets directly in your **Practice Lab** tab!

Would you like me to generate a step-by-step code challenge on this topic?`;
  };

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

    setTimeout(() => {
      const aiReply = generateAiReply(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      addXP(20, 'Consulted NexaAI Technical Mentor');
    }, 900);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast('Copied to clipboard!', 'info');
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text.replace(/[#*`]/g, ''));
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      showToast('Text-to-speech not supported on this browser.', 'error');
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: `Chat session reset for **${studentName}**. Ask any technical doubt or paste code to debug!`,
        timestamp: 'Just now'
      }
    ]);
    showToast('Chat history reset.', 'info');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden font-sans">
      
      {/* Header */}
      <div className="p-4 sm:px-6 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-slate-900 font-satoshi">NexaAI Technical Mentor</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-satoshi">
                Online & Synced
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-quicksand font-medium">
              Student: <strong className="text-slate-800">{studentName}</strong> • Track: <span className="text-indigo-600 font-bold">{targetTrack}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-all cursor-pointer"
            title="Clear Chat Session"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2.5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1 font-satoshi">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Prompts for {studentName.split(' ')[0]}:
        </span>
        {promptsList.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt.label)}
            className="text-xs px-3 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-xl border border-slate-200 hover:border-indigo-200 font-medium whitespace-nowrap transition-all shadow-2xs cursor-pointer font-quicksand"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 subtle-mesh-bg">
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
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm mt-1 font-bold text-xs">
                  {studentName.charAt(0)}
                </div>
              )}

              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isAI 
                    ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs' 
                    : 'bg-indigo-600 text-white shadow-sm'
                }`}>
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>
                </div>

                <div className={`flex items-center gap-3 text-[10px] text-slate-400 px-1 ${isAI ? 'justify-start' : 'justify-end'}`}>
                  <span>{msg.timestamp}</span>
                  {isAI && (
                    <>
                      <button 
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-slate-600 flex items-center gap-0.5 cursor-pointer"
                        title="Copy Response"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="hover:text-indigo-600 flex items-center gap-0.5 cursor-pointer"
                        title="Read Aloud"
                      >
                        <Volume2 className={`w-3 h-3 ${isSpeaking ? 'text-indigo-600 animate-pulse' : ''}`} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3 mr-auto">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-1.5 shadow-2xs">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></div>
              <span className="text-xs text-slate-400 ml-1 font-medium font-quicksand">NexaAI is analyzing query...</span>
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
            placeholder={`Ask NexaAI about ${targetTrack}, paste code errors, or start a mock interview...`}
            className="flex-1 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-quicksand"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-2xl shadow-md shadow-indigo-600/20 transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
