/**
 * aiService.js
 * Integrates with Google Gemini for two tasks:
 *   1. analyzeAnnouncement() — structured JSON extraction
 *   2. askQuestion()         — natural-language Q&A grounded in the announcement
 *
 * API key is sourced from environment only — never exposed to the frontend.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildExtractionPrompt } from '../prompts/extractionPrompt.js';
import { buildQAPrompt } from '../prompts/qaPrompt.js';

// Initialise Gemini client — API key sourced from environment only
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model for structured JSON extraction (analyzeAnnouncement)
// responseMimeType forces JSON output; low temperature for consistency
const jsonModel = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  generationConfig: {
    temperature: 0.1,        // Low temperature for consistent structured output
    maxOutputTokens: 2048,
    responseMimeType: 'application/json', // Ask Gemini to return JSON directly
  },
});

// Model for natural-language Q&A (askQuestion)
// Plain text response; slightly higher temperature for readable prose
const qaModel = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  generationConfig: {
    temperature: 0.3,        // Slightly higher — natural prose, still grounded
    maxOutputTokens: 512,    // Answers should be concise
  },
});

/**
 * Strips markdown code fences from a string.
 * Gemini sometimes wraps JSON in ```json ... ``` even when asked not to.
 * @param {string} text
 * @returns {string}
 */
function stripCodeFences(text) {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
}

/**
 * Calls the Gemini API with the structured extraction prompt and returns
 * the parsed JSON result.
 *
 * @param {string} announcementText - The raw announcement text from the user
 * @returns {Promise<object>} - Parsed ExtractionResult object
 * @throws {Error} - Throws if AI call fails or response is not valid JSON
 */
export async function analyzeAnnouncement(announcementText) {
  const prompt = buildExtractionPrompt(announcementText);

  let rawText;
  try {
    const result = await jsonModel.generateContent(prompt);
    rawText = result.response.text();
  } catch (aiError) {
    // Log full error server-side, but throw a generic error to the route handler
    console.error('[aiService] Gemini API call failed:', aiError.message);
    throw new Error('AI_API_FAILURE');
  }

  // Strip fences in case they appear despite responseMimeType setting
  const cleaned = stripCodeFences(rawText);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (parseError) {
    console.error('[aiService] Failed to parse AI response as JSON.');
    console.error('[aiService] Raw response was:', rawText?.substring(0, 500));
    throw new Error('AI_PARSE_FAILURE');
  }

  return parsed;
}

/**
 * Answers a natural-language question about a specific announcement.
 * Uses the original announcement text as the sole source of truth —
 * never the summary or extracted fields — to prevent information loss.
 *
 * @param {string} announcementText - The original raw announcement text
 * @param {string} question         - The student's question
 * @returns {Promise<string>}       - Plain-text answer
 * @throws {Error} AI_API_FAILURE   - If Gemini call fails
 */
export async function askQuestion(announcementText, question) {
  const prompt = buildQAPrompt(announcementText, question);

  let answer;
  try {
    const result = await qaModel.generateContent(prompt);
    answer = result.response.text().trim();
  } catch (aiError) {
    console.error('[aiService] Q&A Gemini call failed:', aiError.message);
    throw new Error('AI_API_FAILURE');
  }

  if (!answer) {
    throw new Error('AI_EMPTY_RESPONSE');
  }

  return answer;
}
