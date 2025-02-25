import './style.css';

const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');


let tasks = [];

addTaskButton.addEventListener('click', () => {
  const newTask = newTaskInput.value.trim();
  if (newTask) {
    tasks.push({ text: newTask, completed: false });
    newTaskInput.value = '';
    renderTasks();
  }
});

taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
    const taskElement = event.target.parentNode.parentNode;
    const taskIndex = Array.prototype.indexOf.call(taskList.children, taskElement);
    const task = tasks[taskIndex];

    // Create an input field for editing
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = task.text;
    inputField.className = 'edit-input'; // Optional: Add a class for styling
    inputField.addEventListener('blur', () => {
      saveTask(inputField, taskIndex);
    });

    // Add keyboard handling for Enter and Escape
    inputField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        saveTask(inputField, taskIndex);
      } else if (event.key === 'Escape') {
        // Cancel editing by re-rendering the task list
        renderTasks();
      }
    });

    // Replace the task text with the input field
    taskElement.querySelector('span').replaceWith(inputField);
    inputField.focus(); // Focus on the input field for immediate editing

  } else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
    const taskElement = event.target.parentNode.parentNode;
    const taskIndex = Array.prototype.indexOf.call(taskList.children, taskElement);
    tasks.splice(taskIndex, 1);
    renderTasks();
  } else if (event.target.type === 'checkbox') {
    const taskElement = event.target.parentNode;
    const taskIndex = Array.prototype.indexOf.call(taskList.children, taskElement);
    tasks[taskIndex].completed = event.target.checked;
  }
});

function saveTask(inputField, taskIndex) {
  const newTaskText = inputField.value.trim();
  if (newTaskText) {
    tasks[taskIndex].text = newTaskText;
    renderTasks();
  } else {
    // If the input is empty, remove the task
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskElement = document.createElement('li');
    taskElement.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.text}</span>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;
    taskList.appendChild(taskElement);
  });
}


renderTasks();