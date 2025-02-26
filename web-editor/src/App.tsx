import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import ThemeEditor from './components/ThemeEditor'
import EditorPreview from './components/EditorPreview'
import UIPreview from './components/UIPreview'
import ThemeSelector from './components/ThemeSelector'

// Pages
import HomePage from './pages/HomePage'

function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'ui'>('editor')

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        <header className="bg-slate-800 p-4 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Black Atom Theme Editor</h1>
            <ThemeSelector />
          </div>
        </header>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App