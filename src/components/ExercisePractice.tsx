/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { Difficulty, SubjectName, Exercise } from "../types";
import { 
  Search, 
  ChevronRight, 
  CheckCircle, 
  Compass, 
  Lightbulb, 
  AlertTriangle, 
  ArrowLeft,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Hash,
  Activity
} from "lucide-react";

export default function ExercisePractice() {
  const { 
    exercises, 
    completedExercises, 
    completeExercise,
    currentPracticeExercise, 
    setCurrentPracticeExercise 
  } = useAppState();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("Tots");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Tots");

  // Step-by-step unfolding active step index
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
    0: true, // first expand by default
  });

  const [reviewSuccess, setReviewSuccess] = useState(false);

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Filter exercises
  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = 
      ex.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ex.statement.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = 
      selectedSubject === "Tots" || 
      (selectedSubject === "Matemàtiques" && ex.subject === SubjectName.MATEMATIQUES) ||
      (selectedSubject === "Física" && ex.subject === SubjectName.FISICA) ||
      (selectedSubject === "Química" && ex.subject === SubjectName.QUIMICA);

    const matchesDiff = 
      selectedDifficulty === "Tots" || 
      ex.difficulty === selectedDifficulty;

    return matchesSearch && matchesSubject && matchesDiff;
  });

  const getSubjectColor = (subject: SubjectName) => {
    switch (subject) {
      case SubjectName.MATEMATIQUES: return "blue";
      case SubjectName.FISICA: return "indigo";
      case SubjectName.QUIMICA: return "emerald";
      default: return "slate";
    }
  };

  const handleCompletePractice = (exerciseId: string) => {
    completeExercise(exerciseId);
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setCurrentPracticeExercise(null);
      setExpandedSteps({ 0: true }); // reset steps expanded state
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {!currentPracticeExercise ? (
        <>
          {/* Top banner */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h1 className="text-2xl font-bold text-[#0f172a]">Practicar per temes</h1>
            <p className="text-slate-500 text-sm mt-1">Selecciona l'esquema d'estudi amb resolució guiada pas a pas de l'examen de selectivitat.</p>
          </div>

          {/* Search and filter controls */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative w-full md:flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                placeholder="Cerca temes, conceptes clau, enunciats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#91c120]/20 focus:border-[#91c120] transition-all"
              />
            </div>

            {/* Subject Filters */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {["Tots", "Matemàtiques", "Física", "Química"].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedSubject === sub 
                      ? "bg-[#0f172a] text-white" 
                      : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Difficulty Filters */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={() => setSelectedDifficulty("Tots")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedDifficulty === "Tots" 
                    ? "bg-[#91c120] text-black" 
                    : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                }`}
              >
                Tots els nivells
              </button>
              {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    selectedDifficulty === diff 
                      ? "bg-[#91c120] border-[#91c120] text-black font-bold shadow-sm"
                      : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Exercises dynamic list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((ex) => {
                const isCompleted = completedExercises.includes(ex.id);
                const subColor = getSubjectColor(ex.subject);

                return (
                  <button
                    key={ex.id}
                    id={ex.idAttr}
                    onClick={() => {
                      setCurrentPracticeExercise(ex);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-left bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-[#91c120] hover:shadow-md transition-all group shrink-0 relative flex flex-col justify-between min-h-[170px]"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                          subColor === "blue" ? "bg-blue-50 text-blue-600" :
                          subColor === "indigo" ? "bg-indigo-50 text-indigo-600" :
                          "bg-emerald-50 text-emerald-600"
                        }`}>
                          {ex.subject} · {ex.difficulty}
                        </span>
                        
                        <ChevronRight className="h-4 w-4 text-slate-350 group-hover:translate-x-1 transition-transform" />
                      </div>

                      <h3 className="font-bold text-[#0f172a] text-base mt-3 leading-snug group-hover:text-[#91c120] transition-colors">{ex.topic}</h3>
                      <p className="text-xs text-slate-450 mt-1 line-clamp-2 leading-relaxed">{ex.statement}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between w-full">
                      <span className="text-[11px] text-slate-400 font-medium">Temps estimat: {ex.estimatedTimeMin} min</span>
                      {isCompleted ? (
                        <span className="text-xs text-[#91c120] font-bold flex items-center gap-1 bg-[#91c120]/10 px-2.5 py-0.5 rounded-full">
                          <CheckCircle className="h-3.5 w-3.5 fill-[#91c120] text-white" /> Completat
                        </span>
                      ) : (
                        <span className="text-xs text-[#0f172a] font-bold group-hover:text-[#91c120] transition-colors">
                          Clica per resoldre →
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="col-span-1 md:col-span-2 py-12 text-center bg-white rounded-2xl border border-slate-150">
                <HelpCircle className="h-10 w-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-700 mt-2">Cap exercici coincideix</h3>
                <p className="text-xs text-slate-400 mt-1">Reajusta els teus filtres de cerca i dificultat.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* RESOLUCIÓ PAS A PAS (Active guided solving screen) */
        <div className="space-y-6 animate-fade-in pb-16">
          {/* Top navigation actions */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <button
              onClick={() => {
                setCurrentPracticeExercise(null);
                setExpandedSteps({ 0: true });
              }}
              className="flex items-center gap-2 text-xs font-bold text-[#0f172a] hover:text-[#91c120] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Tornar a la pràctica
            </button>
            <span className="text-xs font-bold text-[#0f172a]">RESOLUCIÓ GUIADA PAS A PAS</span>
          </div>

          {/* Statement Board */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border-t-4 border-t-[#0f172a] border-x border-b border-slate-100 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{currentPracticeExercise.subject} · {currentPracticeExercise.topic}</span>
            <h2 className="text-lg font-bold text-[#0f172a] mt-1 leading-snug">Enunciat del problema</h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed bg-slate-50 p-4 rounded-xl font-medium border border-slate-100/50">
              {currentPracticeExercise.statement}
            </p>
            {currentPracticeExercise.mathFormula && (
              <div className="mt-4 p-4 bg-slate-800 text-[#91c120] rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner">
                {currentPracticeExercise.mathFormula}
              </div>
            )}
          </div>

          {/* Pedagogy Guided Steps (Collapsibles) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">Passos estructurats d'exercici</h3>
            
            {currentPracticeExercise.steps.map((step, idx) => {
              const isExpanded = !!expandedSteps[idx];
              return (
                <div key={idx} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleStep(idx)}
                    className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50 transition-colors border-b border-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#0f172a] text-[#91c120] font-mono text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-sm text-[#0f172a]">{step.title}</span>
                    </div>
                    <span className="text-xs text-[#0f172a] font-bold">
                      {isExpanded ? "Plegar" : "Desplegar"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="p-4 md:p-6 space-y-3 bg-white animate-fade-in">
                      <p className="text-xs text-slate-550 leading-relaxed whitespace-pre-wrap">
                        {step.explanation}
                      </p>
                      {step.mathBlock && (
                        <div className="p-3 bg-slate-50 border-l-4 border-l-[#91c120] text-xs font-mono font-bold text-[#0f172a] rounded-r-md">
                          {step.mathBlock}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* PAU Strategy Panel */}
          <div className="bg-blue-50 border-l-4 border-l-blue-600 p-5 rounded-r-xl flex gap-3.5 shadow-sm">
            <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-blue-900 uppercase tracking-wider">Estratègia de Selectivitat PAU</h4>
              <p className="text-xs text-blue-700 mt-1 leading-relaxed">{currentPracticeExercise.pauStrategy}</p>
            </div>
          </div>

          {/* Typical Error Warnings */}
          <div className="bg-amber-50 border-l-4 border-l-amber-500 p-5 rounded-r-xl flex gap-3.5 shadow-sm">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider">Alerta d'Errors Freqüents de Correctors</h4>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">{currentPracticeExercise.typicalMistake}</p>
            </div>
          </div>

          {/* Finished verification card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Solució numèrica final confirmada</span>
              <span className="text-base font-extrabold text-[#0f172a] mt-1 block">Resultat: <span className="text-[#91c120]">{currentPracticeExercise.finalResultText}</span></span>
            </div>
            
            {reviewSuccess ? (
              <div className="text-center px-6 py-2 bg-[#91c120] text-[#0f172a] font-bold text-sm rounded-xl animate-bounce font-sans">
                ✅ Increïble! +150 XP acumulats ambèxit!
              </div>
            ) : (
              <button
                onClick={() => handleCompletePractice(currentPracticeExercise.id)}
                className="bg-[#91c120] hover:bg-black hover:text-white text-black px-6 py-3 rounded-xl font-bold text-sm transition-all focus:ring-4 focus:ring-[#91c120]/20 flex items-center gap-2 shadow-md shadow-[#91c120]/15 font-sans"
              >
                Entès, marcar com completat <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
