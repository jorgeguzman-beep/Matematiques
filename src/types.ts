/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum SubjectName {
  MATEMATIQUES = "Matemàtiques II",
  FISICA = "Fisica II",
  QUIMICA = "Química II"
}

export enum Difficulty {
  EASY = "Fàcil",
  MEDIUM = "Mitjà",
  HARD = "Difícil"
}

export interface Exercise {
  id: string;
  idAttr?: string;
  subject: SubjectName;
  topic: string;
  difficulty: Difficulty;
  estimatedTimeMin: number;
  statement: string; // Markdown or plain text
  mathFormula?: string;
  steps: {
    title: string;
    explanation: string;
    mathBlock?: string;
  }[];
  typicalMistake: string;
  pauStrategy: string;
  finalAnswerMatricial?: boolean;
  finalResultText: string;
}

export interface Formula {
  id: string;
  idAttr?: string;
  subject: SubjectName;
  category: string;
  name: string;
  equation: string;
  explanation: string;
}

export interface ExamQuestion {
  id: string;
  idAttr?: string;
  subject: SubjectName;
  topic: string;
  questionText: string;
  subQuestions?: string[];
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface UserStats {
  level: number;
  xp: number;
  xpNextLevel: number;
  streak: number;
  hoursStudied: number;
  successRate: number; // 0 to 100
  completedCount: number;
  examScores: {
    date: string;
    subject: string;
    score: number; // out of 10
  }[];
}
