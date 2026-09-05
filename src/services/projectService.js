import { readProjects, writeProjects } from "../dao/projectDAO";
import Project from "../models/Project";

const projects = readProjects();

function createProject(name) {
  const newProject = new Project(crypto.randomUUID(), name);
  projects[newProject.id] = newProject;
  writeProjects(projects);
  return newProject;
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

function getProjectName(id) {
  return projects[id].name;
}

export { createProject, getProjects, deleteProject, updateProject, getProjectName }
