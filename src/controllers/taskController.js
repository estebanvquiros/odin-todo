import Task from "../models/Task";
import {addTask} from "../services/stateManager";

function createTask(title, description, dueDate, priority, projectId, id) {
	const task = new Task(title, description, dueDate, priority, projectId, id);
	addTask(task);
	return task;
}

export { createTask };