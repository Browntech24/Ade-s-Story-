/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  X,
  Gauge,
  RotateCcw,
} from 'lucide-react';

interface AudioNarrationBarProps {
  paragraphs: string[];
  currentChapterTitle: string;
  onParagraphChange?: (index: number) => void;
  onClose: () => void;
  isGloballyPlaying: boolean;
  setIsGloballyPlaying: (playing: boolean) => void;
}

export const AudioNarrationBar: React.FC<AudioNarrationBarProps> = ({
  paragraphs,
  currentChapterTitle,
  onParagraphChange,
  onClose,
  isGloballyPlaying,
  setIsGloballyPlaying,
}) => {
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  // Sync paragraph index notification
  useEffect(() => {
    onParagraphChange?.(currentParagraphIndex);
  }, [currentParagraphIndex, onParagraphChange]);

  const speakCurrentParagraph = (index: number, rate = playbackRate) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (index >= paragraphs.length) {
      setIsGloballyPlaying(false);
      setCurrentParagraphIndex(0);
      return;
    }

    const textToSpeak = paragraphs[index];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick a natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) ||
      voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      if (index + 1 < paragraphs.length) {
        setCurrentParagraphIndex(index + 1);
        speakCurrentParagraph(index + 1, rate);
      } else {
        setIsGloballyPlaying(false);
        setCurrentParagraphIndex(0);
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsGloballyPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsGloballyPlaying(true);
  };

  const togglePlay = () => {
    if (!isGloballyPlaying) {
      speakCurrentParagraph(currentParagraphIndex);
    } else {
      window.speechSynthesis.cancel();
      setIsGloballyPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentParagraphIndex < paragraphs.length - 1) {
      const nextIdx = currentParagraphIndex + 1;
      setCurrentParagraphIndex(nextIdx);
      if (isGloballyPlaying) {
        speakCurrentParagraph(nextIdx);
      }
    }
  };

  const handlePrev = () => {
    if (currentParagraphIndex > 0) {
      const prevIdx = currentParagraphIndex - 1;
      setCurrentParagraphIndex(prevIdx);
      if (isGloballyPlaying) {
        speakCurrentParagraph(prevIdx);
      }
    }
  };

  const handleRestart = () => {
    setCurrentParagraphIndex(0);
    speakCurrentParagraph(0);
  };

  const changeRate = (rate: number) => {
    setPlaybackRate(rate);
    if (isGloballyPlaying) {
      speakCurrentParagraph(currentParagraphIndex, rate);
    }
  };

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-stone-200 px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-3">
        <span>Audio narration is not supported in this browser.</span>
        <button onClick={onClose} className="text-stone-400 hover:text-white">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Audio narration controls"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-stone-900/95 dark:bg-stone-950/95 text-stone-100 rounded-2xl shadow-2xl border border-stone-700/60 backdrop-blur-md px-4 py-3 transition-all"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Track Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] text-amber-400 font-medium">
            <Volume2 className="w-3.5 h-3.5 shrink-0 animate-pulse" />
            <span className="truncate">Audio Narration · {currentChapterTitle}</span>
          </div>
          <p className="text-xs text-stone-300 truncate mt-0.5">
            Paragraph {currentParagraphIndex + 1} of {paragraphs.length}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleRestart}
            title="Restart Chapter"
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePrev}
            disabled={currentParagraphIndex === 0}
            title="Previous paragraph"
            className="p-1.5 text-stone-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            title={isGloballyPlaying ? 'Pause' : 'Play'}
            className="w-9 h-9 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-md"
          >
            {isGloballyPlaying ? (
              <Pause className="w-4 h-4 fill-stone-950" />
            ) : (
              <Play className="w-4 h-4 fill-stone-950 translate-x-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentParagraphIndex >= paragraphs.length - 1}
            title="Next paragraph"
            className="p-1.5 text-stone-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Selector & Close */}
        <div className="flex items-center gap-1 shrink-0 border-l border-stone-800 pl-2">
          <div className="flex items-center gap-0.5 bg-stone-800/80 rounded-md p-0.5 text-[11px]">
            {[1.0, 1.2].map((rate) => (
              <button
                key={rate}
                onClick={() => changeRate(rate)}
                className={`px-1.5 py-0.5 rounded font-mono transition-colors cursor-pointer ${
                  playbackRate === rate
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            title="Close audio player"
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors ml-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden mt-2">
        <div
          className="bg-amber-500 h-full transition-all duration-300"
          style={{
            width: `${((currentParagraphIndex + 1) / Math.max(paragraphs.length, 1)) * 100}%`,
          }}
        />
      </div>
    </aside>
  );
};
