import Project from "../models/Project";
import { read, write } from "./storageDAO"

const STORAGE_KEY = "odinTodo:projects";

function writeProjects(projects) {
  write(STORAGE_KEY, projects);
}

function readProjects() {
  const projects = read(STORAGE_KEY);
  if (!projects) return {};
  return Object.fromEntries(
    Object.values(projects).map((project) => [project.id, new Project(project.id, project.name)])
  );
}

export { writeProjects, readProjects }