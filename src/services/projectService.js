import Project from "../models/Project";

const projects = {};

function createProject(name) {
  const projectID = crypto.randomUUID();
  projects[projectID] = new Project(projectID, name);
}

function getProjects() {
  return Object.values(projects);
}

export { createProject, getProjects }