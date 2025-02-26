import React from 'react';
import { Definition } from '../types/theme';

interface UIPreviewProps {
  theme: Definition | null;
}

const UIPreview: React.FC<UIPreviewProps> = ({ theme }) => {
  if (!theme) {
    return <div className="p-4 bg-slate-800 rounded-lg">Select a theme to preview UI elements</div>;
  }

  // Helper function to display color squares
  const ColorSquare = ({ color, label }: { color: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div 
        style={{ backgroundColor: color }} 
        className="w-16 h-16 rounded shadow-lg border border-gray-700"
      />
      <span className="mt-2 text-xs">{label}</span>
      <span className="text-xs opacity-60">{color}</span>
    </div>
  );

  // Helper function to display text samples on different backgrounds
  const TextOnBackground = ({ 
    bgColor, 
    fgColor, 
    bgLabel,
    fgLabel
  }: { 
    bgColor: string; 
    fgColor: string; 
    bgLabel: string;
    fgLabel: string;
  }) => (
    <div className="mb-4">
      <div className="flex items-center mb-1 text-sm">
        <span className="mr-2">{bgLabel}</span>
        <div className="w-4 h-4 mr-1 rounded" style={{ backgroundColor: bgColor }}></div>
        <span className="text-xs opacity-70">{bgColor}</span>
        
        <span className="mx-2">+</span>
        
        <span className="mr-2">{fgLabel}</span>
        <div className="w-4 h-4 mr-1 rounded" style={{ backgroundColor: fgColor }}></div>
        <span className="text-xs opacity-70">{fgColor}</span>
      </div>
      
      <div 
        style={{ backgroundColor: bgColor, color: fgColor }} 
        className="p-4 rounded-lg"
      >
        <p className="font-bold">Sample text with {fgLabel} on {bgLabel}</p>
        <p>This is how your text will look with this color combination.</p>
        <p className="text-sm">Smaller text for testing readability</p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">UI Preview</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Primary Colors</h3>
        <div className="grid grid-cols-6 gap-4">
          {theme.primaries.map((color, index) => (
            <ColorSquare key={index} color={color} label={`Primary ${index + 1}`} />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Palette</h3>
        <div className="grid grid-cols-8 gap-4">
          {Object.entries(theme.palette).map(([key, color]) => (
            <ColorSquare key={key} color={color} label={key} />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">UI Background Colors</h3>
        <div className="grid grid-cols-8 gap-4">
          {Object.entries(theme.ui.bg).map(([key, color]) => (
            <ColorSquare key={key} color={color} label={`bg.${key}`} />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">UI Foreground Colors</h3>
        <div className="grid grid-cols-8 gap-4">
          {Object.entries(theme.ui.fg).map(([key, color]) => (
            <ColorSquare key={key} color={color} label={`fg.${key}`} />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Text Color Combinations</h3>
        
        <TextOnBackground 
          bgColor={theme.ui.bg.default} 
          fgColor={theme.ui.fg.default} 
          bgLabel="Background Default" 
          fgLabel="Foreground Default"
        />
        
        <TextOnBackground 
          bgColor={theme.ui.bg.panel} 
          fgColor={theme.ui.fg.default} 
          bgLabel="Panel" 
          fgLabel="Default Text"
        />
        
        <TextOnBackground 
          bgColor={theme.ui.bg.default} 
          fgColor={theme.ui.fg.accent} 
          bgLabel="Background Default" 
          fgLabel="Accent Text"
        />
        
        <TextOnBackground 
          bgColor={theme.ui.bg.default} 
          fgColor={theme.ui.fg.subtle} 
          bgLabel="Background Default" 
          fgLabel="Subtle Text"
        />
        
        <TextOnBackground 
          bgColor={theme.ui.bg.negative} 
          fgColor={theme.ui.fg.contrast} 
          bgLabel="Negative Background" 
          fgLabel="Contrast Text"
        />
        
        <TextOnBackground 
          bgColor={theme.ui.bg.positive} 
          fgColor={theme.ui.fg.contrast} 
          bgLabel="Positive Background" 
          fgLabel="Contrast Text"
        />
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">UI Components Preview</h3>
        
        <div 
          style={{ backgroundColor: theme.ui.bg.panel }} 
          className="p-6 rounded-lg mb-6"
        >
          <h4 style={{ color: theme.ui.fg.default }} className="text-lg mb-4">Form Elements</h4>
          
          <div className="mb-4">
            <label 
              style={{ color: theme.ui.fg.default }} 
              className="block mb-2 text-sm font-medium"
            >
              Input Field
            </label>
            <input 
              type="text" 
              placeholder="Enter text..."
              style={{ 
                backgroundColor: theme.ui.bg.default,
                color: theme.ui.fg.default,
                borderColor: theme.ui.bg.hover,
              }} 
              className="w-full p-2 rounded-md border"
            />
          </div>
          
          <div className="mb-4">
            <button
              style={{ 
                backgroundColor: theme.ui.bg.active,
                color: theme.ui.fg.default,
                borderColor: theme.ui.bg.hover,
              }}
              className="px-4 py-2 rounded-md border mr-2"
            >
              Primary Button
            </button>
            
            <button
              style={{ 
                backgroundColor: theme.ui.bg.default,
                color: theme.ui.fg.default,
                borderColor: theme.ui.bg.hover,
              }}
              className="px-4 py-2 rounded-md border"
            >
              Secondary Button
            </button>
          </div>
          
          <div className="mb-4">
            <div style={{ backgroundColor: theme.ui.bg.default }} className="p-4 rounded-md">
              <p style={{ color: theme.ui.fg.default }}>
                Panel with default background and text
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <div style={{ backgroundColor: theme.ui.bg.selection }} className="p-4 rounded-md">
              <p style={{ color: theme.ui.fg.default }}>
                Selected item with selection background
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div style={{ backgroundColor: theme.ui.bg.negative }} className="p-4 rounded-md">
              <p style={{ color: theme.ui.fg.negative }}>Error message</p>
            </div>
            
            <div style={{ backgroundColor: theme.ui.bg.positive }} className="p-4 rounded-md">
              <p style={{ color: theme.ui.fg.positive }}>Success message</p>
            </div>
            
            <div style={{ backgroundColor: theme.ui.bg.warn }} className="p-4 rounded-md">
              <p style={{ color: theme.ui.fg.warn }}>Warning message</p>
            </div>
            
            <div style={{ backgroundColor: theme.ui.bg.info }} className="p-4 rounded-md">
              <p style={{ color: theme.ui.fg.info }}>Info message</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIPreview;