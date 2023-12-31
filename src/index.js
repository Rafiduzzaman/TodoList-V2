import './index.css';
import {
  createTaskElement, deleteTaskElement, updateTaskText, arrangeIndexes,
} from './task.js';
import { updateTaskStatus, clearCompletedTasks } from './Status.js';

let tasksLocal = [];

window.loadTasksToLocalStorage = () => {
  const text = JSON.stringify(tasksLocal);
  localStorage.setItem('tasks', text);
};

const displayTaskElement = (task) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-list');

  const taskIndex = document.createElement('span');
  taskIndex.classList.add('task-index');
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

function activateDeleteListener(delBtn) {
  delBtn.addEventListener('click', () => {
    const parent = delBtn.parentNode;
    const taskIndex = Number(parent.getElementsByClassName('task-index')[0].value);
    deleteTaskElement(tasksLocal, taskIndex);
    arrangeIndexes(tasksLocal);
  });
}

function activateMoreListeners() {
  const moreBtn = document.querySelectorAll('.three-dot');
  moreBtn.forEach((mb) => {
    mb.addEventListener('click', (e) => {
      const clickedBtn = e.target;
      const parent = clickedBtn.parentNode;
      const delBtn = parent.getElementsByClassName('trash-icon')[0];
      if (delBtn.classList.contains('hide-icon')) {
        delBtn.classList.remove('hide-icon');
        activateDeleteListener(delBtn);
      } else {
        delBtn.classList.add('hide-icon');
      }
    });
  });
}

function activateCheckboxListeners() {
  const checkboxInput = document.querySelectorAll('.checked');
  checkboxInput.forEach((cbi) => {
    cbi.addEventListener('change', (e) => {
      const clickedCheck = e.target;
      const parent = clickedCheck.parentNode;
      const taskIndex = parent.getElementsByClassName('task-index')[0].value;
      updateTaskStatus(taskIndex, clickedCheck.checked, tasksLocal);
      const taskInput = parent.getElementsByClassName('task-name')[0];
      if (clickedCheck.checked) {
        taskInput.classList.add('completed-task');
      } else {
        taskInput.classList.remove('completed-task');
      }
    });
  });
}

function activateTaskInputListeners() {
  const taskInput = document.querySelectorAll('.task-name');
  taskInput.forEach((ti) => {
    const parent = ti.parentNode;
    const taskIndex = Number(parent.getElementsByClassName('task-index')[0].value);
    ti.addEventListener('change', () => {
      updateTaskText(ti.value, taskIndex, tasksLocal);
    });
  });
}

const displayTasks = () => {
  const taskList = document.getElementById('list_items');
  if (tasksLocal.length > 0) {
    tasksLocal.forEach((task) => {
      const taskElement = displayTaskElement(task);
      taskList.appendChild(taskElement);
    });
    activateMoreListeners();
    activateCheckboxListeners();
    activateTaskInputListeners();
  }
};

document.getElementById('add_btn').addEventListener('click', () => {
  const taskInput = document.getElementById('task_input');
  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    createTaskElement(taskName, tasksLocal);
    tasksLocal = JSON.parse(localStorage.getItem('tasks'));
    document.getElementById('list_items').innerHTML = '';
    displayTasks();
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