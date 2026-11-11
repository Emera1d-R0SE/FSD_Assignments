import { useState } from 'react';
import { validateInput } from '../utils/validateInput.js';
import './AnnouncementInput.css';

const MAX_LENGTH = 10000;

/**
 * @param {{ value, onChange, onSubmit, onClear, isLoading }} props
 */
export default function AnnouncementInput({ value, onChange, onSubmit, onClear, isLoading }) {
  const [validationError, setValidationError] = useState('');

  function handleSubmit() {
    const { valid, message } = validateInput(value);
    if (!valid) {
      setValidationError(message);
      return;
    }
    setValidationError('');
    onSubmit();
  }

  function handleChange(e) {
    onChange(e.target.value);
    // Clear validation error as soon as the user starts correcting
    if (validationError) setValidationError('');
  }

  function handleClear() {
    setValidationError('');
    onClear();
  }

  const charCount = value.length;
  const isOverLimit = charCount > MAX_LENGTH;
  const isSubmitDisabled = isLoading || isOverLimit;

  return (
    <section className="input-section card" aria-label="Announcement input">
      <label htmlFor="announcement-input" className="input-label">
        Paste your college announcement
      </label>

      <div className="textarea-wrapper">
        <textarea
          id="announcement-input"
          className={`announcement-textarea ${validationError ? 'textarea-error' : ''}`}
          value={value}
          onChange={handleChange}
          placeholder="Paste your college announcement here…"
          rows={8}
          maxLength={MAX_LENGTH + 100} /* soft visual limit, hard limit on server */
          disabled={isLoading}
          aria-describedby={validationError ? 'input-error-msg' : 'char-count'}
          aria-invalid={!!validationError}
        />
        <div className="textarea-footer">
          {validationError ? (
            <p id="input-error-msg" className="validation-error" role="alert">
              <span aria-hidden="true">⚠</span> {validationError}
            </p>
          ) : (
            <span id="char-count" className={`char-count ${isOverLimit ? 'char-count-over' : ''}`}>
              {charCount.toLocaleString()} / {MAX_LENGTH.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className="input-actions">
        <button
          type="button"
          className="btn btn-primary analyze-btn"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className="btn-spinner" aria-hidden="true" />
              Analyzing…
            </>
          ) : (
            <>
              <span aria-hidden="true">✦</span>
              Analyze Announcement
            </>
          )}
        </button>

        {(value || isLoading === false) && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </button>
        )}
      </div>
    </section>
  );
}
