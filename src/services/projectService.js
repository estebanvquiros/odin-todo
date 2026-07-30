import { readProjects, writeProjects } from "../dao/projectDAO";
import Project from "../models/Project";

const projects = readProjects();

function createProject(name) {
  const projectID = crypto.randomUUID();
  projects[projectID] = new Project(projectID, name);
  writeProjects(projects);
}

function getProjects() {
  return Object.values(projects);
}

function deleteProject(id) {
  delete projects[id];
  writeProjects(projects);
}

function updateProject(id, name) {
  if (Object.hasOwn(projects, id)) {
    projects[id] = new Project(id, name);
  }
  writeProjects(projects);
}

export { createProject, getProjects, deleteProject, updateProject }