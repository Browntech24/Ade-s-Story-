/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Download, Copy, Check, Printer, FileText } from 'lucide-react';
import { STORY_CHAPTERS, STORY_METADATA } from '../data/story';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getFullStoryText = () => {
    let out = `# ${STORY_METADATA.title}\n\n`;
    out += `*${STORY_METADATA.synopsis}*\n\n---\n\n`;

    STORY_CHAPTERS.forEach((ch) => {
      out += `## Chapter ${ch.romanNumeral}: ${ch.title}\n`;
      out += `*${ch.subtitle}*\n\n`;
      ch.paragraphs.forEach((p) => {
        out += `${p}\n\n`;
      });
      out += `---\n\n`;
    });

    return out;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullStoryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: 'markdown' | 'txt') => {
    const text = getFullStoryText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ade-goes-to-school.${format === 'markdown' ? 'md' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-stone-50 dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 text-stone-900 dark:text-stone-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-800 dark:text-amber-400" />
            <h3 id="export-dialog-title" className="text-base font-bold text-stone-900 dark:text-stone-100">
              Export & Share Story
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-story-serif">
          Download or print the complete text of &ldquo;Ade Goes to School&rdquo; for offline reading, educational use, or sharing.
        </p>

        <div className="mt-5 space-y-2.5">
          <button
            onClick={handleCopy}
            className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Copy className="w-4 h-4 text-stone-500" />
              <span>Copy Full Story to Clipboard</span>
            </div>
            {copied && <span className="text-emerald-600 font-semibold text-xs">Copied!</span>}
          </button>

          <button
            onClick={() => handleDownload('markdown')}
            className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Download className="w-4 h-4 text-stone-500" />
              <span>Download Markdown (.md)</span>
            </div>
          </button>

          <button
            onClick={() => handleDownload('txt')}
            className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-stone-500" />
              <span>Download Plain Text (.txt)</span>
            </div>
          </button>

          <button
            onClick={handlePrint}
            className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Printer className="w-4 h-4 text-stone-500" />
              <span>Print Clean Manuscript</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
