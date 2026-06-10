/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { 
  Home, 
  BookOpen, 
  Atom, 
  TrendingUp, 
  Award, 
  User, 
  BrainCircuit, 
  BookMarked,
  Flame,
  Menu,
  X,
  Sparkles,
  HelpCircle,
  Settings,
  LogOut
} from "lucide-react";

export function Sidebar() {
  const { activeTab, setActiveTab, userStats } = useAppState();

  const menuItems = [
    { id: "dashboard", label: "Inici", icon: Home },
    { id: "practice", label: "Practicar", icon: BookOpen },
    { id: "exams", label: "Simulacre PAU", icon: Atom },
    { id: "formulas", label: "Fórmules", icon: BookMarked },
    { id: "coach", label: "Entrenador IA", icon: BrainCircuit, badge: "Actiu" },
    { id: "profile", label: "El meu Perfil", icon: User }
  ];

  return (
    <aside className="hidden lg:flex flex-col h-screen w-80 fixed left-0 top-0 bg-[#0f172a] text-slate-100 p-6 z-30 justify-between border-r border-slate-800/40">
      <div>
        {/* Brand header */}
        <div className="flex items-center gap-3 mb-10 px-2 mt-2">
          <div className="bg-[#91c120] text-[#0f172a] p-2 rounded-xl flex items-center justify-center shadow-sm">
            <Award className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-lg tracking-tight text-white leading-tight">PAU Màsters</h1>
            <span className="text-[10px] text-[#91c120] font-bold tracking-widest uppercase block mt-0.5">ESTUDI INTEGRAT</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="mb-8 p-4 bg-slate-800/20 rounded-2xl border border-slate-800/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#91c120]/30 bg-slate-800 font-bold text-sm text-[#91c120] flex items-center justify-center">
              M
            </div>
            <div>
              <h2 className="font-semibold text-sm text-white">Marc</h2>
              <p className="text-[11px] text-slate-400">Preparació PAU 2026</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#91c120] font-bold bg-[#91c120]/15 px-2 py-0.5 rounded-md">Nivell {userStats.level}</span>
            <span className="text-slate-400 font-mono">{userStats.xp} / {userStats.xpNextLevel} XP</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
            <div className="h-full bg-[#91c120] rounded-full transition-all duration-300" style={{ width: `${(userStats.xp / userStats.xpNextLevel) * 100}%` }}></div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 text-left border-l-2 ${
                  isActive 
                    ? "bg-[#91c120]/10 border-[#91c120] text-[#91c120] font-semibold" 
                    : "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/30"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-[#91c120] text-[#0f172a]' : 'bg-[#91c120]/10 text-[#91c120]'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800/40 pt-4 flex flex-col gap-1 text-slate-400">
        <button onClick={() => setActiveTab("profile")} className="flex items-center gap-3 px-4 py-2 hover:text-white text-xs transition-colors">
          <Settings className="h-4 w-4" />
          <span>Configuració</span>
        </button>
        <button onClick={() => alert("Sessió tancada correctament.")} className="flex items-center gap-3 px-4 py-2 hover:text-red-400 text-xs transition-colors">
          <LogOut className="h-4 w-4" />
          <span>Tancar Sessió</span>
        </button>
      </div>
    </aside>
  );
}

export function MobileHeader({ onToggleMenu }: { onToggleMenu: () => void }) {
  const { userStats, activeTab } = useAppState();

  const getTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Inici";
      case "practice": return "Practicar per Temes";
      case "exams": return "Simulacre PAU";
      case "formulas": return "Fórmules";
      case "coach": return "Entrenador IA";
      case "profile": return "El meu Perfil";
      default: return "PAU Màsters";
    }
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f172a] text-white px-4 border-b border-slate-800/60 flex items-center justify-between z-40 shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={onToggleMenu} className="p-1 -ml-1 text-slate-300 hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
        <span className="font-bold tracking-tight text-white font-sans text-base">{getTitle()}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-slate-800/60 px-3 py-1 rounded-full text-slate-200 text-xs font-semibold select-none">
          <span className="text-[#91c120] font-bold flex items-center gap-0.5 font-mono">
            12 <Flame className="h-3.5 w-3.5 fill-[#91c120] text-[#91c120]" />
          </span>
        </div>
      </div>
    </header>
  );
}

export function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { activeTab, setActiveTab, userStats } = useAppState();

  const menuItems = [
    { id: "dashboard", label: "Inici", icon: Home },
    { id: "practice", label: "Practicar per Temes", icon: BookOpen },
    { id: "exams", label: "Simulacre PAU", icon: Atom },
    { id: "formulas", label: "Fórmules", icon: BookMarked },
    { id: "coach", label: "Entrenador IA", icon: BrainCircuit },
    { id: "profile", label: "El meu Perfil", icon: User }
  ];

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      {/* Sheet panel */}
      <div className="relative flex flex-col w-80 max-w-sm bg-[#0f172a] text-white p-6 h-full shadow-2xl z-50 transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#91c120]" />
            <span className="font-sans font-bold text-lg text-white">PAU Màsters</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-full">
            <X className="h-5 w-55" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="mb-6 p-4 bg-slate-800/20 rounded-xl border border-slate-800/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 font-bold text-[#91c120] flex items-center justify-center border border-[#91c120]/20">
              M
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Marc</h2>
              <p className="text-[11px] text-slate-400">Preparació PAU 2026</p>
            </div>
          </div>
          <div className="flex justify-between text-[11px] mt-2">
            <span className="text-[#91c120] font-semibold bg-[#91c120]/10 px-2 py-0.5 rounded-full">Nivell {userStats.level}</span>
            <span className="text-slate-300 font-mono">{userStats.xp} / {userStats.xpNextLevel} XP</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 flex-grow">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-150 border-l-2 ${
                  isActive 
                    ? "bg-[#91c120]/10 border-[#91c120] text-[#91c120] font-semibold" 
                    : "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/30"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 pt-4 text-[10px] text-slate-400 space-y-1">
          <span className="block px-4">PAU Màsters v1.2</span>
          <span className="block px-4 text-slate-550">Jorge Guzman · nostrasenyora.epiaedu.cat</span>
        </div>
      </div>
    </div>
  );
}

export function BottomNav() {
  const { activeTab, setActiveTab } = useAppState();

  const tabs = [
    { id: "dashboard", label: "Inici", icon: Home },
    { id: "practice", label: "Practicar", icon: BookOpen },
    { id: "exams", label: "Simulacre", icon: Atom },
    { id: "formulas", label: "Fórmules", icon: BookMarked },
    { id: "coach", label: "IA Coach", icon: BrainCircuit }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0f172a] border-t border-slate-800/50 text-slate-400 z-35 flex justify-around py-1 pb-safe shadow-lg lg:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all text-[10px] font-medium ${
              isActive ? "text-[#91c120] font-semibold" : "text-slate-450 hover:text-white"
            }`}
          >
            <Icon className="h-4.5 w-4.5 mb-0.5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
