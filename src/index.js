import './index.css';
import {
  createTaskElement,
  deleteTaskElement,
  updateTaskText,
  arrangeIndexes,
} from './task.js';
import { updateTaskStatus, clearCompletedTasks } from './Status.js';

let tasksLocal = [];

window.loadTasksToLocalStorage = () => {
  const text = JSON.stringify(tasksLocal);
  localStorage.setItem('tasks', text);
};

const taskList = document.getElementById('items'); // Move outside displayTasks()

const displayTaskElement = (task) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task_items');

  const taskIndex = document.createElement('span');
  taskIndex.classList.add('index');
  taskIndex.value = task.index;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checked');
  checkbox.checked = task.completed;

  const taskText = document.createElement('input');
  taskText.classList.add('task-name');
  taskText.value = task.name;
  if (task.completed) {
    taskText.classList.add('completed-task');
  }

  const moreIcon = document.createElement('span');
  moreIcon.classList.add('three-dot');
  moreIcon.innerHTML = '⋮';

  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('trash-icon');
  deleteIcon.classList.add('hide-icon');
  deleteIcon.innerHTML = '&#128465;';

  taskItem.appendChild(taskIndex);
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(moreIcon);
  taskItem.appendChild(deleteIcon);

  return taskItem;
};

function activateDeleteListener(parent, taskIndex) { // Receive parent and taskIndex as parameters
  const delBtn = parent.getElementsByClassName('trash-icon')[0];
  delBtn.addEventListener('click', () => {
    deleteTaskElement(tasksLocal, taskIndex);
    arrangeIndexes(tasksLocal); // Reassign correct indexes after deletion
  });
}

function activateMoreListeners(parent) { // Receive parent as a parameter
  const moreBtn = parent.getElementsByClassName('three-dot')[0];
  moreBtn.addEventListener('click', () => {
    const delBtn = parent.getElementsByClassName('trash-icon')[0];
    if (delBtn.classList.contains('hide-icon')) {
      delBtn.classList.remove('hide-icon');
      activateDeleteListener(parent, parent.getElementsByClassName('index')[0].value);
    } else {
      delBtn.classList.add('hide-icon');
    }
  });
}

function activateCheckboxListeners(parent) { // Receive parent as a parameter
  const checkboxInput = parent.getElementsByClassName('checked')[0];
  checkboxInput.addEventListener('change', (e) => {
    const clickedCheck = e.target;
    const taskIndex = parent.getElementsByClassName('index')[0].value;
    updateTaskStatus(taskIndex, clickedCheck.checked, tasksLocal);
    const taskInput = parent.getElementsByClassName('task-name')[0];
    taskInput.classList.toggle('completed-task', clickedCheck.checked);
  });
}

function activateTaskInputListeners(parent, taskIndex) { // Receive parent and taskIndex as parameters
  const taskInput = parent.getElementsByClassName('task-name')[0];
  taskInput.addEventListener('change', () => {
    updateTaskText(taskInput.value, taskIndex, tasksLocal);
  });
}

const displayTasks = () => {
  if (tasksLocal.length > 0) {
    tasksLocal.forEach((task) => {
      const taskElement = displayTaskElement(task);
      taskList.appendChild(taskElement);
      activateMoreListeners(taskElement);
      activateCheckboxListeners(taskElement);
      activateTaskInputListeners(taskElement, task.index);
    });
  }
};

document.getElementById('add_btn').addEventListener('click', () => {
  const taskInput = document.getElementById('task_input');
  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    createTaskElement(taskName, tasksLocal);
    tasksLocal = JSON.parse(localStorage.getItem('tasks'));
    taskList.innerHTML = ''; // Clear the existing task list (Avoid using document.getElementById('items'))
    displayTasks(); // Redisplay the updated task list
    taskInput.value = '';
  }
});

document.getElementById('remove_btn').addEventListener('click', () => {
  clearCompletedTasks(tasksLocal);
});

const loadTasksFromLocalStorage = () => {
  tasksLocal = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
};

window.onload = () => {
  loadTasksFromLocalStorage();
  displayTasks();
};
