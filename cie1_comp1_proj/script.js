// ---------- State ----------
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// ---------- DOM references ----------
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const taskList = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');
const emptyMsg = document.getElementById('emptyMsg');
const taskCount = document.getElementById('taskCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');

// ---------- Persistence ----------
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ---------- Render ----------
function renderTasks() {
  taskList.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  emptyMsg.style.display = filtered.length === 0 ? 'block' : 'none';

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}" class="toggle-check">
      <span class="task-text">${escapeHTML(task.text)}</span>
      <span class="priority-badge priority-${task.priority}">${task.priority}</span>
      <button class="delete-btn" data-id="${task.id}">🗑</button>
    `;
    taskList.appendChild(li);
  });

  taskCount.textContent = `${tasks.filter(t => !t.completed).length} pending / ${tasks.length} total`;
}

// Basic safety: avoid raw HTML injection from task text
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- Add task (form submit + validation) ----------
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();

  if (text === '') {
    errorMsg.textContent = 'Task cannot be empty.';
    return;
  }

  errorMsg.textContent = '';

  const newTask = {
    id: Date.now(),
    text: text,
    priority: priorityInput.value,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskForm.reset();
  priorityInput.value = 'medium';
  taskInput.focus();
});

// ---------- Toggle complete / delete (event delegation) ----------
taskList.addEventListener('click', function (e) {
  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.classList.contains('toggle-check')) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks();
    renderTasks();
  }

  if (e.target.classList.contains('delete-btn')) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }
});

// ---------- Filters ----------
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// ---------- Theme toggle ----------
themeToggle.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Load saved theme on startup
if (localStorage.getItem('theme') === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️ Light Mode';
}

// ---------- Init ----------
renderTasks();