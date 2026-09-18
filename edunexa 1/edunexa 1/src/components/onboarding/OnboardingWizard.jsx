import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  GraduationCap, 
  Compass, 
  Layers, 
  Target, 
  Clock, 
  BookOpen, 
  Code, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Layout, 
  Smartphone, 
  Cloud,
  Check,
  Plus,
  Trash2,
  BrainCircuit,
  Loader2,
  Flame
} from 'lucide-react';

const INTEREST_OPTIONS = [
  { id: 'web-dev', label: 'Web Development', icon: Code, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { id: 'ai-ml', label: 'AI / ML', icon: Cpu, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'data', label: 'Data Science & Analytics', icon: Database, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: ShieldCheck, color: 'text-red-600 bg-red-50 border-red-200' },
  { id: 'cloud', label: 'Cloud Computing & DevOps', icon: Cloud, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'ui-ux', label: 'UI/UX Design', icon: Layout, color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200' },
  { id: 'mobile-dev', label: 'Mobile Development', icon: Smartphone, color: 'text-blue-600 bg-blue-50 border-blue-200' },
];

const PRESET_SKILLS = [
  'JavaScript', 'React', 'Python', 'SQL', 'Node.js', 'TypeScript', 'Java', 'C++', 'Git', 'HTML/CSS', 'Machine Learning', 'Docker'
];

const CAREER_GOALS = [
  { id: 'Frontend Developer', label: 'Frontend Developer', desc: 'Sleek user interfaces, React, modern web standards' },
  { id: 'Backend Developer', label: 'Backend Developer', desc: 'APIs, databases, high scalability, microservices' },
  { id: 'Full Stack Developer', label: 'Full Stack Developer', desc: 'Complete client-to-cloud application lifecycle' },
  { id: 'Data Analyst', label: 'Data Analyst', desc: 'SQL, Python, statistical insights, dashboards' },
  { id: 'Data Scientist', label: 'Data Scientist', desc: 'Machine learning, predictive models, deep learning' },
  { id: 'DevOps Engineer', label: 'DevOps Engineer', desc: 'CI/CD, Kubernetes, cloud infra, automation' },
  { id: "I'm not sure", label: "I'm not sure (Guide Me)", desc: 'Let EduNexa AI analyze your interests & recommend a path' },
];

const AVAILABILITY_OPTIONS = [
  { id: '30 min/day', label: '30 min / day', desc: 'Light pace, 3.5 hrs/week. Great for busy schedules' },
  { id: '1 hour/day', label: '1 hour / day', desc: 'Balanced pace, 7 hrs/week. Recommended standard' },
  { id: '2 hours/day', label: '2 hours / day', desc: 'Accelerated pace, 14 hrs/week. Fast-track readiness' },
  { id: '10+ hours/week', label: '10+ hours / week (Intensive)', desc: 'Full immersion & deep-dive mastery' },
];

const PREFERENCE_OPTIONS = [
  { id: 'Videos', label: 'Videos', icon: '🎥', desc: 'Visual step-by-step explanations' },
  { id: 'Reading', label: 'Reading & Docs', icon: '📖', desc: 'In-depth articles and guides' },
  { id: 'Practical Coding', label: 'Practical Coding', icon: '💻', desc: 'Live in-browser code editor labs' },
  { id: 'Quizzes', label: 'Quizzes & Tests', icon: '🧠', desc: 'Active recall & diagnostic checks' },
  { id: 'Projects', label: 'Real-world Projects', icon: '🚀', desc: 'Portfolio-ready capstone builds' },
  { id: 'Examples', label: 'Code Examples', icon: '💡', desc: 'Deconstructed real-world snippets' },
];

export const OnboardingWizard = ({ initialData = {}, onComplete }) => {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationPhase, setGenerationPhase] = useState('Analyzing skill matrix...');

  // Form states
  const [formData, setFormData] = useState({
    name: initialData.name || 'Aarav Sharma',
    education: initialData.education || 'Undergraduate',
    college: initialData.college || 'National Institute of Technology',
    degree: initialData.degree || 'B.Tech Computer Science & Engineering',
    year: initialData.year || '3rd Year (2025)',
    interests: ['Web Development', 'AI / ML'],
    currentSkills: [
      { name: 'JavaScript', level: 'Intermediate', score: 65 },
      { name: 'React', level: 'Beginner', score: 40 },
      { name: 'Python', level: 'Intermediate', score: 70 },
      { name: 'SQL', level: 'Beginner', score: 45 },
    ],
    careerGoal: 'Full Stack Developer',
    learningAvailability: '1 hour/day',
    learningPreference: ['Videos', 'Practical Coding', 'Projects'],
  });

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Beginner');

  // Multi-select toggler helper
  const toggleInterest = (interestLabel) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestLabel)
        ? prev.interests.filter(i => i !== interestLabel)
        : [...prev.interests, interestLabel]
    }));
  };

  const togglePreference = (prefId) => {
    setFormData(prev => ({
      ...prev,
      learningPreference: prev.learningPreference.includes(prefId)
        ? prev.learningPreference.filter(p => p !== prefId)
        : [...prev.learningPreference, prefId]
    }));
  };

  const updateSkillLevel = (skillName, newLevel) => {
    const scoreMap = { 'Beginner': 40, 'Intermediate': 70, 'Advanced': 90 };
    setFormData(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.map(s => 
        s.name === skillName ? { ...s, level: newLevel, score: scoreMap[newLevel] } : s
      )
    }));
  };

  const removeSkill = (skillName) => {
    setFormData(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.filter(s => s.name !== skillName)
    }));
  };

  const addCustomSkill = () => {
    if (!newSkillName.trim()) return;
    if (formData.currentSkills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) return;
    const scoreMap = { 'Beginner': 40, 'Intermediate': 70, 'Advanced': 90 };
    setFormData(prev => ({
      ...prev,
      currentSkills: [
        ...prev.currentSkills, 
        { name: newSkillName.trim(), level: newSkillLevel, score: scoreMap[newSkillLevel] }
      ]
    }));
    setNewSkillName('');
  };

  const addPresetSkill = (name) => {
    if (formData.currentSkills.some(s => s.name === name)) return;
    setFormData(prev => ({
      ...prev,
      currentSkills: [...prev.currentSkills, { name, level: 'Beginner', score: 40 }]
    }));
  };

  // Final Action: Build My Learning Path ->
  const handleBuildLearningPath = () => {
    setIsGenerating(true);
    setGenerationProgress(15);
    setGenerationPhase('Connecting student baseline to Industry Skill Graph...');

    const timer1 = setTimeout(() => {
      setGenerationProgress(45);
      setGenerationPhase(`Evaluating ${formData.careerGoal} benchmark requirements...`);
    }, 900);

    const timer2 = setTimeout(() => {
      setGenerationProgress(78);
      setGenerationPhase('Synthesizing dynamic roadmap milestones & customized practice modules...');
    }, 1900);

    const timer3 = setTimeout(() => {
      setGenerationProgress(100);
      setGenerationPhase('Personalized EduNexa Workspace ready!');
      setTimeout(() => {
        completeOnboarding(formData);
      }, 700);
    }, 2900);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center subtle-mesh-bg">
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping opacity-75"></div>
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-500/25 text-white">
            <BrainCircuit className="w-12 h-12 animate-pulse text-white" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Generating Your AI Learning Path
        </h2>
        <p className="text-sm text-indigo-600 font-semibold mb-8 h-6 animate-pulse">
          {generationPhase}
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/80 mb-4 p-0.5">
          <div 
            className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${generationProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-400 font-mono">{generationProgress}% completed</p>

        {/* Dynamic AI Badge list preview */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-lg">
          <span className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200 font-medium">
            🎯 Target: {formData.careerGoal}
          </span>
          <span className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 font-medium">
            ⏳ Pace: {formData.learningAvailability}
          </span>
          <span className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200 font-medium">
            ⚡ {formData.currentSkills.length} Initial Skills Identified
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 subtle-mesh-bg">
      {/* Header */}
      <div className="max-w-3xl mx-auto w-full mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="EduNexa Logo" 
              className="h-10 w-auto object-contain rounded-lg"
            />
            <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
              AI Onboarding
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500">Step {step} of 6</span>
            <div className="w-24 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="mt-6 flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none">
          {[
            { s: 1, label: 'About You' },
            { s: 2, label: 'Interests' },
            { s: 3, label: 'Current Skills' },
            { s: 4, label: 'Career Goal' },
            { s: 5, label: 'Availability' },
            { s: 6, label: 'Preference' },
          ].map((item) => (
            <button
              key={item.s}
              onClick={() => item.s <= step && setStep(item.s)}
              disabled={item.s > step}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                step === item.s 
                  ? 'bg-white text-indigo-600 shadow-sm border border-indigo-200' 
                  : item.s < step 
                    ? 'text-slate-700 hover:text-indigo-600' 
                    : 'text-slate-400 cursor-not-allowed'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                step === item.s ? 'bg-indigo-600 text-white' : item.s < step ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {item.s < step ? '✓' : item.s}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Content Container */}
      <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl border border-slate-200/80 shadow-soft-lg p-6 sm:p-10 my-auto">
        
        {/* STEP 1: ABOUT YOU */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold mb-2">
                <GraduationCap className="w-4 h-4" /> Step 1 — Academic Profile
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Tell us about yourself</h2>
              <p className="text-sm text-slate-500 mt-1">This helps EduNexa calibrate course recommendations to your academic standing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Education Level</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option>Undergraduate (B.Tech / B.E / B.Sc / BCA)</option>
                  <option>Postgraduate (M.Tech / M.Sc / MCA)</option>
                  <option>High School / Diploma</option>
                  <option>Working Professional</option>
                  <option>Self-Taught Explorer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College / University Name</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. National Institute of Technology"
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Branch</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. Computer Science & Engineering"
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Academic Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option>1st Year (Freshman)</option>
                  <option>2nd Year (Sophomore)</option>
                  <option>3rd Year (Junior)</option>
                  <option>4th Year (Final Year / Senior)</option>
                  <option>Graduated / Alumni</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: INTERESTS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold mb-2">
                <Compass className="w-4 h-4" /> Step 2 — Exploration Areas
              </div>
              <h2 className="text-2xl font-bold text-slate-900">What tech fields excite you?</h2>
              <p className="text-sm text-slate-500 mt-1">Select all domains you'd like to explore and build projects in.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {INTEREST_OPTIONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = formData.interests.includes(item.label);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleInterest(item.label)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-sm' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${item.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                    </div>

                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: CURRENT SKILLS */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold mb-2">
                <Layers className="w-4 h-4" /> Step 3 — Current Skills Matrix
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Select your existing skills & proficiency</h2>
              <p className="text-sm text-slate-500 mt-1">Rate your confidence level so the AI doesn't teach you what you already know.</p>
            </div>

            {/* Quick Add Preset Skills Pill Cloud */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Quick Add Popular Technologies:</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_SKILLS.map(skill => {
                  const alreadyAdded = formData.currentSkills.some(s => s.name === skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => !alreadyAdded && addPresetSkill(skill)}
                      disabled={alreadyAdded}
                      className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1 transition-all ${
                        alreadyAdded 
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-default' 
                          : 'bg-white hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      {alreadyAdded ? '✓ ' : '+ '} {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Active Skills List */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">Your Configured Skills ({formData.currentSkills.length}):</label>
              {formData.currentSkills.length === 0 ? (
                <p className="text-xs text-slate-400 italic p-4 bg-slate-50 rounded-2xl text-center">
                  No skills added yet. Add preset skills above or custom skills below.
                </p>
              ) : (
                formData.currentSkills.map((skill) => (
                  <div 
                    key={skill.name}
                    className="p-3.5 bg-slate-50/70 border border-slate-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                      <span className="text-sm font-bold text-slate-800">{skill.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex bg-slate-200/70 p-1 rounded-xl gap-1">
                        {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => updateSkillLevel(skill.name, lvl)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                              skill.level === lvl 
                                ? 'bg-white text-indigo-700 shadow-sm font-bold' 
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeSkill(skill.name)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                        title="Remove skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Custom Skill Row */}
            <div className="p-3 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Or type another skill (e.g. Next.js, FastAPI, Rust)"
                className="flex-1 px-3 py-1.5 text-xs bg-transparent focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
              />
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                className="text-xs bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 focus:outline-none"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CAREER GOAL */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold mb-2">
                <Target className="w-4 h-4" /> Step 4 — Target Role Alignment
              </div>
              <h2 className="text-2xl font-bold text-slate-900">What career role are you aiming for?</h2>
              <p className="text-sm text-slate-500 mt-1">EduNexa will benchmark your current skills against industry hiring bars.</p>
            </div>

            <div className="space-y-2.5">
              {CAREER_GOALS.map((goal) => {
                const isSelected = formData.careerGoal === goal.id;
                return (
                  <div
                    key={goal.id}
                    onClick={() => setFormData({ ...formData, careerGoal: goal.id })}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-sm' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{goal.label}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{goal.desc}</p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: LEARNING AVAILABILITY */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold mb-2">
                <Clock className="w-4 h-4" /> Step 5 — Study Availability
              </div>
              <h2 className="text-2xl font-bold text-slate-900">How much time can you study?</h2>
              <p className="text-sm text-slate-500 mt-1">We adjust your daily study planner tasks to fit realistic milestones without burnout.</p>
            </div>

            <div className="space-y-3">
              {AVAILABILITY_OPTIONS.map((opt) => {
                const isSelected = formData.learningAvailability === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, learningAvailability: opt.id })}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-sm' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{opt.label}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: LEARNING PREFERENCES */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold mb-2">
                <BookOpen className="w-4 h-4" /> Step 6 — Learning Preferences
              </div>
              <h2 className="text-2xl font-bold text-slate-900">How do you prefer learning?</h2>
              <p className="text-sm text-slate-500 mt-1">Select your favorite formats to personalize resource curation and lab assignments.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PREFERENCE_OPTIONS.map((pref) => {
                const isSelected = formData.learningPreference.includes(pref.id);
                return (
                  <div
                    key={pref.id}
                    onClick={() => togglePreference(pref.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-sm' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pref.icon}</span>
                      <div>
                        <span className="text-sm font-bold text-slate-900">{pref.label}</span>
                        <p className="text-xs text-slate-500 mt-0.5">{pref.desc}</p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Card before Generating */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-cyan-50 border border-indigo-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Ready to build your custom curriculum?</p>
                <p className="text-[11px] text-slate-600">
                  EduNexa will compute your skill gaps and structure a 14-week milestone roadmap.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all hover:translate-x-0.5"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleBuildLearningPath}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-bold flex items-center gap-2.5 shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              Build My Learning Path →
            </button>
          )}
        </div>
      </div>

      {/* Footer minimal info */}
      <div className="text-center text-xs text-slate-400 mt-6">
        EduNexa AI Learning Operating System • Personalized for your academic journey
      </div>
    </div>
  );
};
