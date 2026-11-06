/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  BookOpen,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { StoryChapter, GLOSSARY_TERMS } from '../data/story';
import { ReaderPreferences } from './ReaderSettingsModal';

interface ChapterReaderProps {
  chapter: StoryChapter;
  totalChapters: number;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onSelectChapter: (id: number) => void;
  onTermClick: (termKey: string) => void;
  activeSpokenParagraphIndex: number | null;
  preferences: ReaderPreferences;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({
  chapter,
  totalChapters,
  onNextChapter,
  onPrevChapter,
  onSelectChapter,
  onTermClick,
  activeSpokenParagraphIndex,
  preferences,
}) => {
  const [copied, setCopied] = React.useState(false);

  // Helper to render paragraph with clickable glossary triggers
  const renderParagraphText = (text: string, isFirstParagraph: boolean) => {
    // Look for glossary terms in the text and wrap them in clickable spans
    const terms = Object.keys(GLOSSARY_TERMS);
    // Sort terms by length descending so longer phrases match first
    terms.sort((a, b) => b.length - a.length);

    // Build regex pattern matching case-insensitively
    const regex = new RegExp(`\\b(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index;
      const matchedText = match[0];

      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      // Find normalized key
      const foundKey = Object.keys(GLOSSARY_TERMS).find(
        k => k.toLowerCase() === matchedText.toLowerCase()
      ) || matchedText.toLowerCase();

      parts.push(
        <button
          key={`${matchIndex}-${matchedText}`}
          onClick={(e) => {
            e.stopPropagation();
            onTermClick(foundKey);
          }}
          title={`Click to view cultural context for "${matchedText}"`}
          className="inline underline decoration-dotted decoration-amber-600/70 dark:decoration-amber-400 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-950/40 rounded px-0.5 transition-colors cursor-pointer"
        >
          {matchedText}
        </button>
      );

      lastIndex = matchIndex + matchedText.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return (
      <span className={isFirstParagraph ? 'drop-cap' : ''}>
        {parts}
      </span>
    );
  };

  const handleCopyChapter = () => {
    const content = `${chapter.title}\n\n${chapter.paragraphs.join('\n\n')}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Typography sizing classes
  const sizeClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed sm:text-[17px] sm:leading-[1.8]',
    lg: 'text-lg leading-loose sm:text-[19px] sm:leading-[1.85]',
    xl: 'text-xl leading-loose sm:text-[21px] sm:leading-[1.9]',
  }[preferences.size];

  const fontClass = preferences.font === 'serif' ? 'font-story-serif' : 'font-story-sans';

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Editorial Chapter Kicker / Clean Unboxed Metadata */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-widest text-[11px]">
            Chapter {chapter.romanNumeral}
          </span>
          <span aria-hidden="true">·</span>
          <span>{chapter.estimatedReadingMinutes} min read</span>
          <span aria-hidden="true">·</span>
          <span>Ilode Community</span>
        </div>

        <button
          onClick={handleCopyChapter}
          className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer text-[11px]"
          title="Copy this chapter to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy text</span>
            </>
          )}
        </button>
      </div>

      {/* Chapter Title & Subtitle */}
      <header className="mt-6 mb-8 text-center sm:text-left">
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 text-balance leading-tight">
          {chapter.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-story-serif italic">
          {chapter.subtitle}
        </p>
      </header>

      {/* Chapter Illustration (if present) with zero-broken-image fallback container */}
      {chapter.image && (
        <figure className="my-8 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 shadow-sm">
          <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-stone-200 dark:bg-stone-800">
            <img
              src={chapter.image}
              alt={chapter.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>
          {chapter.imageCaption && (
            <figcaption className="px-4 py-2.5 text-xs text-stone-500 dark:text-stone-400 italic text-center font-story-serif border-t border-stone-200/60 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/50">
              {chapter.imageCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Story Body Paragraphs */}
      <div className={`space-y-6 ${sizeClasses} ${fontClass} text-stone-800 dark:text-stone-200`}>
        {chapter.paragraphs.map((p, idx) => {
          const isSpoken = preferences.highlightSpoken && activeSpokenParagraphIndex === idx;

          return (
            <p
              key={idx}
              className={`transition-all duration-300 rounded-lg p-1.5 -mx-1.5 ${
                isSpoken
                  ? 'bg-amber-100/70 dark:bg-amber-950/40 text-stone-950 dark:text-amber-100 ring-1 ring-amber-300 dark:ring-amber-800'
                  : ''
              }`}
            >
              {renderParagraphText(p, idx === 0 && chapter.id === 1)}
            </p>
          );
        })}
      </div>

      {/* Grandfather's Wisdom Pull Quote for Chapter 1 */}
      {chapter.id === 1 && (
        <div className="my-10 py-6 px-6 sm:px-8 border-y border-stone-200/90 dark:border-stone-800 bg-amber-500/5 text-center">
          <blockquote className="font-display italic text-lg sm:text-xl text-stone-800 dark:text-stone-200 max-w-xl mx-auto">
            &ldquo;Hold this when your head feels noisy. A boy who remembers where the river flows will never get lost on the chalkboard.&rdquo;
          </blockquote>
          <cite className="block mt-2 text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-sans not-italic">
            — Baba Tunde, elder of Ilode
          </cite>
        </div>
      )}

      {/* Key Themes tags as clean unboxed text */}
      <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
        <span className="font-medium text-stone-700 dark:text-stone-300">Chapter Themes:</span>
        {chapter.keyThemes.map((theme, i) => (
          <React.Fragment key={theme}>
            {i > 0 && <span aria-hidden="true">·</span>}
            <span>{theme}</span>
          </React.Fragment>
        ))}
      </div>

      {/* Chapter Pagination Navigation */}
      <nav aria-label="Chapter navigation" className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <button
          onClick={onPrevChapter}
          disabled={chapter.id === 1}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Chapter</span>
        </button>

        <span className="text-xs font-mono tabular-nums text-stone-500 dark:text-stone-400">
          {chapter.id} / {totalChapters}
        </span>

        <button
          onClick={onNextChapter}
          disabled={chapter.id === totalChapters}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs"
        >
          <span>Next Chapter</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </article>
  );
};
