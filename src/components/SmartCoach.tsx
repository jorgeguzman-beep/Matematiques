/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { 
  Sparkles, 
  BrainCircuit, 
  Flame, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  ArrowRight,
  BookMarked,
  Calendar,
  Layers,
  ArrowBigUp,
  Target
} from "lucide-react";

export default function SmartCoach() {
  const { userStats, setActiveTab, exercises, setCurrentPracticeExercise, bookmarkedFormulas } = useAppState();

  const [activeAnalysisField, setActiveAnalysisField] = useState<"math" | "physics" | "chemistry">("math");
  
  // Custom interactive AI Diagnostic tool
  const [targetScore, setTargetScore] = useState<number>(8.5);
  const [studyMinutesPerDay, setStudyMinutesPerDay] = useState<number>(45);
  const [generatedSchedule, setGeneratedSchedule] = useState<any[] | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const calculateAISuggestion = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Create custom tailored schedule based on selected parameters
      const schedule = [
        { day: "Dilluns", topic: "Àlgebra Lineal & Multiplicació vectorial", duration: `${studyMinutesPerDay} min`, focus: "Revisar comprovació d'ordre" },
        { day: "Dimecres", topic: "Probabilitat Total & Teorema de Bayes", duration: `${studyMinutesPerDay} min`, focus: "Diagrames en arbre de doble entrada" },
        { day: "Divendres", topic: "Equilibris Àcid-Base o integrals de Barrow", duration: `${studyMinutesPerDay} min`, focus: "Assolir objectiu de nota: ${targetScore}/10" },
        { day: "Dissabte", topic: "Simulacre general cronometrat interactiu", duration: "25 min", focus: "Gestió del temps d'examen real" }
      ];
      setGeneratedSchedule(schedule);
      setIsGenerating(false);
    }, 1200);
  };

  const launchTargetExercise = (id: string) => {
    const ex = exercises.find(e => e.id === id);
    if (ex) {
      setCurrentPracticeExercise(ex);
      setActiveTab("practice");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Smart Coach Header */}
      <div className="bg-[#0f172a] text-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#91c120]/5 rounded-bl-full pointer-events-none" />
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#91c120]/15 text-[#91c120] px-3 py-1 rounded-full text-xs font-bold font-mono">
            <Sparkles className="h-3.5 w-3.5 fill-[#91c120]" /> ENTRENADOR INTEL·LIGENT PAU
          </div>
          <h1 className="text-2xl font-bold tracking-tight">El teu ruster d'alto rendiment</h1>
          <p className="text-slate-300 text-xs max-w-xl">L'IA analitza les teves errades recents, temps d'estudi i formularis guardats per generar rutes d'estudi òptimes.</p>
        </div>
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/30 text-center shrink-0">
          <span className="text-[10px] text-slate-400 block font-bold uppercase">Predicció de Nota PAU</span>
          <span className="text-2xl font-extrabold text-[#91c120] block mt-0.5">8.7<span className="text-xs text-white">/10</span></span>
        </div>
      </div>

      {/* AI Diagnostic breakdown tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Diagnostics & gap analyzer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">Anàlisi de Gaps de Coneixement</h2>
              <div className="flex gap-1.5">
                {[
                  { id: "math", label: "Matemàtiques" },
                  { id: "physics", label: "Física" },
                  { id: "chemistry", label: "Química" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveAnalysisField(item.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      activeAnalysisField === item.id 
                        ? "bg-[#0f172a] text-white" 
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic panels mapping state */}
            {activeAnalysisField === "math" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl border border-red-100 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 font-bold">▲</span>
                    <div>
                      <span className="font-bold text-[#0f172a] block">Probabilitat Condicionada (Teorema de Bayes)</span>
                      <span className="text-slate-400 text-[10px]">Taxa de fallades: 38% en simulacres</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => launchTargetExercise("ex_mat_3")}
                    className="bg-white hover:bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded-lg font-bold"
                  >
                    Repassar error
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#91c120]/10 rounded-xl border border-[#91c120]/20 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-[#91c120] mt-0.5 font-bold">●</span>
                    <div>
                      <span className="font-bold text-[#0f172a] block">Àlgebra Lineal & Equacions Matricials</span>
                      <span className="text-slate-400 text-[10px]">Taxa d'encert: 85% d'eficiència</span>
                    </div>
                  </div>
                  <span className="text-[#91c120] font-bold pr-2">Temàtica dominada</span>
                </div>
              </div>
            )}

            {activeAnalysisField === "physics" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl border border-red-100 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 font-bold">▲</span>
                    <div>
                      <span className="font-bold text-[#0f172a] block">Òptica Geomètrica (Lents Primes)</span>
                      <span className="text-slate-400 text-[10px]">Falta repòs pràctic d'equació DIN</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab("formulas")}
                    className="bg-white hover:bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded-lg font-bold"
                  >
                    Veure Fórmula
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#91c120]/10 rounded-xl border border-[#91c120]/20 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-[#91c120] mt-0.5 font-bold">●</span>
                    <div>
                      <span className="font-bold text-[#0f172a] block">Cinemàtica i Camp Gravitatori</span>
                      <span className="text-slate-400 text-[10px]">Taxa d'encert: 72% en càlcul orbital terrestre</span>
                    </div>
                  </div>
                  <button
                    onClick={() => launchTargetExercise("ex_fis_1")}
                    className="bg-white hover:bg-emerald-50 border border-[#91c120]/30 text-[#91c120] px-3 py-1 rounded-lg font-bold"
                  >
                    Practicar
                  </button>
                </div>
              </div>
            )}

            {activeAnalysisField === "chemistry" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#91c120]/10 rounded-xl border border-[#91c120]/20 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-[#91c120] mt-0.5 font-bold">●</span>
                    <div>
                      <span className="font-bold text-[#0f172a] block">Equilibris Àcid-Base (pH de dissolució tampó)</span>
                      <span className="text-slate-400 text-[10px]">Excel·lent control de Henderson-Hasselbalch</span>
                    </div>
                  </div>
                  <button
                    onClick={() => launchTargetExercise("ex_qui_1")}
                    className="bg-white hover:bg-emerald-50 border border-[#91c120]/30 text-[#91c120] px-3 py-1 rounded-lg font-bold"
                  >
                    Veure pas a pas
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Interactive Custom AI Planner tool */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#91c120]" /> Generador de Rutes d'Estudi amb IA
            </h3>
            <p className="text-xs text-slate-500">Introdueix els teus paràmetres i l'entrenador planificarà l'esquema setmanal perfecte per a tu:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Parameter 1 */}
              <div>
                <label className="block text-[11px] font-bold text-slate-450 uppercase mb-1">Nota objectiu a la PAU</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="5.0" 
                    max="10.0" 
                    step="0.1" 
                    value={targetScore} 
                    onChange={(e) => setTargetScore(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#91c120]" 
                  />
                  <span className="text-sm font-bold text-[#0f172a] w-12 text-right">{targetScore}</span>
                </div>
              </div>

              {/* Parameter 2 */}
              <div>
                <label className="block text-[11px] font-bold text-slate-450 uppercase mb-1">Minuts d'estudi diaris disponibles</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="15" 
                    max="120" 
                    step="5" 
                    value={studyMinutesPerDay} 
                    onChange={(e) => setStudyMinutesPerDay(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#91c120]" 
                  />
                  <span className="text-sm font-bold text-[#0f172a] w-12 text-right">{studyMinutesPerDay}m</span>
                </div>
              </div>
            </div>

            <button
              onClick={calculateAISuggestion}
              disabled={isGenerating}
              className="w-full bg-[#0f172a] hover:bg-black text-white py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {isGenerating ? "Generant calendari ideal..." : "Calcular i Generar ruta d'estudi personalitzada"}
            </button>

            {/* Generated schedule blocks mapping */}
            {generatedSchedule && (
              <div className="pt-4 border-t border-slate-100 animate-fade-in space-y-3">
                <h4 className="text-xs font-bold text-[#0f172a]">Calendari personalitzat generat:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {generatedSchedule.map((item, id) => (
                    <div key={id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>{item.day}</span>
                        <span className="text-[#91c120]">{item.duration}</span>
                      </div>
                      <p className="text-xs font-bold text-[#0f172a]">{item.topic}</p>
                      <span className="text-[10px] text-slate-500 block">Focus: {item.focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Priorities column */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Prioritats d'Estudi</h3>
            
            {/* Bayes */}
            <div className="p-4 bg-red-50/50 border-l-4 border-l-red-500 rounded-r-xl space-y-2 relative overflow-hidden">
              <span className="text-[9px] font-bold tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded-md inline-block uppercase">Alta Prioritat</span>
              <h4 className="font-bold text-xs text-[#0f172a]">Repassa el Teorema de Bayes</h4>
              <p className="text-[10px] text-slate-500 leading-normal">Has fallat 2 exercicis en les últimes 48 hores.</p>
              <button 
                onClick={() => launchTargetExercise("ex_mat_1")}
                className="text-[11px] font-extrabold text-red-700 flex items-center gap-1 hover:text-[#91c120] transition-colors"
              >
                Començar Repàs <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Trial exam */}
            <div className="p-4 bg-blue-50/50 border-l-4 border-l-blue-600 rounded-r-xl space-y-2">
              <span className="text-[9px] font-bold tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md inline-block uppercase">PROPER PAS RECOMANAT</span>
              <h4 className="font-bold text-xs text-[#0f172a]">Simulacre curt de Probabilitat</h4>
              <p className="text-[10px] text-slate-500 leading-normal">Un test de 15 minuts dissenyat per consolidar conceptes.</p>
              <button 
                onClick={() => setActiveTab("exams")}
                className="text-[11px] font-extrabold text-blue-700 flex items-center gap-1 hover:text-[#91c120] transition-colors"
              >
                Començar <ArrowRight className="h-3 w-3" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
