/**
 * responseValidator.js
 * Validates and normalizes the AI response to the canonical ExtractionResult schema.
 * Ensures the frontend never crashes due to a missing optional field.
 */

const VALID_PRIORITIES = new Set(['HIGH', 'MEDIUM', 'LOW']);

/**
 * Normalizes a single required_action item, filling in missing fields with defaults.
 * @param {*} item
 * @returns {object}
 */
function normalizeAction(item) {
  if (typeof item !== 'object' || item === null) {
    return {
      action: 'Not specified',
      deadline: 'Not specified',
      priority: 'LOW',
      reason: 'Not specified',
    };
  }
  return {
    action: typeof item.action === 'string' ? item.action : 'Not specified',
    deadline: typeof item.deadline === 'string' ? item.deadline : 'Not specified',
    priority: VALID_PRIORITIES.has(item.priority) ? item.priority : 'LOW',
    reason: typeof item.reason === 'string' ? item.reason : 'Not specified',
  };
}

/**
 * Normalizes a single important_date item, filling in missing fields with defaults.
 * @param {*} item
 * @returns {object}
 */
function normalizeDate(item) {
  if (typeof item !== 'object' || item === null) {
    return {
      date: 'Not specified',
      time: 'Not specified',
      event: 'Not specified',
      description: 'Not specified',
    };
  }
  return {
    date: typeof item.date === 'string' ? item.date : 'Not specified',
    time: typeof item.time === 'string' ? item.time : 'Not specified',
    event: typeof item.event === 'string' ? item.event : 'Not specified',
    description: typeof item.description === 'string' ? item.description : 'Not specified',
  };
}

/**
 * Validates and normalizes the raw AI response object to the canonical schema.
 * Missing top-level fields are coerced to safe defaults.
 * Never throws — always returns a usable object.
 *
 * @param {*} raw - The parsed AI JSON response
 * @returns {object} - Normalized ExtractionResult
 */
export function validateAndNormalize(raw) {
  if (typeof raw !== 'object' || raw === null) {
    console.warn('[responseValidator] AI returned non-object; using full defaults.');
    raw = {};
  }

  // Normalize changes block
  const rawChanges = typeof raw.changes === 'object' && raw.changes !== null
    ? raw.changes
    : {};
  const changes = {
    hasChanges: typeof rawChanges.hasChanges === 'boolean' ? rawChanges.hasChanges : false,
    description: typeof rawChanges.description === 'string' ? rawChanges.description : 'Not specified',
    previous: typeof rawChanges.previous === 'string' ? rawChanges.previous : 'Not specified',
    current: typeof rawChanges.current === 'string' ? rawChanges.current : 'Not specified',
  };

  // Normalize affected_people — must be a string array
  const affected_people = Array.isArray(raw.affected_people)
    ? raw.affected_people.filter(p => typeof p === 'string')
    : [];

  // Normalize important_dates array
  const important_dates = Array.isArray(raw.important_dates)
    ? raw.important_dates.map(normalizeDate)
    : [];

  // Normalize required_actions array — sort HIGH → MEDIUM → LOW
  const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  const required_actions = Array.isArray(raw.required_actions)
    ? raw.required_actions.map(normalizeAction).sort(
        (a, b) => (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2)
      )
    : [];

  // Normalize warnings — must be a string array
  const warnings = Array.isArray(raw.warnings)
    ? raw.warnings.filter(w => typeof w === 'string')
    : [];

  return {
    title: typeof raw.title === 'string' ? raw.title : 'College Announcement',
    summary: typeof raw.summary === 'string' ? raw.summary : 'Not specified',
    changes,
    affected_people,
    important_dates,
    required_actions,
    warnings,
  };
}
