import React, { useState } from 'react';
import { Search } from 'lucide-react';

const GrammarChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [grammarResult, setGrammarResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckGrammar = async () => {
    if (!text.trim()) {
      setGrammarResult("Please enter some text to check.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/grammar-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        setGrammarResult(data.result);
      } else {
        setGrammarResult(data.error || 'Error checking grammar.');
      }
    } catch (error) {
      console.error('Grammar Check Error:', error);
      setGrammarResult('Error checking grammar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Grammar Checker</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 p-3 border rounded-md"
          placeholder="Paste your paragraph here..."
        />
      </div>

      <button
        onClick={handleCheckGrammar}
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Grammar'}
      </button>

      {grammarResult && (
        <div className="mt-6 p-4 bg-gray-100 border rounded-md">
          <h3 className="text-lg font-semibold mb-2">Result:</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{grammarResult}</p>
        </div>
      )}
    </div>
  );
};

export default GrammarChecker;
