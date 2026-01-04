import Task from "../models/Task";
import {addTask, removeTask} from "../services/stateManager";

function createTask(title, description, dueDate, priority, projectId, id) {
	const task = new Task(title, description, dueDate, priority, projectId, id);
	addTask(task);
	return task;
}

function deleteTask(id) {
	removeTask(id);
}

export { createTask, deleteTask };