/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChapterReader } from './components/ChapterReader';
import { ChapterList } from './components/ChapterList';
import { GlossaryTab } from './components/GlossaryTab';
import { GlossaryModal } from './components/GlossaryModal';
import { ComprehensionQuiz } from './components/ComprehensionQuiz';
import { StoryExpander } from './components/StoryExpander';
import { AudioNarrationBar } from './components/AudioNarrationBar';
import { ReaderSettingsModal, ReaderPreferences } from './components/ReaderSettingsModal';
import { ExportModal } from './components/ExportModal';
import { STORY_CHAPTERS, STORY_METADATA } from './data/story';
import { BookOpen, Share2, Headphones, ArrowUp } from 'lucide-react';

const DEFAULT_PREFERENCES: ReaderPreferences = {
  theme: 'warm',
  font: 'serif',
  size: 'md',
  highlightSpoken: true,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'story' | 'chapters' | 'glossary' | 'comprehension' | 'expand'>('story');
  const [currentChapterId, setCurrentChapterId] = useState<number>(1);
  const [completedChapters, setCompletedChapters] = useState<number[]>([1]);

  // Audio narration state
  const [showAudioBar, setShowAudioBar] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeSpokenParagraph, setActiveSpokenParagraph] = useState<number | null>(null);

  // Modals
  const [selectedGlossaryKey, setSelectedGlossaryKey] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Reader Preferences
  const [preferences, setPreferences] = useState<ReaderPreferences>(() => {
    try {
      const saved = localStorage.getItem('ade_reader_prefs');
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  // Scroll to top on chapter change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Mark as completed if reading
    if (!completedChapters.includes(currentChapterId)) {
      setCompletedChapters((prev) => [...prev, currentChapterId]);
    }
  }, [currentChapterId]);

  // Save prefs to localStorage and sync theme with HTML element
  const updatePreferences = (updates: Partial<ReaderPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('ade_reader_prefs', JSON.stringify(next));
      } catch (e) {
        console.warn('Storage unavailable:', e);
      }
      return next;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    if (preferences.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [preferences.theme]);

  const currentChapter = STORY_CHAPTERS.find((ch) => ch.id === currentChapterId) || STORY_CHAPTERS[0];

  const handleNextChapter = () => {
    if (currentChapterId < STORY_CHAPTERS.length) {
      setCurrentChapterId((prev) => prev + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterId > 1) {
      setCurrentChapterId((prev) => prev - 1);
    }
  };

  const toggleAudio = () => {
    if (!showAudioBar) {
      setShowAudioBar(true);
      setIsAudioPlaying(true);
    } else {
      setIsAudioPlaying((prev) => !prev);
    }
  };

  // Canvas background classes based on theme
  const canvasBgClass = {
    warm: 'bg-[#FAF7F2] text-stone-900',
    pure: 'bg-white text-stone-900',
    dark: 'bg-stone-950 text-stone-100 dark',
  }[preferences.theme];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${canvasBgClass}`}>
      {/* Reading Progress Line for the story */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200/50 dark:bg-stone-800 z-50">
        <div
          className="h-full bg-amber-700 dark:bg-amber-500 transition-all duration-300"
          style={{
            width: `${(currentChapterId / STORY_CHAPTERS.length) * 100}%`,
          }}
        />
      </div>

      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24">
        {activeTab === 'story' && (
          <ChapterReader
            chapter={currentChapter}
            totalChapters={STORY_CHAPTERS.length}
            onNextChapter={handleNextChapter}
            onPrevChapter={handlePrevChapter}
            onSelectChapter={(id) => setCurrentChapterId(id)}
            onTermClick={(key) => setSelectedGlossaryKey(key)}
            activeSpokenParagraphIndex={showAudioBar ? activeSpokenParagraph : null}
            preferences={preferences}
          />
        )}

        {activeTab === 'chapters' && (
          <ChapterList
            currentChapterId={currentChapterId}
            onSelectChapter={(id) => {
              setCurrentChapterId(id);
              setActiveTab('story');
            }}
            completedChapterIds={completedChapters}
          />
        )}

        {activeTab === 'glossary' && <GlossaryTab />}

        {activeTab === 'comprehension' && <ComprehensionQuiz />}

        {activeTab === 'expand' && <StoryExpander />}
      </main>

      {/* Sticky Audio Narration Bar */}
      {showAudioBar && (
        <AudioNarrationBar
          paragraphs={currentChapter.paragraphs}
          currentChapterTitle={`Ch. ${currentChapter.romanNumeral}: ${currentChapter.title}`}
          onParagraphChange={(idx) => setActiveSpokenParagraph(idx)}
          onClose={() => {
            setShowAudioBar(false);
            setIsAudioPlaying(false);
            setActiveSpokenParagraph(null);
          }}
          isGloballyPlaying={isAudioPlaying}
          setIsGloballyPlaying={setIsAudioPlaying}
        />
      )}

      {/* Modals */}
      <GlossaryModal
        selectedTermKey={selectedGlossaryKey}
        onClose={() => setSelectedGlossaryKey(null)}
        onSelectTerm={(k) => setSelectedGlossaryKey(k)}
      />

      <ReaderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        onUpdatePreferences={updatePreferences}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Editorial Footer (Quiet, zero slop) */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50 py-8 px-4 sm:px-6 transition-colors text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-stone-800 dark:text-stone-200">
              {STORY_METADATA.title}
            </span>
            <span aria-hidden="true">·</span>
            <span>{STORY_METADATA.setting}</span>
            <span aria-hidden="true">·</span>
            <span>{STORY_METADATA.averageReadingTime}</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Export & Print
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setActiveTab('story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
