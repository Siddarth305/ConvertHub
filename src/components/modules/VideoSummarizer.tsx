import React, { useState } from 'react';
import { Youtube } from 'lucide-react';
import axios from 'axios';

const VideoSummarizer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!videoUrl) {
      setError('Please enter a YouTube video URL');
      return;
    }

    setError('');
    setSummary('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/summarize', {
        videoUrl,
      });

      setSummary(response.data.summary);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Youtube className="w-6 h-6 text-red-600" />
        <h2 className="text-2xl font-bold text-gray-800">YouTube Video Summarizer</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          YouTube Video URL
        </label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-3 border rounded-md"
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      <button
        onClick={handleSummarize}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Generate Summary'}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Video Summary
        </label>
        <div className="w-full h-48 p-3 border rounded-md bg-gray-50 overflow-auto whitespace-pre-wrap">
          {summary || 'Summary will appear here...'}
        </div>
      </div>
    </div>
  );
};

export default VideoSummarizer;
