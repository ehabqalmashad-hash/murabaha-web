import { useState } from 'react';
import './App.css';
import MurabahaCalculator from './components/MurabahaCalculator';
import ResultsDisplay from './components/ResultsDisplay';
import HistoryPage from './components/HistoryPage';
import SettingsPage from './components/SettingsPage';
import { MurabahaCalculation } from './lib/calculations';

type Page = 'home' | 'history' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedResult, setSelectedResult] = useState<MurabahaCalculation | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="app-header">
        <h1>شمس المصارف</h1>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="app-main">
        {currentPage === 'home' && !selectedResult && (
          <MurabahaCalculator onResultSelect={setSelectedResult} />
        )}
        {selectedResult && (
          <ResultsDisplay
            result={selectedResult}
            onBack={() => setSelectedResult(null)}
          />
        )}
        {currentPage === 'history' && (
          <HistoryPage onSelectResult={setSelectedResult} />
        )}
        {currentPage === 'settings' && (
          <SettingsPage darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        )}
      </main>

      <nav className="app-nav">
        <button
          className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => {
            setCurrentPage('home');
            setSelectedResult(null);
          }}
        >
          🏠 الرئيسية
        </button>
        <button
          className={`nav-button ${currentPage === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentPage('history')}
        >
          📋 السجل
        </button>
        <button
          className={`nav-button ${currentPage === 'settings' ? 'active' : ''}`}
          onClick={() => setCurrentPage('settings')}
        >
          ⚙️ الإعدادات
        </button>
      </nav>
    </div>
  );
}

export default App;
