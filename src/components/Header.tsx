/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Headphones, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'story' | 'chapters' | 'glossary' | 'comprehension' | 'expand';
  setActiveTab: (tab: 'story' | 'chapters' | 'glossary' | 'comprehension' | 'expand') => void;
  onOpenSettings: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('story')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors whitespace-nowrap">
            Ade Goes to School
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => setActiveTab('story')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'story'
                ? 'border-amber-700 text-stone-900 dark:border-amber-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            The Story
          </button>
          <button
            onClick={() => setActiveTab('chapters')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'chapters'
                ? 'border-amber-700 text-stone-900 dark:border-amber-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Chapters
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'glossary'
                ? 'border-amber-700 text-stone-900 dark:border-amber-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Cultural Notes
          </button>
          <button
            onClick={() => setActiveTab('comprehension')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'comprehension'
                ? 'border-amber-700 text-stone-900 dark:border-amber-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Comprehension
          </button>
          <button
            onClick={() => setActiveTab('expand')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'expand'
                ? 'border-amber-700 text-stone-900 dark:border-amber-400 dark:text-white font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <span>Story Studio</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action button + utility controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenSettings}
            title="Reader preferences (theme, font size, typography)"
            className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Reader settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleAudio}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-xs ${
              isAudioPlaying
                ? 'bg-amber-700 text-white hover:bg-amber-800 dark:bg-amber-600'
                : 'bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 shrink-0" />
            <span>{isAudioPlaying ? 'Pause Audio' : 'Listen'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav subrow */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-stone-200/60 dark:border-stone-800/80 bg-stone-100/80 dark:bg-stone-900/80 text-xs">
        <button
          onClick={() => setActiveTab('story')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'story'
              ? 'text-amber-800 dark:text-amber-300 font-semibold'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Story
        </button>
        <button
          onClick={() => setActiveTab('chapters')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'chapters'
              ? 'text-amber-800 dark:text-amber-300 font-semibold'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Chapters
        </button>
        <button
          onClick={() => setActiveTab('glossary')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'glossary'
              ? 'text-amber-800 dark:text-amber-300 font-semibold'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Glossary
        </button>
        <button
          onClick={() => setActiveTab('comprehension')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'comprehension'
              ? 'text-amber-800 dark:text-amber-300 font-semibold'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Quiz
        </button>
        <button
          onClick={() => setActiveTab('expand')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'expand'
              ? 'text-amber-800 dark:text-amber-300 font-semibold'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Studio
        </button>
      </div>
    </header>
  );
};
