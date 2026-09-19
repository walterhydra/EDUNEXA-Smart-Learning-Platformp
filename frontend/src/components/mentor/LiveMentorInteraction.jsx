import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Monitor, 
  PhoneOff, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Star, 
  Sparkles, 
  UserCheck, 
  Send, 
  Code2, 
  Terminal, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Award,
  Play,
  Share2
} from 'lucide-react';

const MENTORS_DATABASE = [
  {
    id: 'm1',
    name: 'Dr. Sarah Vance',
    role: 'Ex-Google Senior Data Scientist & Python Specialist',
    company: 'Ex-Google / AI Fellow',
    rating: 4.9,
    sessionsCount: 342,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    status: 'online', // 'online' | 'in-session' | 'available'
    tracks: ['Python & Data Science Fundamentals', 'Data Science', 'Python'],
    skills: ['Python', 'Pandas', 'NumPy', 'Data Wrangling', 'Logic Building'],
    nextAvailableSlot: 'Today, 05:30 PM',
  },
  {
    id: 'm2',
    name: 'Vikram Aditya',
    role: 'Staff Engineer & Full Stack MERN Architect',
    company: 'Razorpay / Ex-Microsoft',
    rating: 5.0,
    sessionsCount: 489,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    status: 'online',
    tracks: ['Full Stack Web Development (MERN/React+Node)', 'Full Stack Web Development', 'Web Development'],
    skills: ['React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL'],
    nextAvailableSlot: 'Today, 06:00 PM',
  },
  {
    id: 'm3',
    name: 'Dr. Aris Thorne',
    role: 'AI Systems Scientist & Cloud MLOps Architect',
    company: 'Meta AI / AWS Community Builder',
    rating: 5.0,
    sessionsCount: 612,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    status: 'online',
    tracks: ['AI Systems & Cloud Machine Learning Engineering', 'AI Systems', 'AI & Machine Learning'],
    skills: ['PyTorch', 'RAG Embeddings', 'Docker', 'FastAPI', 'CUDA Optimization'],
    nextAvailableSlot: 'Today, 07:00 PM',
  },
  {
    id: 'm4',
    name: 'Ananya Roy',
    role: 'Lead Data Engineer & Analytics Specialist',
    company: 'Swiggy / Ex-Amazon',
    rating: 4.8,
    sessionsCount: 215,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    status: 'in-session',
    tracks: ['Python & Data Science Fundamentals', 'Data Analytics'],
    skills: ['Python', 'SQL', 'Data Analytics', 'Matplotlib'],
    nextAvailableSlot: 'Tomorrow, 11:00 AM',
  },
  {
    id: 'm5',
    name: 'Meera Nair',
    role: 'Senior Frontend & Component Architect',
    company: 'Atlassian',
    rating: 4.9,
    sessionsCount: 310,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    status: 'available',
    tracks: ['Full Stack Web Development (MERN/React+Node)'],
    skills: ['React Hooks', 'Zustand', 'TailwindCSS', 'Testing'],
    nextAvailableSlot: 'Today, 08:00 PM',
  },
];

export const LiveMentorInteraction = () => {
  const { user, studentDashboard, addXP, showToast } = useApp();

  const studentName = studentDashboard?.studentInfo?.name || user?.name || 'Learner';
  const targetTrack = studentDashboard?.studentInfo?.targetTrack || user?.careerGoal || 'Full Stack Web Development';

  const [activeMentor, setActiveMentor] = useState(null);
  const [isInLiveCall, setIsInLiveCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(true);

  // Live session chat state
  const [liveMessages, setLiveMessages] = useState([]);
  const [inputChat, setInputChat] = useState('');

  // Booking Modal State
  const [selectedSlot, setSelectedSlot] = useState('15-min Code Review');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filter mentors matching student's track
  const matchingMentors = MENTORS_DATABASE.filter(m => 
    m.tracks.some(t => t.toLowerCase().includes(targetTrack.toLowerCase()) || targetTrack.toLowerCase().includes(t.toLowerCase()))
  );
  const displayMentors = matchingMentors.length > 0 ? matchingMentors : MENTORS_DATABASE;

  const handleStartCall = (mentor) => {
    setActiveMentor(mentor);
    setIsInLiveCall(true);
    setLiveMessages([
      {
        id: 1,
        sender: 'mentor',
        name: mentor.name,
        text: `Hello ${studentName}! I'm ${mentor.name}. I reviewed your assessment report for ${targetTrack}. Let's dive into live code review & doubt resolution!`,
        time: 'Just now'
      }
    ]);
    addXP(50, `Joined 1-on-1 Live Interaction with ${mentor.name}`);
    showToast(`🟢 Connected to Live Video Interaction with ${mentor.name}`, 'success');
  };

  const handleEndCall = () => {
    setIsInLiveCall(false);
    setActiveMentor(null);
    showToast('Live interaction session ended. +50 XP Awarded!', 'info');
  };

  const handleSendLiveMessage = (e) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      name: studentName,
      text: inputChat.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setLiveMessages(prev => [...prev, newMsg]);
    setInputChat('');

    // Mentor live reply simulation
    setTimeout(() => {
      const mentorReply = {
        id: Date.now() + 1,
        sender: 'mentor',
        name: activeMentor?.name || 'Mentor',
        text: `Great point, ${studentName}! Let me highlight that on the shared live code sandbox right now.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setLiveMessages(prev => [...prev, mentorReply]);
    }, 1200);
  };

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
    addXP(30, 'Scheduled Live 1-on-1 Mentor Session');
    setTimeout(() => {
      setIsBookingOpen(false);
      setBookingSuccess(false);
      showToast(`🗓️ Session booked with ${activeMentor?.name} for ${selectedSlot}!`, 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 font-sans subtle-mesh-bg">
      
      {/* 1. HERO BANNER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-3 font-satoshi">
            <Video className="w-3.5 h-3.5 text-indigo-600 animate-pulse" /> Live 1-on-1 Virtual Classroom & Code Review
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi">
            Mentor Live Interaction Room
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-quicksand font-medium">
            Connect face-to-face in real-time with verified industry engineers tailored for <strong className="text-indigo-600 font-bold">{targetTrack}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-bold font-satoshi">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>12 Track Mentors Online</span>
          </div>
        </div>
      </div>

      {/* 2. LIVE MEETING ROOM MODAL CANVAS (IF IN CALL) */}
      {isInLiveCall && activeMentor && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Virtual Call Header */}
          <div className="px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-xs font-bold text-white font-satoshi">
                LIVE 1-on-1 Interaction with {activeMentor.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                HD Audio/Video • Encrypted
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLiveChat(!showLiveChat)}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  showLiveChat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">In-Call Chat</span>
              </button>
            </div>
          </div>

          {/* Virtual Call Main Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
            
            {/* Left 8 Cols: Video Stage & Live Code Sandbox */}
            <div className={`p-4 space-y-4 ${showLiveChat ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
              
              {/* Main Video Screen */}
              <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                {/* Mentor Video Feed Background */}
                <img 
                  src={activeMentor.avatar} 
                  alt={activeMentor.name} 
                  className={`w-full h-full object-cover ${isVideoOn ? 'filter-none' : 'blur-md opacity-30'}`}
                />
                
                {/* Mentor Overlay Info Badge */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold font-satoshi">{activeMentor.name} ({activeMentor.company})</span>
                </div>

                {/* Audio Wave Visualizer Simulation */}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-emerald-400 flex items-center gap-1 text-[11px] font-mono">
                  <span className="animate-pulse">🎙️ Audio Spectrum Active</span>
                </div>

                {/* Student Picture-in-Picture Video Feed (Self View) */}
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-950 rounded-xl border-2 border-indigo-500 overflow-hidden shadow-xl flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="w-full h-full bg-indigo-900/40 flex flex-col items-center justify-center text-white">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs">
                        {studentName.charAt(0)}
                      </div>
                      <span className="text-[9px] font-bold mt-1">{studentName} (You)</span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500 text-xs">
                      Cam Off
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom In-Call Control Bar */}
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-2xl transition-all cursor-pointer ${
                    isMicOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white shadow-md'
                  }`}
                  title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-2xl transition-all cursor-pointer ${
                    isVideoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white shadow-md'
                  }`}
                  title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => {
                    setIsSharingScreen(!isSharingScreen);
                    showToast(isSharingScreen ? 'Stopped screen sharing' : '🖥️ Screen sharing active', 'info');
                  }}
                  className={`p-3 rounded-2xl transition-all cursor-pointer ${
                    isSharingScreen ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Share Screen"
                >
                  <Monitor className="w-5 h-5" />
                </button>

                <button
                  onClick={handleEndCall}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <PhoneOff className="w-4 h-4" /> End Call
                </button>
              </div>

            </div>

            {/* Right 4 Cols: Live Session Chat Panel */}
            {showLiveChat && (
              <div className="lg:col-span-4 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block font-satoshi border-b border-slate-800 pb-2">
                    In-Call Live Chat
                  </span>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {liveMessages.map((m) => (
                      <div key={m.id} className={`space-y-1 text-xs font-quicksand ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className="text-[10px] text-slate-400 font-bold">{m.name} • {m.time}</span>
                        <div className={`p-3 rounded-2xl text-xs ${
                          m.sender === 'user' 
                            ? 'bg-indigo-600 text-white ml-auto max-w-[85%]' 
                            : 'bg-slate-800 text-slate-200 border border-slate-700 mr-auto max-w-[85%]'
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSendLiveMessage} className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                    placeholder="Type message to mentor..."
                    className="flex-1 bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 font-quicksand"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>
      )}

      {/* 3. EXPERT MENTORS DIRECTORY FOR LOGGED-IN STUDENT TRACK */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 font-satoshi">Verified Mentors for {targetTrack}</h2>
            <p className="text-xs text-slate-500 font-quicksand">1-on-1 Code Review, Architecture Feedback & Mock Interviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayMentors.map((mentor) => (
            <div 
              key={mentor.id}
              className="white-card p-6 rounded-3xl space-y-4 flex flex-col justify-between group hover:border-indigo-200 transition-all"
            >
              <div className="space-y-3">
                {/* Mentor Header Avatar & Badge */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name} 
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      mentor.status === 'online' ? 'bg-emerald-500' : mentor.status === 'in-session' ? 'bg-amber-500' : 'bg-indigo-500'
                    }`} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-slate-900 truncate font-satoshi">{mentor.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 truncate font-quicksand font-medium">{mentor.role}</p>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mt-1 font-satoshi">
                      {mentor.company}
                    </span>
                  </div>
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium font-quicksand bg-slate-50 p-2.5 rounded-xl">
                  <span className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {mentor.rating}
                  </span>
                  <span>{mentor.sessionsCount} Sessions</span>
                  <span className="text-emerald-600 font-bold">{mentor.nextAvailableSlot}</span>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mentor.skills.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-satoshi">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setActiveMentor(mentor);
                    setIsBookingOpen(true);
                  }}
                  className="py-2.5 px-3 bg-white border border-slate-200 hover:border-indigo-500 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer font-satoshi"
                >
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Book Slot
                </button>

                <button
                  onClick={() => handleStartCall(mentor)}
                  className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 font-satoshi"
                >
                  <Video className="w-3.5 h-3.5" /> Start Live
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BOOKING MODAL */}
      {isBookingOpen && activeMentor && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 font-satoshi">Book 1-on-1 Live Interaction</h3>
              </div>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Mentor Summary */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
              <img src={activeMentor.avatar} alt={activeMentor.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 font-satoshi">{activeMentor.name}</h4>
                <p className="text-[11px] text-slate-500 font-quicksand">{activeMentor.role}</p>
              </div>
            </div>

            {/* Select Slot Duration */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-satoshi">Select Session Type:</span>
              {[
                { title: '15-min Code Review & Bug Fix', xp: '+50 XP' },
                { title: '30-min Portfolio & Architecture Audit', xp: '+100 XP' },
                { title: '45-min Technical Mock Interview', xp: '+150 XP' },
              ].map((slot, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSlot(slot.title)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    selectedSlot === slot.title 
                      ? 'bg-indigo-50 border-indigo-500 font-bold text-indigo-950 shadow-xs' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{slot.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md font-satoshi">
                    {slot.xp}
                  </span>
                </div>
              ))}
            </div>

            {bookingSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Session booked! Direct calendar invite sent to {studentDashboard?.studentInfo?.email || user?.email}.</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsBookingOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={bookingSuccess}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                Confirm Slot <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
