import React, { useState } from 'react';
import ThemeEditor from '../components/ThemeEditor';
import EditorPreview from '../components/EditorPreview';
import UIPreview from '../components/UIPreview';
import { Definition } from '../types/theme';

// Mock theme implementation for initial display
// In the real application, you would import this from your core project
import mockTheme from '../mockData/sample-theme';

const HomePage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<Definition | null>(mockTheme);
  const [activeTab, setActiveTab] = useState<'editor' | 'ui'>('editor');

  const handleThemeUpdate = (updatedTheme: Definition) => {
    setActiveTheme(updatedTheme);
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Theme Editor</h2>
          <div className="bg-slate-800 rounded-lg p-4 h-full">
            <ThemeEditor theme={activeTheme} onUpdate={handleThemeUpdate} />
          </div>
        </div>
        
        <div>
          <div className="flex mb-4">
            <button
              className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${
                activeTab === 'editor' 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-slate-700 text-slate-300'
              }`}
              onClick={() => setActiveTab('editor')}
            >
              Editor Preview
            </button>
            <button
              className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${
                activeTab === 'ui' 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-slate-700 text-slate-300'
              }`}
              onClick={() => setActiveTab('ui')}
            >
              UI Preview
            </button>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 h-full">
            {activeTab === 'editor' ? (
              <EditorPreview theme={activeTheme} />
            ) : (
              <UIPreview theme={activeTheme} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;