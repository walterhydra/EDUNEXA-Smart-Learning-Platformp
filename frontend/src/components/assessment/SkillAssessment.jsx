import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BrainCircuit, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  Zap,
  BarChart2
} from 'lucide-react';

export const SkillAssessment = () => {
  const { ASSESSMENTS, addXP, showToast, setActiveTab, setUser } = useApp();
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Timer countdown
  useEffect(() => {
    if (!activeQuiz || quizFinished || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeQuiz, quizFinished, timeLeft]);

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQIdx(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setTimeLeft(quiz.timeLimitMinutes * 60);
  };

  const handleSelectOption = (optionIndex) => {
    if (quizFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIdx]: optionIndex
    }));
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const earnedXP = Math.round(activeQuiz.rewardXP * (percentage / 100));
    
    addXP(earnedXP, `Assessment Result: ${percentage}%`);

    // Dynamically update user skill score based on quiz category
    setUser(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.map(sk => {
        if (sk.name.toLowerCase().includes(activeQuiz.category.toLowerCase())) {
          const updatedScore = Math.max(sk.score, percentage);
          return {
            ...sk,
            score: updatedScore,
            level: updatedScore > 80 ? 'Advanced' : updatedScore > 50 ? 'Intermediate' : 'Beginner'
          };
        }
        return sk;
      })
    }));

    showToast(`Test completed! Scored ${percentage}% (${correctCount}/${activeQuiz.questions.length})`, 'success');
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  // QUIZ RESULT VIEW
  if (activeQuiz && quizFinished) {
    const totalQ = activeQuiz.questions.length;
    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correctCount++;
    });
    const percentage = Math.round((correctCount / totalQ) * 100);

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-soft text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-slate-900">Diagnostic Assessment Complete!</h2>
          <p className="text-sm text-slate-500">{activeQuiz.title}</p>

          <div className="flex items-center justify-center gap-6 py-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 min-w-[120px]">
              <span className="text-xs text-slate-400 font-bold uppercase">Accuracy</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">{percentage}%</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 min-w-[120px]">
              <span className="text-xs text-slate-400 font-bold uppercase">Score</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{correctCount} / {totalQ}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 min-w-[120px]">
              <span className="text-xs text-slate-400 font-bold uppercase">Reward</span>
              <p className="text-2xl font-black text-amber-600 mt-1">+{Math.round(activeQuiz.rewardXP * (percentage/100))} XP</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startQuiz(activeQuiz)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Retake Test
            </button>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
            >
              <BarChart2 className="w-4 h-4" /> Check Updated Skill Gap
            </button>
            <button
              onClick={() => setActiveQuiz(null)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
            >
              All Assessments
            </button>
          </div>
        </div>

        {/* Question Review & AI Explanations */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Detailed AI Answer Breakdown:</h3>
          {activeQuiz.questions.map((q, qIndex) => {
            const userAns = selectedAnswers[qIndex];
            const isCorrect = userAns === q.correctAnswer;

            return (
              <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Question {qIndex + 1} of {totalQ}</span>
                  {isCorrect ? (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1 border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg flex items-center gap-1 border border-red-100">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>

                <p className="text-sm font-bold text-slate-900">{q.question}</p>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isOptionSelected = userAns === oIdx;
                    const isOptionCorrect = q.correctAnswer === oIdx;

                    let style = "bg-slate-50 border-slate-200 text-slate-700";
                    if (isOptionCorrect) style = "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold";
                    else if (isOptionSelected && !isOptionCorrect) style = "bg-red-50 border-red-300 text-red-900 line-through";

                    return (
                      <div key={oIdx} className={`p-3 rounded-xl border text-xs flex items-center justify-between ${style}`}>
                        <span>{opt}</span>
                        {isOptionCorrect && <span className="text-[10px] font-bold text-emerald-700">✓ Correct Answer</span>}
                      </div>
                    );
                  })}
                </div>

                {/* AI Explanation Callout */}
                <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> AI Concept Breakdown:
                  </div>
                  <p className="text-indigo-800 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ACTIVE QUIZ RUNNER VIEW
  if (activeQuiz) {
    const q = activeQuiz.questions[currentQIdx];
    const totalQ = activeQuiz.questions.length;
    const isLastQ = currentQIdx === totalQ - 1;

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12">
        {/* Quiz Runner Header */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-600">{activeQuiz.category} Diagnostic</span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">{activeQuiz.title}</h2>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3.5 py-1.5 rounded-xl border border-amber-200 text-xs font-mono font-bold shrink-0">
            <Clock className="w-4 h-4 text-amber-500" /> {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentQIdx + 1) / totalQ) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Question {currentQIdx + 1} of {totalQ}</span>
            <span className="text-indigo-600 font-bold">{Math.round(activeQuiz.rewardXP / totalQ)} XP</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {q.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQIdx] === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-500 shadow-sm ring-1 ring-indigo-500'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{opt}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => setCurrentQIdx(prev => Math.max(0, prev - 1))}
              disabled={currentQIdx === 0}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {isLastQ ? (
              <button
                onClick={finishQuiz}
                disabled={selectedAnswers[currentQIdx] === undefined}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 disabled:opacity-50"
              >
                Submit & Grade <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentQIdx(prev => prev + 1)}
                disabled={selectedAnswers[currentQIdx] === undefined}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 disabled:opacity-50"
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ALL ASSESSMENTS LIST VIEW
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
          <BrainCircuit className="w-3.5 h-3.5" /> Intelligent Diagnostic Assessments
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Skill Assessments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Take AI-calibrated competency evaluations to benchmark your practical knowledge. Scoring directly updates your live Skill Gap Matrix.
        </p>
      </div>

      {/* Assessment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ASSESSMENTS.map((quiz) => (
          <div key={quiz.id} className="white-card-interactive p-6 rounded-3xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {quiz.category}
                </span>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-500" /> +{quiz.rewardXP} XP
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-3 group-hover:text-indigo-600 transition-colors">
                {quiz.title}
              </h3>

              <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                <span>⏱ {quiz.timeLimitMinutes} Mins</span>
                <span>•</span>
                <span>📋 {quiz.questionsCount} Questions</span>
                <span>•</span>
                <span className="text-indigo-600 font-semibold">{quiz.level}</span>
              </div>
            </div>

            <button
              onClick={() => startQuiz(quiz)}
              className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all group-hover:bg-indigo-600"
            >
              Start Assessment <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
