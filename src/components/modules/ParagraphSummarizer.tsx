import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

const ParagraphSummarizer: React.FC = () => {
  const [paragraph, setParagraph] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = () => {
    // Simple mock summarization for now
    if (paragraph.trim() !== '') {
      const sentences = paragraph.split('.').filter(sentence => sentence.trim() !== '');
      const firstFew = sentences.slice(0, Math.min(2, sentences.length)).join('. ') + '.';
      setSummary(firstFew);
    } else {
      setSummary('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <BookOpen className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Paragraph Summarizer</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Paragraph
        </label>
        <textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          className="w-full h-48 p-3 border rounded-md font-mono bg-gray-50"
          placeholder="Paste your paragraph here..."
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSummarize}
          className="px-6 py-3 rounded-md bg-green-600 text-white hover:opacity-90 transition-opacity"
        >
          Summarize
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary
        </label>
        <textarea
          value={summary}
          readOnly
          className="w-full h-32 p-3 border rounded-md font-mono bg-gray-100"
          placeholder="Summary will appear here..."
        />
      </div>
    </div>
  );
};

export default ParagraphSummarizer;
