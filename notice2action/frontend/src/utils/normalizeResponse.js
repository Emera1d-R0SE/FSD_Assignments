/**
 * normalizeResponse.js
 * Client-side defensive normalization of the API response.
 * Ensures every field exists before React tries to render it.
 * Mirrors the server-side validator as a second safety net.
 */

const VALID_PRIORITIES = new Set(['HIGH', 'MEDIUM', 'LOW']);

function normalizeAction(item) {
  if (typeof item !== 'object' || item === null) {
    return { action: 'Not specified', deadline: 'Not specified', priority: 'LOW', reason: 'Not specified' };
  }
  return {
    action:   typeof item.action   === 'string' ? item.action   : 'Not specified',
    deadline: typeof item.deadline === 'string' ? item.deadline : 'Not specified',
    priority: VALID_PRIORITIES.has(item.priority) ? item.priority : 'LOW',
    reason:   typeof item.reason   === 'string' ? item.reason   : 'Not specified',
  };
}

function normalizeDate(item) {
  if (typeof item !== 'object' || item === null) {
    return { date: 'Not specified', time: 'Not specified', event: 'Not specified', description: 'Not specified' };
  }
  return {
    date:        typeof item.date        === 'string' ? item.date        : 'Not specified',
    time:        typeof item.time        === 'string' ? item.time        : 'Not specified',
    event:       typeof item.event       === 'string' ? item.event       : 'Not specified',
    description: typeof item.description === 'string' ? item.description : 'Not specified',
  };
}

/**
 * Normalizes the data payload from the API response.
 * @param {object} data - The `data` field from the API response body
 * @returns {object} - Normalized ExtractionResult safe for rendering
 */
export function normalizeResponse(data) {
  if (typeof data !== 'object' || data === null) data = {};

  const rawChanges = typeof data.changes === 'object' && data.changes !== null ? data.changes : {};

  return {
    title:   typeof data.title   === 'string' ? data.title   : 'College Announcement',
    summary: typeof data.summary === 'string' ? data.summary : 'Not specified',

    changes: {
      hasChanges:  typeof rawChanges.hasChanges === 'boolean' ? rawChanges.hasChanges : false,
      description: typeof rawChanges.description === 'string' ? rawChanges.description : 'Not specified',
      previous:    typeof rawChanges.previous    === 'string' ? rawChanges.previous    : 'Not specified',
      current:     typeof rawChanges.current     === 'string' ? rawChanges.current     : 'Not specified',
    },

    affected_people:  Array.isArray(data.affected_people)  ? data.affected_people.filter(p => typeof p === 'string')  : [],
    important_dates:  Array.isArray(data.important_dates)  ? data.important_dates.map(normalizeDate)                  : [],
    required_actions: Array.isArray(data.required_actions) ? data.required_actions.map(normalizeAction)               : [],
    warnings:         Array.isArray(data.warnings)         ? data.warnings.filter(w => typeof w === 'string')         : [],
  };
}
