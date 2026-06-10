/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useAppState } from "../context/AppContext";
import { EXAM_QUESTIONS } from "../data";
import { 
  Timer, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Play, 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw,
  Award,
  BookOpen,
  Check
} from "lucide-react";

export default function ExamSimulation() {
  const { 
    examAnswers, 
    setExamAnswer, 
    isExamSubmitted, 
    submitExam, 
    correctAnswersCount, 
    resetExam, 
    activeExamIndex, 
    setActiveExamIndex 
  } = useAppState();

  const [timeRemaining, setTimeRemaining] = useState(5090); // 01:24:50
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  // Timer logic
  useEffect(() => {
    if (showWelcomeScreen || isExamSubmitted) return;
    
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showWelcomeScreen, isExamSubmitted]);

  const formatTime = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    resetExam();
    setShowWelcomeScreen(false);
  };

  const currentQuestion = EXAM_QUESTIONS[activeExamIndex];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {showWelcomeScreen ? (
        /* Welcome start screen */
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-[#0f172a] text-[#91c120] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#91c120]/10">
            <Timer className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Simulacre PAU Interactiu</h1>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              Preparat per sotmetre't a una prova tipus test d'alt de rendiment científic? Aquest exercici simula l'estructura directa d'exàmens del batxillerat PAU de Matemàtiques, Física i Química de manera fluida i sense formularis pesats.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#91c120]" />
              <span>3 Preguntes complexes adaptades de selectivitat oficial</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#91c120]" />
              <span>Timer limitat: 01:24:50 de resolució</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#91c120]" />
              <span>Feedback intel·ligent immediat o en lliurar la fulla d'exàmens</span>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full bg-[#91c120] hover:bg-black text-black hover:text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Play className="h-4 w-4 fill-current" /> Iniciar Simulacre Actiu
          </button>
        </div>
      ) : (
        /* Exam in progress */
        <div className="space-y-6">
          {/* Header containing timer, progress indicator */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">Pregunta {activeExamIndex + 1} de {EXAM_QUESTIONS.length}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold font-mono bg-slate-50 text-[#0f172a] px-3.5 py-1.5 rounded-full border border-slate-150">
                <Timer className={`h-4 w-4 ${timeRemaining < 600 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
                <span>{formatTime(timeRemaining)}</span>
              </div>
              
              {!isExamSubmitted && (
                <button
                  onClick={submitExam}
                  className="bg-[#0f172a] hover:bg-[#91c120] text-white hover:text-black hover:font-bold px-4 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm"
                >
                  Finalitzar Examen
                </button>
              )}
            </div>
          </div>

          {/* Core progress tracker bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#91c120] transition-all duration-350"
              style={{ width: `${((activeExamIndex + 1) / EXAM_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Score overview inside exam if submitted */}
          {isExamSubmitted && (
            <div className="bg-white p-6 rounded-2xl border-2 border-[#91c120] shadow-sm text-center">
              <Award className="h-10 w-10 text-[#91c120] mx-auto" />
              <h2 className="text-xl font-bold text-[#0f172a] mt-2">Simulacre Completat amb èxit!</h2>
              <p className="text-sm text-slate-500 mt-1">Has obtingut un <span className="font-extrabold text-[#91c120]">{((correctAnswersCount / EXAM_QUESTIONS.length) * 10).toFixed(1)}/10</span> en aquesta prova pilot.</p>
              
              <div className="mt-4 flex flex-col md:flex-row gap-2 justify-center">
                <button
                  onClick={resetExam}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-550 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-100 mx-auto md:mx-0"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Recomençar examen
                </button>
                <button
                  onClick={() => setShowWelcomeScreen(true)}
                  className="bg-[#91c120] hover:bg-black text-black hover:text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm"
                >
                  Menu d'exàmens
                </button>
              </div>
            </div>
          )}

          {/* Active Question Box */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{currentQuestion.subject} · {currentQuestion.topic}</span>
            <p className="text-[#0f172a] font-semibold text-base leading-relaxed">{currentQuestion.questionText}</p>
          </div>

          {/* Large selectable answers list */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option) => {
              const questionId = currentQuestion.id;
              const isSelected = examAnswers[questionId] === option.key;
              const hasCorrectValue = option.isCorrect;

              // Compute color feedback
              let buttonStyle = "border-slate-100 bg-white text-slate-700 hover:border-[#91c120]/60 hover:bg-slate-50";
              let badgeStyle = "bg-slate-100 text-slate-500";
              let badgeText = option.key;

              if (isExamSubmitted || isSelected) {
                // If the user selected this option
                if (isSelected) {
                  if (hasCorrectValue) {
                    buttonStyle = "border-[#91c120] bg-[#91c120]/10 text-slate-800 shadow-sm";
                    badgeStyle = "bg-[#91c120] text-black font-extrabold";
                  } else {
                    buttonStyle = "border-red-200 bg-red-50 text-red-900 shadow-sm";
                    badgeStyle = "bg-red-500 text-white font-extrabold";
                  }
                } else if (hasCorrectValue) {
                  // highlight core correct answer if submitted even if unselected
                  buttonStyle = "border-[#91c120]/60 bg-[#91c120]/5 text-slate-700";
                  badgeStyle = "bg-[#91c120]/80 text-black";
                }
              }

              return (
                <button
                  key={option.key}
                  onClick={() => setExamAnswer(questionId, option.key)}
                  disabled={isExamSubmitted}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left font-medium transition-all text-sm group ${buttonStyle}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] ${badgeStyle}`}>
                    {badgeText}
                  </div>
                  <span className="flex-1 lg:max-w-2xl text-xs font-medium leading-relaxed font-sans">{option.text}</span>
                  
                  {isExamSubmitted && hasCorrectValue && (
                    <span className="text-xs font-bold text-[#91c120] flex items-center gap-1 shrink-0 bg-[#91c120]/10 px-2 py-0.5 rounded-full">
                      <Check className="h-3 w-3 stroke-[2.5]" /> Resposta Correcta
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered and submitted or checked */}
          {(isExamSubmitted || examAnswers[currentQuestion.id]) && (
            <div className={`p-5 rounded-2xl text-xs leading-relaxed ${
              examAnswers[currentQuestion.id] && currentQuestion.options.find(o => o.key === examAnswers[currentQuestion.id])?.isCorrect
                ? 'bg-[#91c120]/10 border border-[#91c120]/30 text-slate-800' 
                : 'bg-slate-50 border border-slate-150 text-slate-600'
            }`}>
              <h4 className="font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-[#0f172a]" /> Explicació i justificació
              </h4>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Next - previous control buttons */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <button
              onClick={() => setActiveExamIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeExamIndex === 0}
              className={`flex items-center gap-1.5 text-xs font-bold ${
                activeExamIndex === 0 ? 'text-slate-300 pointer-events-none' : 'text-[#0f172a] hover:text-[#91c120] transition-colors'
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Anterior
            </button>

            <span className="text-xs text-slate-400 font-mono tracking-wide">{activeExamIndex + 1} / {EXAM_QUESTIONS.length}</span>

            {activeExamIndex < EXAM_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setActiveExamIndex((prev) => prev + 1)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#0f172a] hover:text-[#91c120] transition-colors"
              >
                Següent <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              !isExamSubmitted ? (
                <button
                  onClick={submitExam}
                  className="bg-[#91c120] hover:bg-black hover:text-white text-black font-extrabold px-5 py-2 rounded-xl text-xs transition-all shadow-sm"
                >
                  Confirmar i Lliurar Examen
                </button>
              ) : (
                <span className="text-xs font-bold text-[#91c120]">Lliurat amb èxit!</span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
