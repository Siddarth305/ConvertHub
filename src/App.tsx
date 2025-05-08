import React, { useState } from 'react';
import { Code2, BookOpen, Volume2, Youtube, Languages, Search } from 'lucide-react'; // ✅ Added Search icon
import TabContent from './components/TabContent';

function App() {
  const [activeTab, setActiveTab] = useState('code');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'code', name: 'Code Converter', icon: Code2 },
    { id: 'paragraph-summarizer', name: 'Paragraph Summarizer', icon: BookOpen },
    { id: 'grammar-checker', name: 'Grammar Checker', icon: Search }, // ✅ Updated tab to Grammar Checker
    { id: 'video', name: 'Video Summarizer', icon: Youtube },
    { id: 'translate', name: 'Language Translator', icon: Languages },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col items-center p-4`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="flex items-center justify-center w-full mb-8">
          {/* Sidebar header stays hidden when collapsed */}
          <h1 className={`text-xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>
            AI Translate
          </h1>
        </div>

        <div className="flex flex-col w-full space-y-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-6 h-6" />
                {isSidebarOpen && <span className="text-lg">{tab.name}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900">AI Translate</h1>
        </header>

        {/* Content Area */}
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
}

export default App;
