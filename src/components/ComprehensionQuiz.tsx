/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Award,
  RotateCcw,
} from 'lucide-react';
import { REFLECTION_QUESTIONS, ReflectionQuestion } from '../data/story';

export const ComprehensionQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [openDiscussions, setOpenDiscussions] = useState<Record<number, boolean>>({});

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleDiscussion = (questionId: number) => {
    setOpenDiscussions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setOpenDiscussions({});
  };

  const multipleChoiceQuestions = REFLECTION_QUESTIONS.filter(
    (q) => q.promptType === 'comprehension' && q.options
  );

  const correctCount = multipleChoiceQuestions.reduce((count, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? count + 1 : count;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Quiz Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold block mb-2">
          Reader&apos;s Review & Reflection
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Understanding Ade&apos;s World
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-story-serif">
          Reflect upon key themes of family pride, courage, community bonds, and the ritual of early education.
        </p>

        {showResults && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-600/30 flex items-center justify-between gap-4 max-w-md mx-auto">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Score: {correctCount} / {multipleChoiceQuestions.length} Correct
              </span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {REFLECTION_QUESTIONS.map((q, idx) => {
          const isMultipleChoice = q.promptType === 'comprehension' && q.options;
          const selectedOption = selectedAnswers[q.id];
          const isCorrect = isMultipleChoice && selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-6 sm:p-7 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                    Question {idx + 1}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-xs capitalize text-stone-500 dark:text-stone-400">
                    {q.promptType} Reflection
                  </span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
                {q.question}
              </h3>

              {/* Multiple Choice Options */}
              {isMultipleChoice && q.options && (
                <div className="mt-4 space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = selectedOption === optIdx;
                    let optionStyle =
                      'border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/40 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        optionStyle =
                          'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium';
                      } else if (isOptionSelected) {
                        optionStyle =
                          'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                      }
                    } else if (isOptionSelected) {
                      optionStyle =
                        'border-amber-700 dark:border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 ring-1 ring-amber-600 font-medium';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {showResults && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {showResults && isOptionSelected && optIdx !== q.correctIndex && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Explanation after submitting */}
              {showResults && q.explanation && (
                <div className="mt-4 p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-stone-800 dark:text-stone-200 font-story-serif">
                  <span className="font-semibold text-amber-900 dark:text-amber-300 block mb-1">
                    Insight:
                  </span>
                  {q.explanation}
                </div>
              )}

              {/* Discussion Guiding Insight toggle for open-ended questions */}
              {!isMultipleChoice && (
                <div className="mt-4">
                  <button
                    onClick={() => toggleDiscussion(q.id)}
                    className="text-xs text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{openDiscussions[q.id] ? 'Hide Guiding Insight' : 'Reveal Guiding Insight'}</span>
                  </button>

                  {openDiscussions[q.id] && (
                    <div className="mt-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-story-serif leading-relaxed animate-in fade-in duration-200">
                      {q.guidingInsight}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit / Check Results Button */}
      {!showResults && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowResults(true)}
            className="px-6 py-3 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-sm font-semibold transition-all hover:bg-stone-800 dark:hover:bg-white cursor-pointer shadow-md"
          >
            Check Comprehension Answers
          </button>
        </div>
      )}
    </div>
  );
};
