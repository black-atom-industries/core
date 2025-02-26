import React from 'react';
import { Definition } from '../types/theme';

interface ThemeEditorProps {
  theme: Definition | null;
  onUpdate: (updatedTheme: Definition) => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme, onUpdate }) => {
  if (!theme) {
    return <div className="p-4 bg-slate-800 rounded-lg">Select a theme to edit</div>;
  }

  const handleColorChange = (
    section: keyof Definition,
    category: string,
    property: string,
    value: string
  ) => {
    // Deep clone the theme
    const updatedTheme = JSON.parse(JSON.stringify(theme)) as Definition;
    
    // Update the nested property
    if (section === 'ui') {
      const [type, prop] = category.split('.');
      if (type === 'bg') {
        updatedTheme.ui.bg[property as keyof typeof updatedTheme.ui.bg] = value;
      } else if (type === 'fg') {
        updatedTheme.ui.fg[property as keyof typeof updatedTheme.ui.fg] = value;
      }
    } else if (section === 'syntax') {
      // Handle nested syntax properties
      const path = category.split('.');
      let current: any = updatedTheme.syntax;
      
      // Navigate to the correct nested object
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      // Update the value
      current[path[path.length - 1]][property] = value;
    } else if (section === 'palette') {
      updatedTheme.palette[property as keyof typeof updatedTheme.palette] = value;
    } else if (section === 'primaries') {
      const index = parseInt(property);
      if (!isNaN(index) && index >= 0 && index < 12) {
        updatedTheme.primaries[index] = value;
      }
    }
    
    onUpdate(updatedTheme);
  };

  // Render color input for a specific property
  const renderColorInput = (
    section: keyof Definition,
    category: string,
    label: string,
    property: string,
    value: string
  ) => (
    <div className="mb-2" key={`${category}-${property}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium" htmlFor={`${category}-${property}`}>
          {label}
        </label>
        <div className="flex items-center">
          <input
            type="color"
            id={`${category}-${property}`}
            value={value}
            onChange={(e) => handleColorChange(section, category, property, e.target.value)}
            className="w-8 h-8 mr-2 rounded cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => handleColorChange(section, category, property, e.target.value)}
            className="w-20 px-2 py-1 text-xs bg-slate-700 border border-slate-600 rounded"
          />
        </div>
      </div>
    </div>
  );

  // Render primary colors section
  const renderPrimaries = () => (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">Primary Colors</h3>
      <div className="grid grid-cols-2 gap-2">
        {theme.primaries.map((color, index) => (
          renderColorInput('primaries', 'primaries', `Primary ${index + 1}`, index.toString(), color)
        ))}
      </div>
    </div>
  );

  // Render palette section
  const renderPalette = () => (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">Color Palette</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(theme.palette).map(([key, value]) => (
          renderColorInput('palette', 'palette', key, key, value)
        ))}
      </div>
    </div>
  );

  // Render UI background colors
  const renderUIBackground = () => (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">UI Background</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(theme.ui.bg).map(([key, value]) => (
          renderColorInput('ui', 'bg', key, key, value)
        ))}
      </div>
    </div>
  );

  // Render UI foreground colors
  const renderUIForeground = () => (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">UI Foreground</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(theme.ui.fg).map(([key, value]) => (
          renderColorInput('ui', 'fg', key, key, value)
        ))}
      </div>
    </div>
  );

  // Render syntax colors (simplified for brevity)
  const renderSyntaxSection = (title: string, section: any, path: string) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(section).map(([key, value]) => {
          // Handle nested objects
          if (typeof value === 'object' && value !== null) {
            // Recursively render nested sections
            return (
              <div key={key} className="col-span-2 ml-4 mt-2">
                <h4 className="text-md font-semibold mb-1">{key}</h4>
                {Object.entries(value).map(([subKey, subValue]) => {
                  if (typeof subValue === 'string') {
                    return renderColorInput(
                      'syntax',
                      `${path}.${key}`,
                      subKey,
                      subKey,
                      subValue as string
                    );
                  }
                  return null;
                })}
              </div>
            );
          } else if (typeof value === 'string') {
            return renderColorInput('syntax', path, key, key, value);
          }
          return null;
        })}
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-slate-800 rounded-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{theme.meta.label}</h2>
      
      {renderPrimaries()}
      {renderPalette()}
      {renderUIBackground()}
      {renderUIForeground()}
      
      <h2 className="text-xl font-bold mb-4 mt-8">Syntax</h2>
      {renderSyntaxSection('Variables', theme.syntax.variable, 'variable')}
      {renderSyntaxSection('Strings', theme.syntax.string, 'string')}
      {renderSyntaxSection('Keywords', theme.syntax.keyword, 'keyword')}
      {renderSyntaxSection('Comments', theme.syntax.comment, 'comment')}
      {renderSyntaxSection('Markup', theme.syntax.markup, 'markup')}
      {/* Add more syntax sections as needed */}
    </div>
  );
};

export default ThemeEditor;