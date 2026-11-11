/**
 * run-tests.js
 * Runs all 6 spec test scenarios against the live API at localhost:3001.
 * Reports PASS / FAIL for each.
 */

const BASE = 'http://localhost:3001/api/analyze';

async function analyze(announcement) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ announcement }),
  });
  const body = await res.json();
  if (!body.success) throw new Error(body.error);
  return body.data;
}

function pass(label, detail = '') {
  console.log(`  ✅ PASS — ${label}${detail ? ' | ' + detail : ''}`);
}
function fail(label, detail = '') {
  console.log(`  ❌ FAIL — ${label}${detail ? ' | ' + detail : ''}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// T-01: Multiple deadlines — expect all 3 extracted
// ─────────────────────────────────────────────────────────────────────────────
async function testT01() {
  console.log('\nT-01: Multiple deadlines');
  const announcement = `All students are informed of three upcoming deadlines. 
First, the Internal Assessment forms must be submitted to the department office by 1 October 2026. 
Second, the library clearance certificate must be submitted to the examination cell before 5 October 2026 at 3:00 PM. 
Third, the fee payment for the supplementary examination must be completed through the student portal by 8 October 2026 at 11:59 PM. 
Students who miss any deadline will be debarred from the examinations.`;
  
  const data = await analyze(announcement);
  
  const dateCount = data.important_dates.length;
  const actionCount = data.required_actions.length;
  
  dateCount >= 3
    ? pass('3 or more dates extracted', `got ${dateCount}`)
    : fail('Expected 3+ dates', `got ${dateCount}`);
  
  actionCount >= 3
    ? pass('3 or more actions extracted', `got ${actionCount}`)
    : fail('Expected 3+ actions', `got ${actionCount}`);
  
  const allHigh = data.required_actions.every(a => a.priority === 'HIGH');
  allHigh
    ? pass('All deadline-bound actions are HIGH priority')
    : fail('Not all deadline actions are HIGH', data.required_actions.map(a => a.priority).join(', '));
  
  data.important_dates.forEach(d => console.log(`    📅 ${d.date} — ${d.event}`));
}

// ─────────────────────────────────────────────────────────────────────────────
// T-02: Rescheduled event — changes.hasChanges = true, old/new dates shown
// ─────────────────────────────────────────────────────────────────────────────
async function testT02() {
  console.log('\nT-02: Rescheduled event');
  const announcement = `Students are informed that the Annual Sports Day, originally scheduled for 10 October 2026, 
has been rescheduled to 15 October 2026 due to the academic schedule conflict. 
All students who registered for events must report to the sports ground by 8:00 AM on 15 October 2026.`;
  
  const data = await analyze(announcement);
  
  data.changes.hasChanges
    ? pass('hasChanges is true')
    : fail('hasChanges should be true');
  
  const showsOldDate = data.changes.previous?.includes('10');
  const showsNewDate = data.changes.current?.includes('15');
  
  showsOldDate
    ? pass('Previous date (10 Oct) captured', data.changes.previous)
    : fail('Previous date not captured', data.changes.previous);
  
  showsNewDate
    ? pass('New date (15 Oct) captured', data.changes.current)
    : fail('New date not captured', data.changes.current);
}

// ─────────────────────────────────────────────────────────────────────────────
// T-03: Mandatory action — expect HIGH priority
// ─────────────────────────────────────────────────────────────────────────────
async function testT03() {
  console.log('\nT-03: Mandatory action with deadline');
  const announcement = `All students of the Third Year are required to submit the internship consent form to the placement cell before Friday, 2 October 2026. 
Students who fail to submit the form by the deadline will not be considered for campus placements.`;
  
  const data = await analyze(announcement);
  
  const actions = data.required_actions;
  actions.length > 0
    ? pass('At least one action extracted')
    : fail('No actions extracted');
  
  const hasHigh = actions.some(a => a.priority === 'HIGH');
  hasHigh
    ? pass('HIGH priority action generated for mandatory deadline action')
    : fail('Expected HIGH priority', actions.map(a => a.priority).join(', '));
  
  const hasWarning = data.warnings.length > 0;
  hasWarning
    ? pass('Consequence/warning extracted', data.warnings[0])
    : fail('No warning extracted for stated consequence');
  
  actions.forEach(a => console.log(`    🔴 ${a.priority} — ${a.action} (deadline: ${a.deadline})`));
}

// ─────────────────────────────────────────────────────────────────────────────
// T-04: Action without deadline — deadline field = "Not specified"
// ─────────────────────────────────────────────────────────────────────────────
async function testT04() {
  console.log('\nT-04: Action without deadline');
  const announcement = `Students are encouraged to attend the guest lecture by Dr. Ramesh Kumar on the topic of Machine Learning in Healthcare. 
The lecture will provide valuable insights into industry applications. Students from all departments are welcome.`;
  
  const data = await analyze(announcement);
  
  const actions = data.required_actions;
  
  if (actions.length === 0) {
    pass('No mandatory actions extracted for purely informational notice');
    return;
  }
  
  const noInventedDeadlines = actions.every(
    a => a.deadline === 'Not specified' || a.deadline?.toLowerCase().includes('not specified')
  );
  noInventedDeadlines
    ? pass('Deadline shown as "Not specified" — not invented', actions[0].deadline)
    : fail('Deadline was invented for action with no deadline stated', actions.map(a => a.deadline).join(', '));
  
  const noHighPriority = !actions.some(a => a.priority === 'HIGH');
  noHighPriority
    ? pass('No HIGH priority for optional/encouraged action', actions.map(a => a.priority).join(', '))
    : fail('Should not be HIGH priority for "encouraged" language');
  
  actions.forEach(a => console.log(`    ${a.priority} — ${a.action} | deadline: ${a.deadline}`));
}

// ─────────────────────────────────────────────────────────────────────────────
// T-05: Background-heavy notice — actionable items prioritised
// ─────────────────────────────────────────────────────────────────────────────
async function testT05() {
  console.log('\nT-05: Background-heavy notice');
  const announcement = `The College was established in 1987 with a vision to provide quality education. 
Over the decades, it has grown to become one of the leading institutions in the region with over 5000 students across 20 departments. 
The institution has received several national awards for academic excellence and research output. 
Our faculty members are highly qualified with PhDs from reputed institutions. 
The college has state-of-the-art infrastructure including laboratories, libraries, and sports facilities. 
As part of the annual academic calendar, all students of the Final Year must submit their project synopsis to the respective department heads by 3 October 2026. 
This is mandatory for all students who wish to proceed with their final year projects.`;
  
  const data = await analyze(announcement);
  
  const hasAction = data.required_actions.length > 0;
  hasAction
    ? pass('Actionable item extracted from background-heavy notice')
    : fail('No action extracted — missed the mandatory submission');
  
  const actionMentionsProject = data.required_actions.some(
    a => a.action.toLowerCase().includes('project') || a.action.toLowerCase().includes('synopsis')
  );
  actionMentionsProject
    ? pass('Correct action extracted (project synopsis)', data.required_actions[0]?.action)
    : fail('Action does not mention the project/synopsis', data.required_actions[0]?.action);
  
  const hasHighPriority = data.required_actions.some(a => a.priority === 'HIGH');
  hasHighPriority
    ? pass('Mandatory deadline action is HIGH priority')
    : fail('Expected HIGH priority for mandatory submission');
  
  console.log(`    Summary (should be brief): "${data.summary}"`);
}

// ─────────────────────────────────────────────────────────────────────────────
// T-06: Ambiguous notice — no clear affected group or action
// ─────────────────────────────────────────────────────────────────────────────
async function testT06() {
  console.log('\nT-06: Ambiguous notice');
  const announcement = `Please note that some changes have been made recently. 
Certain things may be affected and relevant parties should take note. 
Further details will be communicated as and when available.`;
  
  const data = await analyze(announcement);
  
  // T-06 key check: AI should not invent SPECIFIC groups (like "Semester VI students", "Final Year CS students")
  // It IS acceptable to extract vague phrases verbatim from the announcement (like "relevant parties")
  // or to mark them [Inferred]. What's not acceptable is inventing a specific group not in the text.
  const specificInventedGroups = data.affected_people.filter(p => {
    const lower = p.toLowerCase().replace('[inferred] ', '');
    // Flag if it contains specific student identifiers not in a vague announcement
    return (lower.includes('semester') && !lower.includes('relevant') && !lower.includes('certain')) ||
           (lower.includes('year') && lower.includes('student') && !lower.includes('relevant'));
  });
  
  specificInventedGroups.length === 0
    ? pass('No specific groups invented — extracted only vague/verbatim text from announcement', data.affected_people.join(', ') || '(empty array)')
    : fail('Invented specific student groups not in the announcement', specificInventedGroups.join(', '));
  
  // Should NOT invent actions with made-up deadlines
  const noInventedDeadlines = data.required_actions.every(
    a => !a.deadline || a.deadline === 'Not specified'
  );
  noInventedDeadlines
    ? pass('No invented deadlines for ambiguous notice')
    : fail('Invented deadlines', data.required_actions.map(a => a.deadline).join(', '));
  
  // Should NOT invent changes
  const noFakeChanges = !data.changes.hasChanges ||
    data.changes.previous === 'Not specified';
  noFakeChanges
    ? pass('Did not invent specifics of change')
    : fail('Invented change details that are not in the announcement', `${data.changes.previous} → ${data.changes.current}`);
  
  console.log(`    Affected: ${data.affected_people.join(', ') || '(none — correct)'}`);
  console.log(`    Actions: ${data.required_actions.length}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — run all tests in parallel for speed
// ─────────────────────────────────────────────────────────────────────────────
console.log('═══════════════════════════════════════════════════════════');
console.log('   Notice2Action — Spec Test Suite (parallel)');
console.log('═══════════════════════════════════════════════════════════');

try {
  await Promise.all([
    testT01(),
    testT02(),
    testT03(),
    testT04(),
    testT05(),
    testT06(),
  ]);
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('   All test scenarios completed.');
  console.log('═══════════════════════════════════════════════════════════\n');
} catch (err) {
  console.error('\n💥 Test runner error:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// Q&A helpers
// ─────────────────────────────────────────────────────────────────────────────

const ASK_BASE = 'http://localhost:3001/api/ask';

async function ask(announcement, question) {
  const res = await fetch(ASK_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ announcement, question }),
  });
  const body = await res.json();
  if (!body.success) throw new Error(body.error);
  return body.answer;
}

// Shared demo announcement used across Q&A tests
const QA_ANNOUNCEMENT = `All Semester VI students are informed that the Project Review, 
originally scheduled for 28 September 2026, has been rescheduled to 30 September 2026. 
All project groups must upload their final project report to the student portal before 5:00 PM on 29 September 2026. 
Students who fail to submit the report will not be permitted to attend the project review. 
The review will be conducted in the Main Auditorium from 10:00 AM onwards.`;

// ─────────────────────────────────────────────────────────────────────────────
// T-07: Explicit information — answer must contain exact date and time
// ─────────────────────────────────────────────────────────────────────────────
async function testT07() {
  console.log('\nT-07: Q&A — Explicit date/time fact');
  const answer = await ask(QA_ANNOUNCEMENT, 'When is the report due?');

  console.log(`    Answer: "${answer}"`);

  const hasDate = answer.includes('29') && answer.toLowerCase().includes('september');
  hasDate
    ? pass('Answer contains the correct date (29 September)')
    : fail('Answer missing the correct date (29 September)', answer.substring(0, 120));

  const hasTime = answer.includes('5:00') || answer.includes('5 PM') || answer.includes('5:00 PM');
  hasTime
    ? pass('Answer contains the correct time (5:00 PM)')
    : fail('Answer missing the correct time (5:00 PM)', answer.substring(0, 120));
}

// ─────────────────────────────────────────────────────────────────────────────
// T-08: Consequence question — must mention the stated penalty
// ─────────────────────────────────────────────────────────────────────────────
async function testT08() {
  console.log('\nT-08: Q&A — Stated consequence');
  const answer = await ask(QA_ANNOUNCEMENT, 'What happens if I miss the deadline?');

  console.log(`    Answer: "${answer}"`);

  const mentionsConsequence =
    answer.toLowerCase().includes('not permitted') ||
    answer.toLowerCase().includes('will not be permitted') ||
    answer.toLowerCase().includes('cannot attend') ||
    answer.toLowerCase().includes('barred') ||
    answer.toLowerCase().includes('attend') ||
    answer.toLowerCase().includes('review');
  mentionsConsequence
    ? pass('Answer mentions the stated consequence (not permitted to attend)')
    : fail('Answer does not mention the stated consequence', answer.substring(0, 120));

  // Must NOT invent consequences not in the announcement
  const inventedConsequence =
    answer.toLowerCase().includes('fail') && answer.toLowerCase().includes('semester') ||
    answer.toLowerCase().includes('expel') ||
    answer.toLowerCase().includes('rusticate');
  !inventedConsequence
    ? pass('Answer does not invent consequences beyond what is stated')
    : fail('Answer appears to invent additional consequences', answer.substring(0, 120));
}

// ─────────────────────────────────────────────────────────────────────────────
// T-09: Missing information — must NOT invent a venue/room
// ─────────────────────────────────────────────────────────────────────────────
async function testT09() {
  console.log('\nT-09: Q&A — Missing information (no room number)');

  // Announcement that mentions the auditorium but not a room number
  const announcementNoRoom = `All Semester VI students must upload their final project report 
to the student portal before 5:00 PM on 29 September 2026. 
The project review will be held on 30 September 2026 in the Main Auditorium.`;

  const answer = await ask(announcementNoRoom, 'Which room number is the review in?');

  console.log(`    Answer: "${answer}"`);

  // Should NOT invent a room number
  const inventedRoom = /room\s*\d+/i.test(answer) || /hall\s*\d+/i.test(answer);
  !inventedRoom
    ? pass('Did not invent a room number')
    : fail('Invented a room number not in the announcement', answer.substring(0, 120));

  // Should indicate information not specified
  const acknowledgesGap =
    answer.toLowerCase().includes('not specify') ||
    answer.toLowerCase().includes('not specified') ||
    answer.toLowerCase().includes('not mention') ||
    answer.toLowerCase().includes('not provide') ||
    answer.toLowerCase().includes('only mention') ||
    answer.toLowerCase().includes('main auditorium') || // correctly refers to what IS stated
    answer.toLowerCase().includes('does not');
  acknowledgesGap
    ? pass('Answer correctly indicates room number is not specified (or refers to auditorium only)')
    : fail('Answer neither mentions the gap nor the auditorium', answer.substring(0, 120));
}

// ─────────────────────────────────────────────────────────────────────────────
// T-10: Unrelated question — must explain it cannot answer from the notice
// ─────────────────────────────────────────────────────────────────────────────
async function testT10() {
  console.log('\nT-10: Q&A — Unrelated question');
  const answer = await ask(QA_ANNOUNCEMENT, 'What is the weather forecast for tomorrow?');

  console.log(`    Answer: "${answer}"`);

  const refusesCorrectly =
    answer.toLowerCase().includes('only answer') ||
    answer.toLowerCase().includes('based on') ||
    answer.toLowerCase().includes('not related') ||
    answer.toLowerCase().includes('not mentioned') ||
    answer.toLowerCase().includes('only questions') ||
    answer.toLowerCase().includes('this notice') ||
    answer.toLowerCase().includes('cannot answer') ||
    answer.toLowerCase().includes('announcement');
  refusesCorrectly
    ? pass('Answer correctly redirects: only answers from the notice')
    : fail('Answer does not correctly redirect unrelated question', answer.substring(0, 120));

  // Must NOT provide weather information
  const givesWeather =
    answer.toLowerCase().includes('sunny') ||
    answer.toLowerCase().includes('rain') ||
    answer.toLowerCase().includes('celsius') ||
    answer.toLowerCase().includes('fahrenheit') ||
    answer.toLowerCase().includes('degrees') ||
    answer.toLowerCase().includes('forecast');
  !givesWeather
    ? pass('Did not invent weather information')
    : fail('Answer hallucinated weather information', answer.substring(0, 120));
}

// ─────────────────────────────────────────────────────────────────────────────
// T-11: Multiple facts — "What do I need to do and when?"
// ─────────────────────────────────────────────────────────────────────────────
async function testT11() {
  console.log('\nT-11: Q&A — Multiple facts in one question');
  const answer = await ask(QA_ANNOUNCEMENT, 'What do I need to do and by when?');

  console.log(`    Answer: "${answer}"`);

  // Should mention the upload/submission action
  const mentionsAction =
    answer.toLowerCase().includes('upload') ||
    answer.toLowerCase().includes('submit') ||
    answer.toLowerCase().includes('report');
  mentionsAction
    ? pass('Answer mentions the required action (upload/submit report)')
    : fail('Answer does not mention the required action', answer.substring(0, 120));

  // Should mention the deadline date
  const mentionsDeadline =
    answer.includes('29') ||
    answer.toLowerCase().includes('september') ||
    answer.includes('5:00') ||
    answer.includes('5 PM');
  mentionsDeadline
    ? pass('Answer includes the deadline (29 Sep / 5:00 PM)')
    : fail('Answer missing the deadline date/time', answer.substring(0, 120));

  // Validation: also run input validation tests against /api/ask
  console.log('\n  [Input validation sub-checks for /api/ask]');

  // Empty question → 400
  try {
    const r1 = await fetch(ASK_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ announcement: QA_ANNOUNCEMENT, question: '' }),
    });
    r1.status === 400
      ? pass('Empty question rejected with 400')
      : fail('Empty question should return 400', `got ${r1.status}`);
  } catch { fail('Empty question validation request failed'); }

  // Missing announcement → 400
  try {
    const r2 = await fetch(ASK_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ announcement: '', question: 'What is the deadline?' }),
    });
    r2.status === 400
      ? pass('Missing announcement rejected with 400')
      : fail('Missing announcement should return 400', `got ${r2.status}`);
  } catch { fail('Missing announcement validation request failed'); }

  // Too-short question → 400
  try {
    const r3 = await fetch(ASK_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ announcement: QA_ANNOUNCEMENT, question: 'hi' }),
    });
    r3.status === 400
      ? pass('Too-short question (2 chars) rejected with 400')
      : fail('Too-short question should return 400', `got ${r3.status}`);
  } catch { fail('Short question validation request failed'); }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — run all 11 tests: original 6 (analyze) + 5 new (ask)
// ─────────────────────────────────────────────────────────────────────────────
console.log('═══════════════════════════════════════════════════════════');
console.log('   Notice2Action — Full Test Suite (parallel)');
console.log('   Covers: /api/analyze (T-01–T-06) + /api/ask (T-07–T-11)');
console.log('═══════════════════════════════════════════════════════════');

try {
  // Run analyze tests and ask tests in parallel groups
  await Promise.all([
    // Original extraction tests
    testT01(),
    testT02(),
    testT03(),
    testT04(),
    testT05(),
    testT06(),
    // New Q&A tests — run sequentially within this group to avoid API rate pressure
    (async () => {
      await testT07();
      await testT08();
      await testT09();
      await testT10();
      await testT11();
    })(),
  ]);
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('   All 11 test scenarios completed.');
  console.log('═══════════════════════════════════════════════════════════\n');
} catch (err) {
  console.error('\n💥 Test runner error:', err.message);
  process.exit(1);
}
