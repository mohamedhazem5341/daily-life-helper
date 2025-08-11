// todo.js - simple todo with localStorage
document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addBtn = document.getElementById('add-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const taskList = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];

  renderTasks();

  addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (!text) { alert('Please enter a task.'); return; }
    tasks.push({ text, done: false });
    saveTasks(); renderTasks();
    taskInput.value = '';
  });

  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const idx = +e.target.dataset.index;
      tasks.splice(idx,1); saveTasks(); renderTasks();
    } else {
      // toggle done when clicking list item (but not delete button)
      const li = e.target.closest('li');
      if (!li) return;
      const idx = +li.dataset.index;
      tasks[idx].done = !tasks[idx].done; saveTasks(); renderTasks();
    }
  });

  clearAllBtn.addEventListener('click', () => {
    if (confirm('Clear all tasks?')) { tasks = []; saveTasks(); renderTasks(); }
  });

  function saveTasks(){ localStorage.setItem('todoTasks', JSON.stringify(tasks)); }

  function renderTasks(){
    taskList.innerHTML = '';
    tasks.forEach((task, i) => {
      const li = document.createElement('li');
      li.dataset.index = i;
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
      li.style.gap = '10px';

      const text = document.createElement('span');
      text.textContent = task.text;
      if (task.done) { text.style.textDecoration = 'line-through'; text.style.opacity = '0.7'; }

      const right = document.createElement('div');

      const del = document.createElement('button');
      del.textContent = 'Delete';
      del.className = 'delete-btn';
      del.dataset.index = i;
      del.style.marginLeft = '8px';
      del.style.background = '#ff5b5b';
      del.style.color = '#fff';
      del.style.border = 'none';
      del.style.padding = '6px 8px';
      del.style.borderRadius = '6px';
      del.style.cursor = 'pointer';

      right.appendChild(del);
      li.appendChild(text);
      li.appendChild(right);
      taskList.appendChild(li);
    });
  }
});
