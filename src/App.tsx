import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import DataEntryPage from './components/DataEntryPage';
import DataViewerPage from './components/DataViewerPage';
import { validateCredentials } from './utils/auth';
import { EntryData } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentPage, setCurrentPage] = useState<'entry' | 'viewer'>('entry');
  const [entries, setEntries] = useState<EntryData[]>([]);

  const handleLogin = (username: string, password: string) => {
    if (validateCredentials(username, password)) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleSaveEntry = (entry: EntryData) => {
    setEntries(prev => [...prev, entry]);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => setCurrentPage('entry')}
              className={`py-4 px-3 text-sm font-medium border-b-2 ${
                currentPage === 'entry'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Data Entry
            </button>
            <button
              onClick={() => setCurrentPage('viewer')}
              className={`py-4 px-3 text-sm font-medium border-b-2 ${
                currentPage === 'viewer'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              View Data
            </button>
          </div>
        </div>
      </nav>

      {currentPage === 'entry' ? (
        <DataEntryPage onSave={handleSaveEntry} />
      ) : (
        <DataViewerPage entries={entries} />
      )}
    </div>
  );
}

export default App;