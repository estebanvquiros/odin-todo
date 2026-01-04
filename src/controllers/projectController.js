import Project from "../models/Project";
import {addProject} from "../services/stateManager";

function createProject(name) {
	const project = new Project(name);
	addProject(project);
	return project;
}

export { createProject };