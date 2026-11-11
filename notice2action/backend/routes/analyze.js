/**
 * analyze.js
 * Express router — POST /api/analyze
 * Validates input, calls the AI service, validates the response, and returns
 * structured extraction results. Never exposes internal errors to the client.
 */

import { Router } from 'express';
import { analyzeAnnouncement } from '../services/aiService.js';
import { validateAndNormalize } from '../validators/responseValidator.js';

const router = Router();

// User-facing error messages — internal details are logged but never sent
const USER_ERRORS = {
  AI_API_FAILURE: 'We couldn\'t analyze this announcement. The AI service is currently unavailable. Please try again shortly.',
  AI_PARSE_FAILURE: 'We couldn\'t analyze this announcement. The AI returned an unexpected response. Please try again.',
  TIMEOUT: 'The analysis took too long. Please try again.',
  DEFAULT: 'We couldn\'t analyze this announcement. Please check the content and try again.',
};

/**
 * POST /api/analyze
 * Body: { announcement: string }
 * Returns: { success: true, data: ExtractionResult } | { success: false, error: string }
 */
router.post('/', async (req, res) => {
  const { announcement } = req.body;

  // --- Input validation ---
  if (!announcement || typeof announcement !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Please provide an announcement text.',
    });
  }

  const trimmed = announcement.trim();

  if (trimmed.length < 20) {
    return res.status(400).json({
      success: false,
      error: 'The announcement is too short. Please paste the full announcement text.',
    });
  }

  if (trimmed.length > 10000) {
    return res.status(400).json({
      success: false,
      error: 'The announcement is too long. Please limit it to 10,000 characters.',
    });
  }

  // --- AI processing ---
  try {
    const rawResult = await analyzeAnnouncement(trimmed);
    const normalized = validateAndNormalize(rawResult);

    return res.status(200).json({
      success: true,
      data: normalized,
    });
  } catch (err) {
    console.error('[/api/analyze] Error during processing:', err.message);

    // Map typed errors to user-facing messages
    const userMessage = USER_ERRORS[err.message] ?? USER_ERRORS.DEFAULT;
    const statusCode = err.message === 'TIMEOUT' ? 504 : 500;

    return res.status(statusCode).json({
      success: false,
      error: userMessage,
    });
  }
});

export default router;
