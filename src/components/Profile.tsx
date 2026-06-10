/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { 
  User, 
  Settings, 
  Award, 
  TrendingUp, 
  Target, 
  Compass, 
  CheckCircle, 
  Calendar,
  Sparkles,
  BookOpen
} from "lucide-react";

export default function Profile() {
  const { userStats } = useAppState();

  const [userName, setUserName] = useState("Marc");
  const [targetDegree, setTargetDegree] = useState("Enginyeria de Tecnologies Aeroespacials");
  const [targetUni, setTargetUni] = useState("Universitat Politècnica de Catalunya (UPC)");
  const [requiredScore, setRequiredScore] = useState(12.87);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Profile Card banner */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full border-4 border-[#91c120]/40 shadow-inner bg-[#0f172a] font-sans font-bold text-3xl text-[#91c120] flex items-center justify-center shrink-0">
          M
        </div>
        <div className="text-center md:text-left space-y-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0f172a]">{userName}</h1>
            <span className="text-[10px] font-bold tracking-wider text-[#91c120] bg-[#91c120]/10 px-2.5 py-0.5 rounded-full uppercase self-center">Estudiant Premium</span>
          </div>
          <p className="text-sm text-slate-500">Institut Pere Calders · Matrícula de Honor en curs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academics and Goals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <Target className="h-4.5 w-4.5 text-[#91c120]" /> Objectiu PAU / Selectivitat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Grau Objectiu</label>
                <input 
                  type="text" 
                  value={targetDegree}
                  onChange={(e) => setTargetDegree(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#91c120]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Universitat de Destí</label>
                <input 
                  type="text" 
                  value={targetUni}
                  onChange={(e) => setTargetUni(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#91c120]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nota de Tall requerida (sobre 14)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={requiredScore}
                  onChange={(e) => setRequiredScore(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#91c120]"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100 mt-5">
                <Compass className="h-5 w-5 text-blue-600 shrink-0" />
                <span className="text-[11px] text-blue-700 leading-normal">La teva mitjana actual batxillerat és 9.60. Necessites un 8.40 a les PAU fase general per entrar amb èxit!</span>
              </div>
            </div>
          </div>

          {/* Gamification milestones list */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-[#91c120]" /> Assoliments Acadèmics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <h4 className="font-bold text-xs text-[#0f172a]">Racha Constat</h4>
                  <p className="text-[10px] text-slate-400">Atansa 12 dies seguits de repàs PAU</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-bold text-xs text-[#0f172a]">Velocitat Llum</h4>
                  <p className="text-[10px] text-slate-400">Resol un simulacre en -20 minuts</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                <span className="text-2xl">📐</span>
                <div>
                  <h4 className="font-bold text-xs text-[#0f172a]">Geòmetra Suprem</h4>
                  <p className="text-[10px] text-slate-400">Completa 5 exercicis de rectes vectorials</p>
                </div>
              </div>

              <div className="p-3.5 bg-[#91c120]/10 rounded-xl border border-[#91c120]/25 flex items-center gap-3">
                <span className="text-2xl text-[#91c120]">✓</span>
                <div>
                  <h4 className="font-bold text-xs text-[#0f172a]">Domini de Bayes</h4>
                  <p className="text-[10px] text-slate-505">Perfecte 100% resolt d'arbre probabilitari</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Status progress card */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detall de Nivell</h3>
            
            <div className="w-20 h-20 bg-[#0f172a] text-[#91c120] rounded-full mx-auto flex flex-col items-center justify-center font-bold relative shadow-md">
              <span className="text-[11px] uppercase tracking-wider block leading-none">Nivell</span>
              <span className="text-3xl font-extrabold mt-0.5 leading-none">{userStats.level}</span>
            </div>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">Et falten {userStats.xpNextLevel - userStats.xp} XP per pujar al proper nivell académic superior!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
