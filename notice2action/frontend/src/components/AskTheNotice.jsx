import { useState } from 'react';
import { useAsk } from '../hooks/useAsk.js';
import './AskTheNotice.css';

const EXAMPLE_QUESTIONS = [
  'What do I need to do?',
  'What is the deadline?',
  'What changed?',
  'Who is affected?',
  'What happens if I miss the deadline?',
];

/**
 * "Ask the Notice" Q&A panel.
 * Appears only after a successful announcement analysis.
 *
 * @param {{ announcement: string }} props
 *   announcement — the original raw announcement text (source of truth)
 */
export default function AskTheNotice({ announcement }) {
  const [question, setQuestion] = useState('');
  const [validationError, setValidationError] = useState('');
  const { state, ask, reset } = useAsk();

  // ── Submit handler ─────────────────────────────────────────────────────────
  function handleAsk() {
    const trimmed = question.trim();

    if (!trimmed) {
      setValidationError('Please enter a question.');
      return;
    }
    if (trimmed.length < 3) {
      setValidationError('Please enter a more complete question.');
      return;
    }

    setValidationError('');
    ask(announcement, trimmed);
  }

  // ── Example question click ─────────────────────────────────────────────────
  function handleExample(q) {
    setQuestion(q);
    setValidationError('');
    ask(announcement, q);
  }

  // ── Clear / new question ───────────────────────────────────────────────────
  function handleClear() {
    setQuestion('');
    setValidationError('');
    reset();
  }

  // ── Key press ──────────────────────────────────────────────────────────────
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && state.status !== 'loading') {
      e.preventDefault();
      handleAsk();
    }
  }

  const isLoading = state.status === 'loading';

  return (
    <section className="ask-section card" aria-label="Ask the Notice Q&A">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="ask-header">
        <h2 className="ask-title">
          <span aria-hidden="true">💬</span> Ask the Notice
        </h2>
        <p className="ask-description">
          Ask questions about this announcement. Answers are based only on the
          information provided in the notice.
        </p>
      </div>

      {/* ── Example questions ───────────────────────────────────────────────── */}
      <div className="ask-examples" aria-label="Example questions">
        <p className="ask-examples-label">Try asking:</p>
        <div className="ask-examples-chips">
          {EXAMPLE_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              className="example-chip"
              onClick={() => handleExample(q)}
              disabled={isLoading}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* ── Input row ───────────────────────────────────────────────────────── */}
      <div className="ask-input-row">
        <div className="ask-input-wrapper">
          <input
            id="ask-input"
            type="text"
            className={`ask-input${validationError ? ' ask-input-error' : ''}`}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (validationError) setValidationError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here…"
            disabled={isLoading}
            maxLength={500}
            aria-label="Question"
            aria-describedby={validationError ? 'ask-validation' : undefined}
            aria-invalid={!!validationError}
          />
          {validationError && (
            <p id="ask-validation" className="ask-validation-error" role="alert">
              <span aria-hidden="true">⚠</span> {validationError}
            </p>
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary ask-btn"
          onClick={handleAsk}
          disabled={isLoading || !question.trim()}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className="btn-spinner" aria-hidden="true" />
              Thinking…
            </>
          ) : (
            'Ask'
          )}
        </button>
      </div>

      {/* ── Answer area ─────────────────────────────────────────────────────── */}
      {state.status === 'success' && state.answer && (
        <div className="ask-answer" role="region" aria-label="Answer">
          <div className="ask-answer-header">
            <span className="ask-answer-label">Answer</span>
            <button
              type="button"
              className="ask-clear-btn"
              onClick={handleClear}
              aria-label="Clear answer and ask a new question"
            >
              Ask another question
            </button>
          </div>
          {/* Render answer — the model may use **bold** markdown; convert it */}
          <p
            className="ask-answer-text"
            dangerouslySetInnerHTML={{ __html: formatAnswer(state.answer) }}
          />
        </div>
      )}

      {/* ── Error state ─────────────────────────────────────────────────────── */}
      {state.status === 'error' && (
        <div className="ask-error" role="alert">
          <span aria-hidden="true">✕</span>
          <span>{state.error}</span>
          <button
            type="button"
            className="btn btn-ghost ask-retry-btn"
            onClick={handleAsk}
          >
            Try Again
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * Converts **bold** markdown in AI answers to <strong> tags.
 * This is the only allowed HTML — no other markdown or user content
 * reaches dangerouslySetInnerHTML; the AI answer comes from our own
 * controlled Gemini call and contains only text + **bold** markers.
 *
 * @param {string} text
 * @returns {string} HTML string safe for rendering
 */
function formatAnswer(text) {
  // Escape any raw HTML first (belt-and-suspenders)
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  // Convert **bold** → <strong>bold</strong>
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
