/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Type, Palette, AlignLeft, Check } from 'lucide-react';

export type ReaderTheme = 'warm' | 'pure' | 'dark';
export type ReaderFont = 'serif' | 'sans';
export type ReaderSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ReaderPreferences {
  theme: ReaderTheme;
  font: ReaderFont;
  size: ReaderSize;
  highlightSpoken: boolean;
}

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: ReaderPreferences;
  onUpdatePreferences: (updates: Partial<ReaderPreferences>) => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-md bg-stone-50 dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 text-stone-900 dark:text-stone-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 id="reader-settings-title" className="text-base font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              Reader Preferences
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Customize typography and page ambiance
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* Reading Canvas Theme */}
          <div>
            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center gap-2 mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>Canvas Tone</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdatePreferences({ theme: 'warm' })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  preferences.theme === 'warm'
                    ? 'border-amber-700 bg-[#FAF7F2] text-amber-950 shadow-xs ring-1 ring-amber-700'
                    : 'border-stone-200 dark:border-stone-700 bg-[#FAF7F2] text-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-amber-300 mb-1" />
                <span>Archival Warm</span>
              </button>

              <button
                onClick={() => onUpdatePreferences({ theme: 'pure' })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  preferences.theme === 'pure'
                    ? 'border-amber-700 bg-white text-stone-900 shadow-xs ring-1 ring-amber-700'
                    : 'border-stone-200 dark:border-stone-700 bg-white text-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white border border-stone-300 mb-1" />
                <span>Pure White</span>
              </button>

              <button
                onClick={() => onUpdatePreferences({ theme: 'dark' })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  preferences.theme === 'dark'
                    ? 'border-amber-500 bg-stone-950 text-stone-100 shadow-xs ring-1 ring-amber-500'
                    : 'border-stone-700 bg-stone-950 text-stone-300 hover:border-stone-500'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-stone-900 border border-stone-700 mb-1" />
                <span>Night Ink</span>
              </button>
            </div>
          </div>

          {/* Typeface Family */}
          <div>
            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center gap-2 mb-2">
              <Type className="w-3.5 h-3.5" />
              <span>Typography Style</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdatePreferences({ font: 'serif' })}
                className={`flex items-center justify-between p-3 rounded-xl border text-sm transition-all cursor-pointer ${
                  preferences.font === 'serif'
                    ? 'border-amber-700 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span className="font-story-serif text-base">Literary Book Serif</span>
                {preferences.font === 'serif' && <Check className="w-4 h-4 text-amber-700 dark:text-amber-400" />}
              </button>

              <button
                onClick={() => onUpdatePreferences({ font: 'sans' })}
                className={`flex items-center justify-between p-3 rounded-xl border text-sm transition-all cursor-pointer ${
                  preferences.font === 'sans'
                    ? 'border-amber-700 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span className="font-story-sans text-sm">Clean Modern Sans</span>
                {preferences.font === 'sans' && <Check className="w-4 h-4 text-amber-700 dark:text-amber-400" />}
              </button>
            </div>
          </div>

          {/* Reading Font Size */}
          <div>
            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center gap-2 mb-2">
              <AlignLeft className="w-3.5 h-3.5" />
              <span>Reading Text Size</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  { id: 'sm', label: 'Compact', sizeClass: 'text-xs' },
                  { id: 'md', label: 'Default', sizeClass: 'text-sm' },
                  { id: 'lg', label: 'Large', sizeClass: 'text-base' },
                  { id: 'xl', label: 'Spacious', sizeClass: 'text-lg' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdatePreferences({ size: item.id })}
                  className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                    preferences.size === item.id
                      ? 'border-amber-700 dark:border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <div className={`${item.sizeClass} font-semibold mb-0.5`}>Aa</div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Highlight spoken toggle */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                Audio Follow-Along Focus
              </span>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Gently illuminate the paragraph being narrated
              </p>
            </div>
            <button
              onClick={() => onUpdatePreferences({ highlightSpoken: !preferences.highlightSpoken })}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                preferences.highlightSpoken
                  ? 'bg-amber-700 dark:bg-amber-600 justify-end'
                  : 'bg-stone-300 dark:bg-stone-700 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
