import React, { useState } from "react";
import { Code2 } from "lucide-react";
import axios from "axios";

const CodeConverter: React.FC = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [sourceLang, setSourceLang] = useState("javascript");
  const [targetLang, setTargetLang] = useState("python");
  const [convertedCode, setConvertedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const languages = ["javascript", "python", "java", "cpp", "ruby", "go"];

  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      setError("Please enter some code before converting.");
      return;
    }

    setLoading(true);
    setError("");
    setConvertedCode("");

    try {
      const response = await axios.post("http://localhost:5000/convert-code", {
        sourceCode,
        sourceLang,
        targetLang,
      });

      if (response.data.convertedCode) {
        setConvertedCode(response.data.convertedCode);
      } else {
        setError("Conversion failed. No code returned from the server.");
      }
    } catch (err) {
      console.error("Error during conversion:", err);
      setError("Failed to convert code. Please check your connection or try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-2">
        <Code2 className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">AI Code Converter</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Source Language Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Language
          </label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Target Language Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Language
          </label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Source Code Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Source Code
        </label>
        <textarea
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          className="w-full h-48 p-3 border rounded-md font-mono"
          placeholder="Paste your code here..."
        />
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        disabled={loading || !sourceCode.trim()}
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          loading || !sourceCode.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Converting..." : "Convert Code"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Converted Code Output */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Converted Code
        </label>
        <pre className="w-full h-48 p-3 border rounded-md bg-gray-50 font-mono overflow-auto">
          {convertedCode || "Converted code will appear here..."}
        </pre>
      </div>
    </div>
  );
};

export default CodeConverter;
