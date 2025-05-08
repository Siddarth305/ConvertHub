import React, { useState } from 'react';
import { Languages } from 'lucide-react';

const LanguageTranslator: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ta', name: 'Tamil' }
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) return; // Prevent empty translation

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, sourceLang, targetLang })
      });

      const data = await response.json();
      setTranslatedText(data.translation || 'Translation failed!');
    } catch (error) {
      setTranslatedText('Error in translation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Languages className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Language Translator</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text to Translate</label>
        <textarea
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          className="w-full h-32 p-3 border rounded-md"
          placeholder="Enter text to translate..."
        />
      </div>

      <button
        onClick={handleTranslate} // ✅ Corrected function call
        disabled={loading || !sourceText.trim()} // ✅ Fixed check for empty input
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          loading || !sourceText.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Translation</label>
        <div className="w-full h-32 p-3 border rounded-md bg-gray-50">
          {translatedText || 'Translated text will appear here'}
        </div>
      </div>
    </div>
  );
};

export default LanguageTranslator;
