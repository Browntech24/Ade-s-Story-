/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { STORY_CHAPTERS, STORY_METADATA } from '../data/story';

interface ChapterListProps {
  currentChapterId: number;
  onSelectChapter: (id: number) => void;
  completedChapterIds: number[];
}

export const ChapterList: React.FC<ChapterListProps> = ({
  currentChapterId,
  onSelectChapter,
  completedChapterIds,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Editorial Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold block mb-2">
          Table of Contents
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          The Chronicles of Ade
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-story-serif">
          Five sequential movements following one child&apos;s awakening in Ilode, from the hot charcoal iron of dawn to the first pencil stroke on a clean slate.
        </p>
      </div>

      {/* Chapters Grid / Cards */}
      <div className="space-y-4">
        {STORY_CHAPTERS.map((ch) => {
          const isCurrent = ch.id === currentChapterId;
          const isCompleted = completedChapterIds.includes(ch.id);

          return (
            <div
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer ${
                isCurrent
                  ? 'border-amber-700 dark:border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 shadow-sm'
                  : 'border-stone-200/90 dark:border-stone-800 bg-white/60 dark:bg-stone-900/40 hover:border-stone-400 dark:hover:border-stone-700 hover:bg-stone-50/80 dark:hover:bg-stone-900/80'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Roman Numeral Badge */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-display text-base font-bold shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 group-hover:bg-amber-100 group-hover:text-amber-900 dark:group-hover:bg-amber-950 dark:group-hover:text-amber-200'
                  }`}
                >
                  {ch.romanNumeral}
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
                    <span>Chapter {ch.romanNumeral}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ch.estimatedReadingMinutes} min read</span>
                    {isCompleted && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Read
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                    {ch.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 font-story-serif">
                    {ch.subtitle}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300 group-hover:text-amber-800 dark:group-hover:text-amber-300 shrink-0 self-end sm:self-center">
                <span>{isCurrent ? 'Continue' : 'Read Chapter'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Story Summary Card */}
      <div className="mt-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-600/20 text-stone-800 dark:text-stone-200">
        <h4 className="font-display font-semibold text-base text-stone-900 dark:text-stone-100 mb-2">
          About &ldquo;{STORY_METADATA.title}&rdquo;
        </h4>
        <p className="text-sm font-story-serif leading-relaxed text-stone-700 dark:text-stone-300">
          {STORY_METADATA.synopsis}
        </p>
        <div className="mt-4 pt-4 border-t border-amber-600/20 flex flex-wrap gap-4 text-xs text-stone-600 dark:text-stone-400">
          <div>
            <span className="font-medium text-stone-800 dark:text-stone-200">Setting: </span>
            {STORY_METADATA.setting}
          </div>
          <span aria-hidden="true">·</span>
          <div>
            <span className="font-medium text-stone-800 dark:text-stone-200">Total Length: </span>
            {STORY_METADATA.totalWordCount} words ({STORY_METADATA.averageReadingTime})
          </div>
        </div>
      </div>
    </div>
  );
};
