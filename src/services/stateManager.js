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
		const newProject = new Project(project.name, project.id, project.tasks);
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

function removeProject(id) {

	if (!(id in state.projects)) return;

	const project = state.projects[id];

	project.tasks.forEach(taskId => {
		if (taskId in state.tasks) {
			delete state.tasks[taskId];
		}
	});

	delete state.projects[id];

	publish("state-change", JSON.stringify(state));
}

function addTask(task) {
	if (!(task.projectId in state.projects)) return;
	state.tasks[task.id] = task;
	state.projects[task.projectId].tasks.push(task.id);
	publish("state-change", JSON.stringify(state));
}

function removeTask(id) {

	if(!(id in state.tasks)) return;

	const task = state.tasks[id];
	removeTaskReferenceFromProject(task.projectId, id);

	delete state.tasks[id];
	publish("state-change", JSON.stringify(state));
}

function removeTaskReferenceFromProject(projectId, taskId) {

	if (!(projectId in state.projects)) return;

	const project = state.projects[projectId];

	const taskPosition = project.tasks.indexOf(taskId);

	if (taskPosition === -1) return;
	project.tasks.splice(taskPosition, 1);
}

export { addProject, removeProject, addTask, removeTask, hydrateState };