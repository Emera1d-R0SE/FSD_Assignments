/**
 * extractionPrompt.js
 * Versioned prompt template for Notice2Action AI extraction.
 * Version: 1.0
 *
 * Returns the full prompt string to send to Gemini.
 * The announcement is embedded in a clearly delimited block so the model
 * cannot be manipulated by embedded instructions in user input.
 */

export function buildExtractionPrompt(announcement) {
  return `You are a structured data extraction engine for a college announcement processing system called Notice2Action.

Your task is to analyze the college announcement provided below and extract structured, actionable information from it.

STRICT RULES — READ CAREFULLY:
1. Return ONLY a single valid JSON object. No markdown, no prose, no code fences, no explanation outside the JSON.
2. Extract ONLY information that is explicitly stated in the announcement. Do not use general knowledge to fill in gaps.
3. If a piece of information is not present in the announcement, use the string "Not specified" for string fields, or an empty array [] for array fields.
4. Never invent dates, deadlines, names, locations, groups, penalties, or consequences.
5. If who is affected is not clearly stated, use "Not clearly specified in the announcement."
6. If information is inferred (reasonably derivable but not explicitly stated), prefix the value with "[Inferred] ".
7. Priority classification rules:
   - HIGH: Action has a stated deadline AND/OR a stated consequence for non-compliance. Language: "must", "required", "mandatory", "will not be permitted".
   - MEDIUM: Action is required or strongly recommended but has no stated deadline or consequence. Language: "should", "are advised to", "are requested to".
   - LOW: Informational or optional. Language: "encouraged", "may", "can", "invited to".
   - Base priority ONLY on what is written. Do not invent urgency.

OUTPUT SCHEMA — return exactly this structure:
{
  "title": "string — short title for the announcement (max 10 words)",
  "summary": "string — one sentence describing what this announcement is about",
  "changes": {
    "hasChanges": boolean,
    "description": "string — brief description of what changed, or 'Not specified'",
    "previous": "string — the previous state/date/value, or 'Not specified'",
    "current": "string — the new state/date/value, or 'Not specified'"
  },
  "affected_people": ["string array — each entry is a group or type of student affected"],
  "important_dates": [
    {
      "date": "string — the date as stated in the announcement",
      "time": "string — the time if stated, otherwise 'Not specified'",
      "event": "string — the name or type of event on this date",
      "description": "string — brief context for this date"
    }
  ],
  "required_actions": [
    {
      "action": "string — what the student must or should do",
      "deadline": "string — the deadline if stated, otherwise 'Not specified'",
      "priority": "HIGH" | "MEDIUM" | "LOW",
      "reason": "string — why this action is required, as stated in the announcement"
    }
  ],
  "warnings": ["string array — each entry is a stated consequence or penalty for non-compliance"]
}

Important: Sort required_actions by priority — HIGH first, then MEDIUM, then LOW.

ANNOUNCEMENT TO ANALYZE:
---BEGIN ANNOUNCEMENT---
${announcement}
---END ANNOUNCEMENT---

Return the JSON object now. No other text.`;
}
