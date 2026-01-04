import {publish} from "./pubsub";
import Project from "../models/Project";
import Task from "../models/Task";

let state = {
	projects: {},
	tasks: {}
}

function hydrateState(data) {

	state = {
		projects: {},
		tasks: {}
	}

	if (!data) return;
	const localData = JSON.parse(data);

	hydrateProjects(localData.projects ?? {});
	hydrateTasks(localData.tasks ?? {});
}

function hydrateProjects(projects) {
	Object.values(projects).forEach(project => {
		const newProject = new Project(project.name, project.id);
		state.projects[newProject.id] = newProject;
	});
}

function hydrateTasks(tasks) {
	Object.values(tasks).forEach(task => {
		const newTask = new Task(task.title, task.description, task.dueDate, task.priority, task.projectId, task.id);
		state.tasks[newTask.id] = newTask;
	});
}

function addProject(project) {
	state.projects[project.id] = project;
	publish("state-change", JSON.stringify(state));
}

function addTask(task) {
	state.tasks[task.id] = task;
	publish("state-change", JSON.stringify(state));
}

export { addProject, addTask, hydrateState };