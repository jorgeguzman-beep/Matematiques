/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserStats, Exercise, Formula, ExamQuestion } from "../types";
import { EXERCISES, FORMULAS, EXAM_QUESTIONS } from "../data";

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
  exercises: Exercise[];
  completedExercises: string[];
  completeExercise: (id: string) => void;
  formulas: Formula[];
  bookmarkedFormulas: string[];
  toggleFormulaBookmark: (id: string) => void;
  currentPracticeExercise: Exercise | null;
  setCurrentPracticeExercise: (ex: Exercise | null) => void;
  activeExamIndex: number;
  setActiveExamIndex: (index: number) => void;
  examAnswers: Record<string, "A" | "B" | "C" | "D">;
  setExamAnswer: (questionId: string, answer: "A" | "B" | "C" | "D") => void;
  correctAnswersCount: number;
  isExamSubmitted: boolean;
  submitExam: () => void;
  resetExam: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTabState] = useState<string>("dashboard");
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [bookmarkedFormulas, setBookmarkedFormulas] = useState<string[]>(["form_2"]); // Prebookmark "Interval de Confiança" just like the screenshot had active!
  const [currentPracticeExercise, setCurrentPracticeExercise] = useState<Exercise | null>(null);

  // Stats setup
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const local = localStorage.getItem("pau_masters_stats");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        // ignore
      }
    }
    return {
      level: 24,
      xp: 12450,
      xpNextLevel: 15000,
      streak: 12,
      hoursStudied: 36.4,
      successRate: 68,
      completedCount: 342,
      examScores: [
        { date: "15/05/2026", subject: "Matemàtiques II", score: 8.5 },
        { date: "22/05/2026", subject: "Física II", score: 7.2 }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem("pau_masters_stats", JSON.stringify(userStats));
  }, [userStats]);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeExercise = (id: string) => {
    if (!completedExercises.includes(id)) {
      setCompletedExercises((prev) => [...prev, id]);
      setUserStats((prev) => {
        const newXp = prev.xp + 150;
        const reachedNext = newXp >= prev.xpNextLevel;
        return {
          ...prev,
          xp: reachedNext ? newXp - prev.xpNextLevel : newXp,
          level: reachedNext ? prev.level + 1 : prev.level,
          completedCount: prev.completedCount + 1,
          successRate: Math.min(prev.successRate + 1, 98),
          hoursStudied: parseFloat((prev.hoursStudied + 0.3).toFixed(1))
        };
      });
    }
  };

  const toggleFormulaBookmark = (id: string) => {
    setBookmarkedFormulas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Exam simulation states
  const [examAnswers, setExamAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [activeExamIndex, setActiveExamIndex] = useState<number>(0);

  const setExamAnswer = (questionId: string, answer: "A" | "B" | "C" | "D") => {
    if (isExamSubmitted) return; // cannot answer after submit
    setExamAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const correctAnswersCount = EXAM_QUESTIONS.reduce((count, q) => {
    const selected = examAnswers[q.id];
    const correctOption = q.options.find((o) => o.isCorrect);
    if (selected && correctOption && selected === correctOption.key) {
      return count + 1;
    }
    return count;
  }, 0);

  const submitExam = () => {
    if (isExamSubmitted) return;
    setIsExamSubmitted(true);
    const score = parseFloat(((correctAnswersCount / EXAM_QUESTIONS.length) * 10).toFixed(1));
    setUserStats((prev) => {
      const newXp = prev.xp + 300;
      const reachedNext = newXp >= prev.xpNextLevel;
      return {
        ...prev,
        xp: reachedNext ? newXp - prev.xpNextLevel : newXp,
        level: reachedNext ? prev.level + 1 : prev.level,
        examScores: [
          ...prev.examScores,
          { date: new Date().toLocaleDateString(), subject: "PAU Simulacre General", score }
        ]
      };
    });
  };

  const resetExam = () => {
    setExamAnswers({});
    setIsExamSubmitted(false);
    setActiveExamIndex(0);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userStats,
        setUserStats,
        exercises: EXERCISES,
        completedExercises,
        completeExercise,
        formulas: FORMULAS,
        bookmarkedFormulas,
        toggleFormulaBookmark,
        currentPracticeExercise,
        setCurrentPracticeExercise,
        activeExamIndex,
        setActiveExamIndex,
        examAnswers,
        setExamAnswer,
        correctAnswersCount,
        isExamSubmitted,
        submitExam,
        resetExam
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
