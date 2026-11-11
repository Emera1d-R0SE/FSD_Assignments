# Notice2Action

> Turn lengthy college notices into clear action items.

An AI-powered web application that takes a college announcement and extracts exactly what students need to act on — deadlines, required actions, affected groups, schedule changes, and warnings — structured and prioritised.

---

## What It Does

Paste any college announcement → click **Analyze Announcement** → get:

| Section | What you see |
|---|---|
| Quick Summary | One-line description of the notice |
| What Changed | Old date/value → New date/value |
| Who Is Affected | Specific student groups named in the notice |
| Important Dates | All dates/times in a table |
| Action Checklist | Required actions ranked 🔴 HIGH / 🟠 MEDIUM / 🟢 LOW |
| Warnings | Stated consequences for non-compliance |

The AI only extracts information explicitly present in the announcement — it never invents deadlines, names, or consequences.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 8 |
| Backend | Node.js, Express 5 |
| AI | Google Gemini (via `@google/generative-ai`) |
| Styling | Plain CSS with custom properties |

---

## Project Structure

```
notice2action/
├── .kiro/
│   ├── specs/          # Requirements, design, task specs
│   └── hooks/          # Kiro agent hook
├── backend/
│   ├── server.js
│   ├── routes/analyze.js
│   ├── services/aiService.js
│   ├── prompts/extractionPrompt.js
│   ├── validators/responseValidator.js
│   └── .env            # API key (not committed)
└── frontend/
    └── src/
        ├── components/ # Header, Input, all result cards
        ├── hooks/      # useAnalyze state machine
        └── utils/      # validateInput, normalizeResponse
```

---

## Setup

### Prerequisites

- Node.js 18 or higher
- A Google Gemini API key — get one free at [https://aistudio.google.com](https://aistudio.google.com)

### 1. Clone and install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure environment

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
GEMINI_MODEL=gemini-3.5-flash-lite
```

> The `GEMINI_MODEL` value can be changed to any available Gemini model that supports `generateContent`. Run `node list-models.js` in the backend to see available models for your key.

### 3. Run the application

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm start
# Server running at http://localhost:3001
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# App available at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Demo Announcement

Paste this into the app to see a full demonstration:

```
Students of Semester VI are informed that the previously scheduled Project Review
on 28 September 2026 has been rescheduled to 30 September 2026. All project groups
must upload their final project report to the student portal before 5:00 PM on
29 September 2026. Students who fail to submit the report before the deadline will
not be permitted to attend the project review. The review will be conducted in the
Main Auditorium from 10:00 AM onwards.
```

**Expected output:**
- ✅ "What Changed" shows 28 Sep → 30 Sep
- ✅ Action checklist shows upload as HIGH priority with deadline
- ✅ Warning about not being permitted to attend
- ✅ Both dates appear in the dates table

---

## Kiro Spec Files

This project was built using Kiro's spec-driven workflow:

| File | Purpose |
|---|---|
| `.kiro/specs/requirements.md` | User stories, functional & non-functional requirements |
| `.kiro/specs/design.md` | Architecture, component tree, data flow, API contract |
| `.kiro/specs/tasks.md` | 24 implementation tasks across 5 phases |
| `.kiro/hooks/analyze-announcement.json` | Agent hook — injects extraction rules on every prompt |

---

## API Reference

### `POST /api/analyze`

**Request body:**
```json
{ "announcement": "string (20–10000 chars)" }
```

**Success response (200):**
```json
{
  "success": true,
  "data": {
    "title": "string",
    "summary": "string",
    "changes": { "hasChanges": true, "description": "...", "previous": "...", "current": "..." },
    "affected_people": ["string"],
    "important_dates": [{ "date": "...", "time": "...", "event": "...", "description": "..." }],
    "required_actions": [{ "action": "...", "deadline": "...", "priority": "HIGH|MEDIUM|LOW", "reason": "..." }],
    "warnings": ["string"]
  }
}
```

**Error response (400/500):**
```json
{ "success": false, "error": "user-friendly message" }
```

### `GET /api/health`
Returns `{ "status": "ok", "service": "Notice2Action API" }`.

---

## Accuracy Policy

The AI is explicitly instructed to:
- Extract **only** information present in the announcement
- Use `"Not specified"` for missing fields — never invent values
- Prefix inferred (not explicitly stated) information with `[Inferred]`
- Base priority classification only on language in the announcement

---

*Built with Kiro spec-driven workflow — September 2026*
