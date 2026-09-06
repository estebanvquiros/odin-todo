function createTaskElement(task) {
  const taskItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const taskTitle = document.createElement("h2");
  const taskPriority = document.createElement("p");

  taskItem.classList.add("task");
  checkbox.classList.add("task-checkbox");
  taskTitle.classList.add("task-title");
  taskPriority.classList.add("task-priority", task.priority.toLowerCase());

  if (task.completed === true) {
    taskItem.classList.add("completed");
  }

  checkbox.type = "checkbox";
  checkbox.checked = Boolean(task.completed);
  taskItem.dataset.taskId = task.id;
  taskTitle.textContent = task.title;
  taskPriority.textContent = task.priority;

  if (task.dueDate) {
    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-duedate")
    taskDueDate.textContent = task.dueDate;
    taskItem.appendChild(taskDueDate);
  }

  if (task.description) {
    const taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = task.description;
    taskItem.appendChild(taskDescription);
  }

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTitle);
  taskItem.appendChild(taskPriority);

  return taskItem;
}

export { createTaskElement }
