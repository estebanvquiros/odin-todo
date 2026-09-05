function createTaskElement(task) {
  const taskItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const taskTitle = document.createElement("h2");
  const taskPriority = document.createElement("p");

  taskItem.classList.add("task");
  checkbox.classList.add("task-checkbox");
  checkbox.type = "checkbox";
  taskTitle.classList.add("task-title");

  switch (task.priority) {
    case "High":
      taskPriority.classList.add("task-priority", "high");
      break;
    case "Medium":
      taskPriority.classList.add("task-priority", "medium");
      break;
    case "Low":
      taskPriority.classList.add("task-priority", "low");
      break;
    default:
      break;
  }

  taskItem.dataset.taskId = task.id;
  taskTitle.textContent = task.title;
  taskPriority.textContent = task.priority;

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTitle);
  taskItem.appendChild(taskPriority);

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

  return taskItem;
}

export { createTaskElement }
