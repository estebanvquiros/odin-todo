import Project from "../models/Project";
import { read, write } from "./storageDAO"

const STORAGE_KEY = "odinTodo:projects";

function writeProjects(projects) {
  write(STORAGE_KEY, projects);
}

function readProjects() {
  const rawProjects = read(STORAGE_KEY);

  if (!rawProjects) return {};

  return Object.fromEntries(
    Object.values(rawProjects).map((project) => [project.id, new Project(project.id, project.name, project.isDefault)])
  );
}

export { writeProjects, readProjects }
