import Task from "../models/Task";

const tasks = {};

function createTask(title, description, dueDate, priority, projectID) {
  const taskID = crypto.randomUUID();
  tasks[taskID] = new Task(taskID, title, description, dueDate, priority, projectID);
}

export { createTask }