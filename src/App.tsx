/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AppStateProvider, useAppState } from "./context/AppContext";
import { Sidebar, MobileHeader, MobileDrawer, BottomNav } from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import ExercisePractice from "./components/ExercisePractice";
import ExamSimulation from "./components/ExamSimulation";
import FormulaRepo from "./components/FormulaRepo";
import SmartCoach from "./components/SmartCoach";
import Profile from "./components/Profile";

function MainLayout() {
  const { activeTab } = useAppState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "practice":
        return <ExercisePractice />;
      case "exams":
        return <ExamSimulation />;
      case "formulas":
        return <FormulaRepo />;
      case "coach":
        return <SmartCoach />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Sidebar navigation wrapper */}
      <Sidebar />

      {/* Mobile Top Header */}
      <MobileHeader onToggleMenu={() => setIsMobileMenuOpen(true)} />

      {/* Mobile Sidebar sheet drawer */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Content mainframe layout */}
      <main className="lg:pl-80 pt-20 lg:pt-8 px-4 md:px-8 max-w-7xl mx-auto pb-24 lg:pb-8 transition-all duration-300">
        {renderActiveScreen()}
      </main>

      {/* Mobile bottom nav sheet bar */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <MainLayout />
    </AppStateProvider>
  );
}
