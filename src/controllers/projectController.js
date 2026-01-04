import Project from "../models/Project";
import {addProject} from "../services/stateManager";

function createProject(name, id) {
	const project = new Project(name, id);
	addProject(project);
	return project;
}

export { createProject };