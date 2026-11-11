import { useState, useRef } from 'react';
import { useAnalyze } from './hooks/useAnalyze.js';
import Header from './components/Header.jsx';
import AnnouncementInput from './components/AnnouncementInput.jsx';
import LoadingState from './components/LoadingState.jsx';
import ResultsPanel from './components/ResultsPanel.jsx';
import AskTheNotice from './components/AskTheNotice.jsx';
import './App.css';

export default function App() {
  const [announcement, setAnnouncement] = useState('');
  const { state, analyze, reset } = useAnalyze();

  // Keep a ref to the announcement text that was last successfully analyzed.
  // AskTheNotice needs the original text (not the summary) as its source of truth.
  // We store it separately so it survives between renders and is immune to the
  // user editing the textarea after clicking Analyze.
  const analyzedAnnouncementRef = useRef('');

  function handleAnalyze() {
    // Store a snapshot of the announcement text before the async call
    analyzedAnnouncementRef.current = announcement;
    analyze(announcement);
  }

  function handleClear() {
    setAnnouncement('');
    analyzedAnnouncementRef.current = '';
    reset();
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="container">
          <AnnouncementInput
            value={announcement}
            onChange={setAnnouncement}
            onSubmit={handleAnalyze}
            onClear={handleClear}
            isLoading={state.status === 'loading'}
          />

          {/* Loading state */}
          {state.status === 'loading' && <LoadingState />}

          {/* Error state */}
          {state.status === 'error' && (
            <div className="error-state card" role="alert">
              <span className="error-icon" aria-hidden="true">✕</span>
              <div>
                <p className="error-title">Analysis Failed</p>
                <p className="error-message">{state.error}</p>
              </div>
              <button
                type="button"
                className="btn btn-ghost retry-btn"
                onClick={handleAnalyze}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Success state — analysis results + Ask the Notice */}
          {state.status === 'success' && state.data && (
            <>
              <ResultsPanel data={state.data} />
              <AskTheNotice announcement={analyzedAnnouncementRef.current} />
            </>
          )}

          {/* Idle state placeholder */}
          {state.status === 'idle' && (
            <div className="idle-state" aria-hidden="true">
              <div className="idle-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="12" fill="#6c63ff" fillOpacity="0.08"/>
                  <path d="M14 16h20M14 24h14M14 32h17" stroke="#6c63ff" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="36" cy="32" r="6" fill="#6c63ff" fillOpacity="0.15" stroke="#6c63ff" strokeOpacity="0.4" strokeWidth="1.5"/>
                  <path d="M34 32l1.5 1.5 3-3" stroke="#6c63ff" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="idle-title">Your action checklist will appear here</p>
              <p className="idle-subtitle">Paste a college announcement above and click Analyze</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
