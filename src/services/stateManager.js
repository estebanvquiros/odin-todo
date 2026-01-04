const state = {
	projects: {},
	tasks: {}
}

function addProject(project) {
	state.projects[project.id] = project;
	publish("state-change", JSON.stringify(state));
}

function addTask(task) {
	state.tasks[task.id] = task;
	publish("state-change", JSON.stringify(state));
}

export { addProject, addTask };