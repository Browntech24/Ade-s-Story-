/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, BookMarked, Sparkles, Volume2 } from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryItem } from '../data/story';

interface GlossaryModalProps {
  selectedTermKey: string | null;
  onClose: () => void;
  onSelectTerm: (key: string) => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  selectedTermKey,
  onClose,
  onSelectTerm,
}) => {
  if (!selectedTermKey) return null;

  const currentItem: GlossaryItem | undefined =
    GLOSSARY_TERMS[selectedTermKey] ||
    Object.values(GLOSSARY_TERMS).find(
      (item) => item.term.toLowerCase() === selectedTermKey.toLowerCase()
    );

  const speakTerm = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-stone-50 dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 text-stone-900 dark:text-stone-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            <BookMarked className="w-4 h-4" />
            <span id="glossary-dialog-title">Cultural & Historical Lexicon</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {currentItem ? (
          <div className="mt-4 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-bold text-stone-950 dark:text-stone-100">
                  {currentItem.term}
                </h3>
                {currentItem.pronunciation && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-stone-500 dark:text-stone-400 italic">
                      [{currentItem.pronunciation}]
                    </span>
                    <button
                      onClick={() => speakTerm(currentItem.term)}
                      title="Pronounce term"
                      className="p-1 text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 rounded transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-stone-800 dark:text-stone-200 text-sm leading-relaxed">
              <span className="font-semibold text-amber-900 dark:text-amber-300 block text-xs uppercase tracking-wider mb-1">
                Definition
              </span>
              {currentItem.definition}
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-stone-500 dark:text-stone-400 block text-xs uppercase tracking-wider">
                Cultural Context & Heritage
              </span>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-story-serif">
                {currentItem.culturalContext}
              </p>
            </div>

            {/* Quick Related terms switcher */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
              <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-2">
                Explore Other Cultural Notes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(GLOSSARY_TERMS).map(([key, termObj]) => (
                  <button
                    key={key}
                    onClick={() => onSelectTerm(key)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                      key === selectedTermKey
                        ? 'bg-amber-700 text-white font-medium'
                        : 'bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700'
                    }`}
                  >
                    {termObj.term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-stone-500">
            Term details not found.
          </div>
        )}
      </div>
    </div>
  );
};
