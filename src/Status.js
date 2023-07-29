function updateTaskStatus(taskIndex, status, tasksLocal) {
  tasksLocal[taskIndex - 1].completed = status;
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
}

function clearCompletedTasks(tasksLocal) {
  const updatedTasks = tasksLocal.filter((task) => !task.completed)
    .map((task, index) => ({
      ...task,
      index: index + 1,
    }));

  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  document.location.reload();
}

export { updateTaskStatus, clearCompletedTasks };
