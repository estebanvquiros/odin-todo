function createTaskElement(task) {
  const taskItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const taskTitle = document.createElement("h2");
  const taskDescription = document.createElement("p");
  const taskDueDate = document.createElement("p");
  const taskPriority = document.createElement("p");

  taskItem.classList.add("task");
  checkbox.classList.add("task-checkbox");
  checkbox.type = "checkbox";
  taskTitle.classList.add("task-title");
  taskDescription.classList.add("task-description");
  taskDueDate.classList.add("task-duedate")
  taskPriority.classList.add("task-priority");

  taskItem.dataset.taskId = task.id;
  taskTitle.textContent = task.title;
  taskDescription.textContent = task.description;
  taskDueDate.textContent = task.dueDate;
  taskPriority.textContent = task.priority;

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTitle);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(taskDueDate);
  taskItem.appendChild(taskPriority);

  return taskItem;
}

export { createTaskElement }
