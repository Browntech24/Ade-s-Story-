/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookMarked, Search, Volume2, Sparkles, Filter } from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryItem } from '../data/story';

export const GlossaryTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryItem | null>(
    Object.values(GLOSSARY_TERMS)[0]
  );

  const speak = (term: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(term);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const filteredEntries = Object.entries(GLOSSARY_TERMS).filter(
    ([key, item]) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.culturalContext.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Editorial Title */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold block mb-2">
          Cultural Reader&apos;s Companion
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Ilode Cultural Lexicon
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-story-serif">
          Discover the historical artifacts, culinary traditions, and linguistic nuances that frame Ade&apos;s journey to school.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-8 relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search cultural terms, traditions, artifacts..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-600 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-xs"
        />
      </div>

      {/* Two-Column Lexicon Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Terms */}
        <div className="md:col-span-5 space-y-2">
          {filteredEntries.map(([key, item]) => {
            const isSelected = selectedTerm?.term === item.term;

            return (
              <button
                key={key}
                onClick={() => setSelectedTerm(item)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-700 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-xs'
                    : 'border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-sm">
                    {item.term}
                  </h3>
                  {item.pronunciation && (
                    <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                      [{item.pronunciation}]
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                  {item.definition}
                </p>
              </button>
            );
          })}

          {filteredEntries.length === 0 && (
            <div className="p-8 text-center text-sm text-stone-500 bg-stone-100 dark:bg-stone-900 rounded-xl">
              No matching terms found.
            </div>
          )}
        </div>

        {/* Right Column: Active Term Spotlight */}
        <div className="md:col-span-7 sticky top-24">
          {selectedTerm ? (
            <div className="p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm text-stone-900 dark:text-stone-100">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <h3 className="font-display text-2xl font-bold text-stone-950 dark:text-stone-50">
                    {selectedTerm.term}
                  </h3>
                  {selectedTerm.pronunciation && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono text-amber-800 dark:text-amber-400">
                        Pronounced: [{selectedTerm.pronunciation}]
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => speak(selectedTerm.term)}
                  title="Pronounce term"
                  className="p-2 text-stone-500 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                    Literal & Functional Meaning
                  </span>
                  <p className="text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200">
                    {selectedTerm.definition}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-1">
                    Historical & Cultural Context
                  </span>
                  <p className="text-sm font-story-serif leading-relaxed text-stone-700 dark:text-stone-300">
                    {selectedTerm.culturalContext}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-sm text-stone-500 border border-dashed border-stone-300 dark:border-stone-700 rounded-2xl">
              Select a term to view cultural notes and pronunciation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
