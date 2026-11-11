/**
 * useAnalyze.js
 * Custom hook managing the announcement analysis lifecycle:
 * idle → loading → success | error
 */

import { useReducer, useCallback } from 'react';
import { normalizeResponse } from '../utils/normalizeResponse.js';

const initialState = {
  status: 'idle',   // 'idle' | 'loading' | 'success' | 'error'
  data: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ANALYZE_START':
      return { status: 'loading', data: null, error: null };
    case 'ANALYZE_SUCCESS':
      return { status: 'success', data: action.payload, error: null };
    case 'ANALYZE_ERROR':
      return { status: 'error', data: null, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

/**
 * @returns {{ state, analyze, reset }}
 */
export function useAnalyze() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const analyze = useCallback(async (text) => {
    dispatch({ type: 'ANALYZE_START' });

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ announcement: text }),
      });

      const body = await response.json();

      if (!response.ok || !body.success) {
        const message = body?.error || 'We couldn\'t analyze this announcement. Please check the content and try again.';
        dispatch({ type: 'ANALYZE_ERROR', payload: message });
        return;
      }

      const normalized = normalizeResponse(body.data);
      dispatch({ type: 'ANALYZE_SUCCESS', payload: normalized });
    } catch (err) {
      // Network-level failure (server unreachable, etc.)
      console.error('[useAnalyze] Fetch error:', err.message);
      dispatch({
        type: 'ANALYZE_ERROR',
        payload: 'We couldn\'t reach the server. Please check your connection and try again.',
      });
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return { state, analyze, reset };
}
