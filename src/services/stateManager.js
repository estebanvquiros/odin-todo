const state = {
	projects: {},
	tasks: {}
}

function addProject(project) {
	state.projects[project.id] = project;
}

function addTask(task) {
	state.tasks[task.id] = task;
}

export { addProject, addTask };