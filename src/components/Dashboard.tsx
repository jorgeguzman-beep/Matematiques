/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useAppState } from "../context/AppContext";
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Play, 
  FileText, 
  AlertTriangle, 
  BookMarked, 
  ChevronRight, 
  CheckCircle, 
  Award,
  BookOpen,
  Atom,
  ChevronUp,
  Sliders,
  Sparkles
} from "lucide-react";

export default function Dashboard() {
  const { userStats, setActiveTab, exercises, setCurrentPracticeExercise } = useAppState();

  // Quick launch helper
  const handleStartPractice = () => {
    // pre-select first exercise and launch it to practice
    const firstEx = exercises[0];
    setCurrentPracticeExercise(firstEx);
    setActiveTab("practice");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section with fire streak */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <span className="text-[#91c120] font-bold text-xs uppercase tracking-widest bg-[#91c120]/10 px-3 py-1 rounded-full">DASHBOARD ACADÈMIC DE NOVA GENERACIÓ</span>
          <h1 className="text-3xl font-bold text-[#0f172a] mt-2 tracking-tight">Benvingut, Marc!</h1>
          <p className="text-slate-500 text-sm mt-1">Plataforma inteligente de preparació per Matemàtiques, Física i Química PAU/EBAU.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl text-amber-700 animate-pulse">
            <Flame className="h-6 w-6 stroke-[2.5] fill-amber-500 text-amber-500" />
            <div className="text-left">
              <span className="block text-xs text-amber-600 font-medium leading-none">Racha actiu</span>
              <span className="font-bold text-lg leading-tight">{userStats.streak} dies seguits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Mastery */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">DOMINI TOTAL</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-extrabold text-[#0f172a]">{userStats.successRate}%</span>
              <span className="text-xs font-semibold text-[#91c120] flex items-center gap-0.5">
                <ChevronUp className="h-4 w-4 stroke-[3]" /> +1.4% aquest mes
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Rendiment Global</span>
              <span>68% d'excel·lència</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#91c120] rounded-full" style={{ width: "68%" }}></div>
            </div>
          </div>
        </div>

        {/* Hours Studed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">HORES D'ESTUDI EFECTIU</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-extrabold text-[#0f172a]">{userStats.hoursStudied}h</span>
              <span className="text-xs text-slate-500">en sessions de focus actiu</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-slate-450" /> Mitjana setmanal: 6h
            </span>
            <span className="text-[#91c120] font-semibold bg-[#91c120]/10 px-2 py-0.5 rounded-full">Alt rendiment</span>
          </div>
        </div>

        {/* Accuracy Rate */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-sans">COMPRESSIÓ INTEL·LIGENT</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-extrabold text-[#0f172a]">{userStats.completedCount}</span>
              <span className="text-xs text-slate-500">exercicis PAU practicats</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-slate-500">
            <span>Balanç de resolució</span>
            <span className="text-[#91c120] font-bold font-mono">Apte PAU garantit</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
          <span>Accés Ràpid d'Alt Rendiment</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={handleStartPractice}
            className="flex flex-col items-start p-4 bg-gradient-to-br from-[#0f172a] to-slate-900 text-white rounded-2xl shadow-sm text-left hover:scale-[1.03] transition-all group"
          >
            <div className="bg-[#91c120] text-black p-2.5 rounded-xl mb-4 group-hover:rotate-6 transition-transform">
              <Play className="h-4 w-4 fill-current stroke-[2.5]" />
            </div>
            <span className="font-bold text-sm block">Continuar Pràctica</span>
            <span className="text-[11px] text-slate-300 mt-1">Següent tema d'Anàlisi</span>
          </button>

          <button 
            onClick={() => setActiveTab("exams")}
            className="flex flex-col items-start p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-left hover:scale-[1.03] hover:border-[#91c120] transition-all group lg:min-h-[140px]"
          >
            <div className="bg-slate-100 text-[#0f172a] p-2.5 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <FileText className="h-4 w-4 stroke-[2.5]" />
            </div>
            <span className="font-bold text-sm block text-[#0f172a]">Simulacre PAU</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Test cronometrat 4 opcions</span>
          </button>

          <button 
            onClick={() => {
              // open first exercise directly (usually Bayes has errors)
              setCurrentPracticeExercise(exercises[2]);
              setActiveTab("practice");
            }}
            className="flex flex-col items-start p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-left hover:scale-[1.03] hover:border-red-200 transition-all group"
          >
            <div className="bg-red-50 text-red-655 p-2.5 rounded-xl mb-4 text-red-500">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm block text-[#0f172a]">Errors Freqüents</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Analitza i corregeix falles</span>
          </button>

          <button 
            onClick={() => setActiveTab("formulas")}
            className="flex flex-col items-start p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-left hover:scale-[1.03] hover:border-blue-200 transition-all group"
          >
            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl mb-4">
              <BookMarked className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm block text-[#0f172a]">Fórmules i Repòs</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Repàs d'equacions ràpid</span>
          </button>
        </div>
      </div>

      {/* Two columns layout: Subject breakdown and Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Subject Mastery */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-[#0f172a]">Estadístiques per Assignatura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mathematics */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[#0f172a] font-bold text-xs uppercase bg-slate-105 px-2.5 py-1 rounded-full">MATEMÀTIQUES II</span>
                <span className="block text-2xl font-extrabold text-[#0f172a] mt-4">85% <span className="text-xs font-normal text-slate-400">Domini</span></span>
              </div>
              <div className="mt-6">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#91c120] rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-[10px] text-[#91c120] font-bold mt-1 block">Brillant · Alta precisió</span>
              </div>
            </div>

            {/* Physics */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[#0f172a] font-bold text-xs uppercase bg-slate-105 px-2.5 py-1 rounded-full">FÍSICA II</span>
                <span className="block text-2xl font-extrabold text-[#0f172a] mt-4">60% <span className="text-xs font-normal text-slate-400">Domini</span></span>
              </div>
              <div className="mt-6">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#91c120] rounded-full" style={{ width: "60%" }}></div>
                </div>
                <span className="text-[10px] text-amber-500 font-bold mt-1 block">Falta repassar òptica</span>
              </div>
            </div>

            {/* Chemistry */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[#0f172a] font-bold text-xs uppercase bg-slate-105 px-2.5 py-1 rounded-full">QUÍMICA II</span>
                <span className="block text-2xl font-extrabold text-[#0f172a] mt-4">76% <span className="text-xs font-normal text-slate-400">Domini</span></span>
              </div>
              <div className="mt-6">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#91c120] rounded-full" style={{ width: "76%" }}></div>
                </div>
                <span className="text-[10px] text-[#91c120] font-bold mt-1 block">Equilibri dominat</span>
              </div>
            </div>
          </div>

          {/* AI recommendations highlight */}
          <div className="p-5 bg-gradient-to-r from-[#0f172a] to-slate-900 rounded-2xl text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#91c120] text-black p-2.5 rounded-xl shrink-0">
                <Sparkles className="h-5 w-5 fill-[#0f172a] text-[#0f172a]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Recomanació personalitzada de l'IA Coach</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">Hem analitzat les teves últimes errades: l'estadística i les lents d'òptica tenen prioritat de repàs abans del simulacre general de demà.</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab("coach")}
              className="bg-[#91c120] text-[#0f172a] hover:bg-white hover:text-[#0f172a] px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0"
            >
              Començar Ara
            </button>
          </div>
        </div>

        {/* Right: Recent activity history logs */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#0f172a]">Últimes Sessions</h2>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            
            {/* Item 1 */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
              <div className="bg-[#91c120]/10 text-[#91c120] p-2 rounded-lg shrink-0">
                <CheckCircle className="h-4 w-4 stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#0f172a] truncate">Teorema de Bayes aplicat</p>
                <span className="text-[10px] text-slate-400 block mt-0.5">Fa 2 hores · Matemàtiques II</span>
              </div>
              <span className="text-[10px] font-bold text-[#91c120] bg-[#91c120]/10 px-2 py-0.5 rounded-full">+150 XP</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-lg shrink-0">
                <Award className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#0f172a] truncate">Simulacre PAU resolt</p>
                <span className="text-[10px] text-slate-400 block mt-0.5">Ahir · Qualificació: 8.5/10</span>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">+300 XP</span>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
              <div className="bg-slate-100 text-slate-600 p-2 rounded-lg shrink-0">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#0f172a] truncate">L'equació de les lents primes</p>
                <span className="text-[10px] text-slate-400 block mt-0.5">Fa 2 dies · Repàs de Fórmules</span>
              </div>
              <span className="text-[10px] font-bold text-[#91c120] bg-[#91c120]/10 px-2 py-0.5 rounded-full">+50 XP</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
