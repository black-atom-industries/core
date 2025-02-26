import React from 'react';
import { themeKeys } from '../types/theme';

const ThemeSelector: React.FC = () => {
  return (
    <div className="flex items-center">
      <label htmlFor="theme-select" className="mr-2 text-sm">Theme:</label>
      <select 
        id="theme-select" 
        className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm"
      >
        {themeKeys.map(key => (
          <option key={key} value={key}>
            {key.replace(/black-atom-/, '').split('-').join(' ')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;