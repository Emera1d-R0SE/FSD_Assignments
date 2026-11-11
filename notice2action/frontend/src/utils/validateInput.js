/**
 * validateInput.js
 * Client-side input validation for announcement text.
 */

const MIN_LENGTH = 20;
const MAX_LENGTH = 10000;

/**
 * Validates the announcement text before sending to the API.
 * @param {string} text
 * @returns {{ valid: boolean, message: string }}
 */
export function validateInput(text) {
  if (!text || text.trim().length === 0) {
    return { valid: false, message: 'Please paste an announcement before analyzing.' };
  }

  if (text.trim().length < MIN_LENGTH) {
    return {
      valid: false,
      message: 'Please paste a full announcement for accurate analysis.',
    };
  }

  if (text.trim().length > MAX_LENGTH) {
    return {
      valid: false,
      message: `Announcement is too long. Please limit to ${MAX_LENGTH.toLocaleString()} characters.`,
    };
  }

  return { valid: true, message: '' };
}
