import Task from "../models/Task";
import {addTask} from "../services/stateManager";

function createTask(title, description, dueDate, priority, projectId) {
	const task = new Task(title, description, dueDate, priority, projectId);
	addTask(task);
	return task;
}

export { createTask };