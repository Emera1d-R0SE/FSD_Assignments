/**
 * useAsk.js
 * Custom hook managing the "Ask the Notice" Q&A lifecycle.
 * Mirrors the useAnalyze pattern: useReducer state machine.
 *
 * States: 'idle' | 'loading' | 'success' | 'error'
 */

import { useReducer, useCallback } from 'react';

const initialState = {
  status: 'idle',    // 'idle' | 'loading' | 'success' | 'error'
  answer: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ASK_START':
      return { status: 'loading', answer: null, error: null };
    case 'ASK_SUCCESS':
      return { status: 'success', answer: action.payload, error: null };
    case 'ASK_ERROR':
      return { status: 'error', answer: null, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

/**
 * @returns {{ state, ask, reset }}
 *
 * ask(announcement, question) — fires the /api/ask request
 * reset()                     — returns to idle (clears answer + error)
 */
export function useAsk() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ask = useCallback(async (announcement, question) => {
    // Guard: don't submit if already loading
    if (!announcement || !question?.trim()) return;

    dispatch({ type: 'ASK_START' });

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ announcement, question: question.trim() }),
      });

      const body = await response.json();

      if (!response.ok || !body.success) {
        const message =
          body?.error ||
          'Something went wrong while answering your question. Please try again.';
        dispatch({ type: 'ASK_ERROR', payload: message });
        return;
      }

      dispatch({ type: 'ASK_SUCCESS', payload: body.answer });
    } catch (err) {
      console.error('[useAsk] Fetch error:', err.message);
      dispatch({
        type: 'ASK_ERROR',
        payload:
          'We couldn\'t reach the server. Please check your connection and try again.',
      });
    }
  }, []);

  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return { state, ask, reset };
}
