import Project from "../models/Project";
import {addProject, removeProject} from "../services/stateManager";

function createProject(name, id) {
	const project = new Project(name, id);
	addProject(project);
	return project;
}

function deleteProject(id) {
	removeProject(id);
}

export { createProject, deleteProject };