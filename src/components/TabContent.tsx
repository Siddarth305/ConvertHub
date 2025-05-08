import React from 'react';
import CodeConverter from './modules/CodeConverter';
import ParagraphSummarizer from './modules/ParagraphSummarizer';
import GrammarChecker from './modules/GrammarChecker'; // ✅ Updated import to GrammarChecker
import VideoSummarizer from './modules/VideoSummarizer';
import LanguageTranslator from './modules/LanguageTranslator';

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'code':
        return <CodeConverter />;
      case 'paragraph-summarizer':
        return <ParagraphSummarizer />;
      case 'grammar-checker': // ✅ Updated to 'grammar-checker'
        return <GrammarChecker />; // ✅ Updated to render GrammarChecker
      case 'video':
        return <VideoSummarizer />;
      case 'translate':
        return <LanguageTranslator />;
      default:
        return <CodeConverter />;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      {renderContent()}
    </div>
  );
};

export default TabContent;
