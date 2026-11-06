/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Send,
  Loader2,
  MessageCircle,
  Copy,
  Check,
  RefreshCw,
  Feather,
} from 'lucide-react';

interface StoryExpanderProps {
  onAppendChapter?: (title: string, content: string) => void;
}

const PRESET_PROMPTS = [
  {
    title: "Recess under the Flame Tree",
    prompt: "Write about Ade's very first 10:00 AM recess. He shares one of Iya Morayo's puff-puffs with Folu and watches the older boys play Ayo Olopon with glossy grey seeds beneath the scarlet blossoms.",
    tone: "Warm, sensory, playful",
  },
  {
    title: "The Arithmetic Lesson",
    prompt: "Describe Master Adeleke teaching the children how to count and add using dried red beans and cowrie shells, and how Ade discovers numbers are like secret songs.",
    tone: "Lyrical, encouraging, thoughtful",
  },
  {
    title: "The Afternoon Walk in the Rain",
    prompt: "The afternoon bell rings and rain suddenly drums on the corrugated roof. Describe Ade and Simi walking home along the red road as it turns to cool terracotta mud, shielding their slates with banana leaves.",
    tone: "Atmospheric, vivid, nostalgic",
  },
  {
    title: "Evening Fire with Baba Tunde",
    prompt: "Ade returns home and sits on the wooden stool beside Baba Tunde's rocking chair. Baba asks to see the smooth river pebble and asks what the chalkboard taught him today.",
    tone: "Gentle, philosophical, family warmth",
  },
];

const CHARACTERS = [
  {
    id: "Ade",
    name: "Ade",
    desc: "Primary One student, age 8",
    avatar: "👦🏾",
    sampleQuestion: "Were you scared when Folu dropped his slate into the stream?",
  },
  {
    id: "Baba Tunde",
    name: "Baba Tunde",
    desc: "Venerable grandfather & village elder",
    avatar: "👴🏾",
    sampleQuestion: "Why did you give Ade the smooth river pebble before school?",
  },
  {
    id: "Master Adeleke",
    name: "Master Adeleke",
    desc: "Classroom Master at St. Jude's",
    avatar: "👨🏾‍🏫",
    sampleQuestion: "What is the most important lesson you hope to teach the new scholars?",
  },
  {
    id: "Mama Bisi",
    name: "Mama Bisi",
    desc: "Ade's mother, guardian of the hearth",
    avatar: "👩🏾",
    sampleQuestion: "Why were you so strict about the creases on Ade's uniform?",
  },
];

export const StoryExpander: React.FC<StoryExpanderProps> = ({ onAppendChapter }) => {
  const [subTab, setSubTab] = useState<'generate' | 'dialogue'>('generate');

  // Generation state
  const [selectedPrompt, setSelectedPrompt] = useState(PRESET_PROMPTS[0].prompt);
  const [customPrompt, setCustomPrompt] = useState('');
  const [tone, setTone] = useState('Warm, lyrical, reflective');
  const [focusCharacter, setFocusCharacter] = useState('Ade');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dialogue state
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0].id);
  const [charQuestion, setCharQuestion] = useState(CHARACTERS[0].sampleQuestion);
  const [isAsking, setIsAsking] = useState(false);
  const [charAnswer, setCharAnswer] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    const activePrompt = customPrompt.trim() ? customPrompt : selectedPrompt;

    try {
      const res = await fetch('/api/story/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          tone,
          focusCharacter,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to expand story.');
      }

      setGeneratedStory(data.text);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with server.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAskCharacter = async () => {
    if (!charQuestion.trim()) return;
    setIsAsking(true);
    setCharAnswer(null);

    try {
      const res = await fetch('/api/story/character-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: selectedChar,
          question: charQuestion,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer.');
      }

      setCharAnswer(data.answer);
    } catch (err: any) {
      setCharAnswer(`Apologies, could not connect: ${err.message}`);
    } finally {
      setIsAsking(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Studio Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold mb-2">
          <Feather className="w-3.5 h-3.5" />
          <span>Interactive Story Studio</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Continue Ade&apos;s Journey
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-story-serif">
          Expand the universe of Ilode with authentic new chapters or converse directly with the elders, teachers, and pupils of St. Jude&apos;s.
        </p>

        {/* Sub-tab navigation */}
        <div className="flex items-center justify-center gap-2 mt-6 p-1 bg-stone-200/60 dark:bg-stone-800/80 rounded-xl w-fit mx-auto">
          <button
            onClick={() => setSubTab('generate')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              subTab === 'generate'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Author Next Chapter
          </button>
          <button
            onClick={() => setSubTab('dialogue')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              subTab === 'dialogue'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Converse with Characters
          </button>
        </div>
      </div>

      {subTab === 'generate' ? (
        <div className="space-y-6">
          {/* Preset Prompts */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Select an Inspiring Direction
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESET_PROMPTS.map((p) => {
                const isSelected = selectedPrompt === p.prompt && !customPrompt;
                return (
                  <button
                    key={p.title}
                    onClick={() => {
                      setSelectedPrompt(p.prompt);
                      setCustomPrompt('');
                    }}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-700 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-xs'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="font-semibold text-sm text-stone-900 dark:text-stone-100 mb-1">
                      {p.title}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                      {p.prompt}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Prompt Textarea */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Or Craft Your Own Scene Direction
            </label>
            <textarea
              rows={3}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., Write about Ade finding a lost wooden carving near the market, or his sister Simi teaching him how to read the clock tower..."
              className="w-full p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-600 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-xs resize-none"
            />
          </div>

          {/* Controls: Focus character + Tone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1.5">
                Focal Character
              </label>
              <select
                value={focusCharacter}
                onChange={(e) => setFocusCharacter(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs sm:text-sm text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
              >
                <option value="Ade">Ade (Primary 1 Scholar)</option>
                <option value="Baba Tunde">Baba Tunde (Wise Grandfather)</option>
                <option value="Simi">Simi (Protective Elder Sister)</option>
                <option value="Folu">Folu (Blacksmith&apos;s Young Son)</option>
                <option value="Master Adeleke">Master Adeleke (The Teacher)</option>
                <option value="Mama Bisi">Mama Bisi (Mother)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1.5">
                Prose Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs sm:text-sm text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
              >
                <option value="Warm, lyrical, reflective">Warm, lyrical, reflective</option>
                <option value="Lively, sensory, humorous">Lively, sensory, humorous</option>
                <option value="Poetic, contemplative, slow-paced">Poetic, contemplative, slow-paced</option>
                <option value="Educational, observant, adventurous">Educational, observant, adventurous</option>
              </select>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authoring in Ilode...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate New Chapter</span>
                </>
              )}
            </button>
          </div>

          {/* Error notice */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Generated Result Container */}
          {generatedStory && (
            <div className="mt-8 p-6 sm:p-8 rounded-2xl border border-amber-600/30 bg-amber-50/20 dark:bg-stone-900 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-widest">
                  <Feather className="w-4 h-4" />
                  <span>New Chapter · Written in Ilode Tradition</span>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedStory)}
                  className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Chapter</span>
                    </>
                  )}
                </button>
              </div>

              <div className="font-story-serif text-base sm:text-lg leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-wrap space-y-4">
                {generatedStory}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Character Dialogue Subtab */
        <div className="space-y-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
            Select a Resident of Ilode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CHARACTERS.map((char) => {
              const isSelected = selectedChar === char.id;
              return (
                <button
                  key={char.id}
                  onClick={() => {
                    setSelectedChar(char.id);
                    setCharQuestion(char.sampleQuestion);
                    setCharAnswer(null);
                  }}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-700 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="text-3xl mb-2">{char.avatar}</div>
                  <div className="font-bold text-sm text-stone-900 dark:text-stone-100">{char.name}</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{char.desc}</div>
                </button>
              );
            })}
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Your Question for {selectedChar}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={charQuestion}
                onChange={(e) => setCharQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskCharacter()}
                placeholder={`Ask ${selectedChar} something about their thoughts, memory, or community...`}
                className="flex-1 p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-600 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-xs"
              />
              <button
                onClick={handleAskCharacter}
                disabled={isAsking || !charQuestion.trim()}
                className="px-5 py-3 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-sm font-medium transition-all hover:bg-stone-800 dark:hover:bg-white disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {isAsking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Ask</span>
              </button>
            </div>
          </div>

          {/* Answer card */}
          {charAnswer && (
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs animate-in fade-in duration-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">
                  {CHARACTERS.find((c) => c.id === selectedChar)?.avatar}
                </span>
                <div>
                  <h4 className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {selectedChar} replies:
                  </h4>
                </div>
              </div>
              <p className="font-story-serif text-base text-stone-800 dark:text-stone-200 leading-relaxed italic">
                &ldquo;{charAnswer}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
