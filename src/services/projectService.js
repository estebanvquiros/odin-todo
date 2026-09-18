import { readProjects, writeProjects } from "../dao/projectDAO";
import Project from "../models/Project";

const projects = readProjects();

function createProject(name) {
  const newProject = new Project(crypto.randomUUID(), name, false);
  projects[newProject.id] = newProject;
  writeProjects(projects);
  return newProject;
}

function initDefaultProject() {
  if (Object.values(projects).some((project) => project.isDefault)) return;
  const defaultProject = new Project(crypto.randomUUID(), "Index", true);
  projects[defaultProject.id] = defaultProject;
  writeProjects(projects);
}

function getProjects() {
  return Object.values(projects);
}

function deleteProject(id) {
  if (!Object.hasOwn(projects, id)) return false;
  delete projects[id];
  writeProjects(projects);
  return true;
}

function updateProject(id, name) {
  const existingProject = projects[id];
  if (!existingProject) return null;
  const updatedProject = new Project(id, name, existingProject.isDefault);
  projects[id] = updatedProject;
  writeProjects(projects);
  return updatedProject;
}

function getDefaultProject() {
  return Object.values(projects).find((project) => project.isDefault) || null;
}

function getProjectName(id) {
  return projects[id].name;
}

function getProjectById(id) {
  return projects[id] || null;
}

export { createProject, getProjects, deleteProject, updateProject, getProjectName, getProjectById, initDefaultProject, getDefaultProject }
