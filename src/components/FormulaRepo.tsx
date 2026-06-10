/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { Formula, SubjectName } from "../types";
import { 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  BookMarked, 
  CheckCircle,
  HelpCircle,
  Hash,
  Award
} from "lucide-react";

export default function FormulaRepo() {
  const { formulas, bookmarkedFormulas, toggleFormulaBookmark } = useAppState();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("Tots");

  const filteredFormulas = formulas.filter((f) => {
    const matchesSearch = 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.equation.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.explanation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject = 
      selectedSubject === "Tots" || 
      (selectedSubject === "Matemàtiques" && f.subject === SubjectName.MATEMATIQUES) ||
      (selectedSubject === "Física" && f.subject === SubjectName.FISICA) ||
      (selectedSubject === "Química" && f.subject === SubjectName.QUIMICA);

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Upper header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h1 className="text-2xl font-bold text-[#0f172a]">Planificador de Fórmules PAU</h1>
        <p className="text-slate-500 text-sm mt-1">El repositori de fórmules d'alt nivell amb indicadors estructurats clau per Matemàtiques, Física i Química.</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="h-4.5 w-4.5" />
          </span>
          <input
            type="text"
            placeholder="Cerca equacions, definicions, conceptes (ex: Bayes)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#91c120]/20 focus:border-[#91c120] transition-all"
          />
        </div>

        {/* Sub filter tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {["Tots", "Matemàtiques", "Física", "Química"].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedSubject === sub 
                  ? "bg-[#0f172a] text-white" 
                  : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of formula blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {filteredFormulas.length > 0 ? (
          filteredFormulas.map((formula) => {
            const isBookmarked = bookmarkedFormulas.includes(formula.id);
            return (
              <div 
                key={formula.id}
                id={formula.idAttr}
                className={`bg-white p-5 rounded-2xl border transition-all hover:shadow-md relative overflow-hidden flex flex-col justify-between ${
                  isBookmarked ? "border-[#91c120] shadow-sm shadow-[#91c120]/5" : "border-slate-100 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-105 px-2 py-0.5 rounded-md">
                        {formula.subject} · {formula.category}
                      </span>
                      <h3 className="font-bold text-base text-[#0f172a] mt-2">{formula.name}</h3>
                    </div>

                    <button 
                      onClick={() => toggleFormulaBookmark(formula.id)}
                      className={`p-2 rounded-xl transition-all ${
                        isBookmarked 
                          ? "bg-[#91c120]/10 text-[#91c120] scale-110" 
                          : "bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                      }`}
                      aria-label="Guardar fórmula"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4.5 w-4.5 fill-[#91c120] text-[#91c120]" />
                      ) : (
                        <Bookmark className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>

                  {/* Math text box */}
                  <div className="my-4 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-[#0f172a] font-mono text-sm text-center font-bold tracking-wider relative select-all leading-relaxed shadow-inner">
                    {formula.equation}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {formula.explanation}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Preparació PAU</span>
                  {isBookmarked && (
                    <span className="text-[#91c120] font-bold flex items-center gap-1">
                      ★ Marcador de repàs actiu
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 py-12 text-center bg-white rounded-2xl border border-slate-150">
            <Hash className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 mt-2">Cap fórmula trobada</h3>
            <p className="text-xs text-slate-400 mt-1">Modifica els termes del cercador.</p>
          </div>
        )}
      </div>
    </div>
  );
}
