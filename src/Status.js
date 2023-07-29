function updateTaskStatus(taskIndex, status, tasksLocal) {
    tasksLocal[taskIndex - 1].completed = status;
    localStorage.setItem('tasks', JSON.stringify(tasksLocal));
  }
  
  function clearCompletedTasks(tasksLocal) {
    const updatedTasks = tasksLocal.filter((task) => !task.completed);
  
    for (let i = 0; i < updatedTasks.length; i++) {
      updatedTasks[i].index = i + 1;
    }
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    document.location.reload();
  }
  
  export { updateTaskStatus, clearCompletedTasks };
  